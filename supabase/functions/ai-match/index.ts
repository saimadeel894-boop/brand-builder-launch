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
        temperature: 0.2,
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
      systemPrompt = `You are an AI matching engine for a B2B beauty supply chain platform. Score each manufacturer candidate using these EXACT criteria weights:
- Category Overlap (30%): How many of the brand's desired product categories does this manufacturer cover?
- Certifications Match (25%): Does the manufacturer hold certifications the brand requires or values (e.g. GMP, ISO, organic, cruelty-free)?
- Location Proximity (20%): Is the manufacturer in the same region/country as the brand, or a logistics-friendly location?
- MOQ Compatibility (15%): Does the manufacturer's minimum order quantity align with the brand's expected volume?
- Production Capacity (10%): Based on available signals (lead time, description), can the manufacturer handle the brand's scale?

Calculate a weighted score 0-100 by summing each criterion's sub-score (0-100) multiplied by its weight. Return a JSON array sorted by matchScore descending.`;
      userPrompt = `Brand profile: ${JSON.stringify(brandProfile)}\n\nManufacturer candidates:\n${JSON.stringify(candidates)}\n\nReturn ONLY a valid JSON array (no markdown): [{ "candidateId": "...", "matchScore": number, "explanation": "1-2 sentence reason citing which criteria drove the score" }]`;
    } else if (type === "influencer-match") {
      systemPrompt = `You are an AI matching engine for influencer marketing. Score each influencer candidate using these EXACT criteria weights:
- Niche Alignment (30%): How well does the influencer's content niche match the brand's industry/products?
- Platform Match (25%): Is the influencer active on the brand's target platform(s)?
- Location Relevance (20%): Is the influencer in or relevant to the brand's target market geography?
- Engagement Potential (15%): Based on available signals, estimate engagement quality.
- Content Quality (10%): Based on niche specialization and profile signals, estimate content fit.

Calculate a weighted score 0-100 by summing each criterion's sub-score (0-100) multiplied by its weight. Return a JSON array sorted by matchScore descending.`;
      userPrompt = `Brand campaign: ${JSON.stringify(brandProfile)}\n\nInfluencer candidates:\n${JSON.stringify(candidates)}\n\nReturn ONLY a valid JSON array (no markdown): [{ "candidateId": "...", "matchScore": number, "explanation": "1-2 sentence reason citing which criteria drove the score" }]`;
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
