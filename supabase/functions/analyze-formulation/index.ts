import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { formulation_text, target_markets, product_name } = await req.json();

    if (!formulation_text) {
      return new Response(JSON.stringify({ error: "formulation_text is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get auth user
    const authHeader = req.headers.get("Authorization");
    let userId: string | null = null;
    if (authHeader) {
      const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!);
      const { data: { user } } = await anonClient.auth.getUser(authHeader.replace("Bearer ", ""));
      userId = user?.id || null;
    }

    // Fetch known ingredients from DB for context
    const { data: knownIngredients } = await supabase
      .from("ingredients")
      .select("name, inci_name, safety_rating, regulatory_status, restrictions, max_concentration, alternatives");

    const markets = target_markets || ["FDA", "EU", "Korea"];

    const systemPrompt = `You are a cosmetic regulatory compliance expert. Analyze formulation ingredient lists against international cosmetic regulations (FDA, EU EC 1223/2009, Korean MFDS).

Known ingredient database for reference:
${JSON.stringify(knownIngredients, null, 2)}

You MUST respond using the suggest_analysis tool.`;

    const userPrompt = `Analyze this formulation for product "${product_name || "Untitled"}":

${formulation_text}

Target markets: ${markets.join(", ")}

For each ingredient:
1. Parse and identify the INCI name
2. Check regulatory status in each target market (approved/restricted/banned)
3. Check concentration limits if mentioned
4. Flag any restricted or banned substances
5. Suggest safer alternatives for any flagged ingredients
6. Detect potential ingredient compatibility issues`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "suggest_analysis",
            description: "Return the full formulation compliance analysis",
            parameters: {
              type: "object",
              properties: {
                parsed_ingredients: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      inci_name: { type: "string" },
                      category: { type: "string" },
                      detected_concentration: { type: "string" },
                      safety_rating: { type: "string", enum: ["Low", "Moderate", "High"] },
                      regulatory_status: {
                        type: "object",
                        properties: {
                          FDA: { type: "string" },
                          EU: { type: "string" },
                          Korea: { type: "string" },
                        }
                      },
                      flags: { type: "array", items: { type: "string" } },
                      alternatives: { type: "array", items: { type: "string" } },
                    },
                    required: ["name", "inci_name", "safety_rating", "regulatory_status"],
                  },
                },
                compliance_results: {
                  type: "object",
                  properties: {
                    overall_status: { type: "string", enum: ["compliant", "warnings", "non_compliant"] },
                    market_readiness: {
                      type: "object",
                      properties: {
                        FDA: { type: "object", properties: { status: { type: "string" }, issues: { type: "array", items: { type: "string" } } } },
                        EU: { type: "object", properties: { status: { type: "string" }, issues: { type: "array", items: { type: "string" } } } },
                        Korea: { type: "object", properties: { status: { type: "string" }, issues: { type: "array", items: { type: "string" } } } },
                      }
                    },
                    banned_ingredients: { type: "array", items: { type: "string" } },
                    restricted_ingredients: { type: "array", items: { type: "string" } },
                    warnings: { type: "array", items: { type: "string" } },
                  }
                },
                suggestions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string", enum: ["replacement", "compatibility", "concentration", "labeling"] },
                      severity: { type: "string", enum: ["info", "warning", "critical"] },
                      ingredient: { type: "string" },
                      message: { type: "string" },
                      suggested_alternative: { type: "string" },
                    },
                    required: ["type", "severity", "message"],
                  },
                },
              },
              required: ["parsed_ingredients", "compliance_results", "suggestions"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "suggest_analysis" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI error:", response.status, text);
      throw new Error("AI analysis failed");
    }

    const aiData = await response.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const analysis = JSON.parse(toolCall.function.arguments);

    // Persist analysis if user authenticated
    if (userId) {
      await supabase.from("formulation_analyses").insert({
        user_id: userId,
        product_name: product_name || "Untitled",
        formulation_text,
        target_markets: markets,
        parsed_ingredients: analysis.parsed_ingredients,
        compliance_results: analysis.compliance_results,
        suggestions: analysis.suggestions,
        overall_status: analysis.compliance_results.overall_status,
      });
    }

    return new Response(JSON.stringify({ success: true, ...analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-formulation error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
