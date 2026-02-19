import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function callOpenAI(apiKey: string, systemPrompt: string, userPrompt: string, retries = 3): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (response.status === 429 && attempt < retries - 1) {
      const waitMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
      console.log(`Rate limited, retrying in ${Math.round(waitMs)}ms (attempt ${attempt + 1}/${retries})`);
      await new Promise((r) => setTimeout(r, waitMs));
      continue;
    }

    return response;
  }
  throw new Error("Max retries exceeded");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, brandProfile, candidates } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "manufacturer-match") {
      systemPrompt = `You are an AI matching engine for a B2B beauty supply chain platform. Score manufacturer candidates for a brand based on category overlap, MOQ compatibility, certifications, and location proximity. Return JSON array with matchScore (0-100) and explanation for each.`;
      userPrompt = `Brand needs: ${JSON.stringify(brandProfile)}\n\nManufacturer candidates:\n${JSON.stringify(candidates)}\n\nReturn a JSON array: [{ "candidateId": "...", "matchScore": number, "explanation": "1-2 sentence reason" }]. Only return valid JSON, no markdown.`;
    } else if (type === "influencer-match") {
      systemPrompt = `You are an AI matching engine for influencer marketing. Score influencer candidates for a brand based on niche alignment, audience size, platform match, and engagement potential. Return JSON array with matchScore (0-100) and explanation.`;
      userPrompt = `Brand campaign: ${JSON.stringify(brandProfile)}\n\nInfluencer candidates:\n${JSON.stringify(candidates)}\n\nReturn a JSON array: [{ "candidateId": "...", "matchScore": number, "explanation": "1-2 sentence reason" }]. Only return valid JSON, no markdown.`;
    } else if (type === "summary") {
      systemPrompt = `You are a professional business analyst. Generate concise summaries for business profiles and conversations. Be factual and professional.`;
      userPrompt = candidates;
    } else if (type === "contract") {
      systemPrompt = `You are a legal document assistant specializing in influencer marketing and manufacturing agreements. Generate professional contract text based on the provided details. Use formal legal language but keep it readable.`;
      userPrompt = candidates;
    }

    const response = await callOpenAI(OPENAI_API_KEY, systemPrompt, userPrompt);

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded after retries. Please try again in a minute." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits required. Please add funds to your OpenAI account." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("OpenAI API error:", response.status, t);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ result: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-match error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
