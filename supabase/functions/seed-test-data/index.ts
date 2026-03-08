import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function uuid() {
  return crypto.randomUUID();
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randDec(min: number, max: number, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const report: Record<string, number> = {};

  try {
    // ── 1. Profiles + Role-specific profiles ──

    const manufacturers = [
      { company: "GlowTech Labs", cats: ["skincare", "cosmetics"], certs: ["GMP", "ISO 22716", "Cruelty-Free"], moq: "500 units", lead: "4-6 weeks", loc: "Seoul, South Korea", expertise: ["serums", "emulsions", "actives"], desc: "Premium K-beauty contract manufacturer specializing in innovative serums and ampoules." },
      { company: "PureVita Manufacturing", cats: ["supplements", "wellness"], certs: ["GMP", "FDA Registered", "NSF"], moq: "1000 units", lead: "6-8 weeks", loc: "Los Angeles, USA", expertise: ["capsules", "powders", "gummies"], desc: "FDA-registered supplement manufacturer with state-of-the-art facilities." },
      { company: "HairScience Pro", cats: ["haircare", "personal care"], certs: ["ISO 9001", "GMP", "Organic Certified"], moq: "300 units", lead: "3-5 weeks", loc: "Milan, Italy", expertise: ["shampoos", "conditioners", "treatments"], desc: "European haircare specialist with organic formulation expertise." },
      { company: "DermaCraft Co.", cats: ["skincare", "personal care"], certs: ["GMP", "Dermatologically Tested", "Vegan"], moq: "200 units", lead: "2-4 weeks", loc: "Tokyo, Japan", expertise: ["moisturizers", "cleansers", "sunscreens"], desc: "Japanese precision skincare manufacturer with dermatological focus." },
      { company: "NatureLux Cosmetics", cats: ["cosmetics", "skincare"], certs: ["GMP", "Leaping Bunny", "EWG Verified"], moq: "750 units", lead: "5-7 weeks", loc: "Paris, France", expertise: ["foundations", "lip products", "eye cosmetics"], desc: "Luxury clean beauty manufacturer based in Paris." },
      { company: "BioBlend Nutrition", cats: ["supplements", "wellness", "personal care"], certs: ["GMP", "USDA Organic", "Non-GMO"], moq: "2000 units", lead: "8-10 weeks", loc: "Toronto, Canada", expertise: ["protein powders", "vitamins", "probiotics"], desc: "Large-scale organic supplement manufacturer." },
      { company: "AquaPure Skincare", cats: ["skincare"], certs: ["GMP", "ISO 22716", "EcoCert"], moq: "100 units", lead: "2-3 weeks", loc: "Jeju, South Korea", expertise: ["toners", "essences", "sheet masks"], desc: "Boutique K-beauty manufacturer specializing in hydration products." },
      { company: "Luxe Hair Global", cats: ["haircare"], certs: ["GMP", "Cruelty-Free", "Sulfate-Free Certified"], moq: "500 units", lead: "4-6 weeks", loc: "New York, USA", expertise: ["styling products", "oils", "scalp treatments"], desc: "Premium haircare manufacturer for prestige brands." },
      { company: "VerdeBella Labs", cats: ["cosmetics", "personal care"], certs: ["GMP", "Organic", "Fair Trade"], moq: "250 units", lead: "3-4 weeks", loc: "São Paulo, Brazil", expertise: ["body care", "fragrances", "color cosmetics"], desc: "Brazilian natural beauty manufacturer with sustainable sourcing." },
      { company: "ZenFormula Inc.", cats: ["skincare", "supplements"], certs: ["GMP", "ISO 9001", "Halal Certified"], moq: "1500 units", lead: "6-8 weeks", loc: "Kuala Lumpur, Malaysia", expertise: ["anti-aging", "whitening", "herbal supplements"], desc: "Southeast Asian manufacturer specializing in halal-certified beauty and wellness." },
    ];

    const brands = [
      { name: "Luminara Beauty", industry: "Beauty & Cosmetics", cat: "skincare", market: "North America", prefs: "clean ingredients, no parabens", pricing: "premium", loc: "New York, USA", web: "https://luminara.com" },
      { name: "VitalGlow", industry: "Health & Wellness", cat: "supplements", market: "Global", prefs: "organic, plant-based", pricing: "mid-range", loc: "San Francisco, USA", web: "https://vitalglow.com" },
      { name: "Seoul Radiance", industry: "K-Beauty", cat: "skincare", market: "Asia Pacific", prefs: "fermented ingredients, snail mucin", pricing: "premium", loc: "Seoul, South Korea", web: "https://seoulradiance.kr" },
      { name: "EcoMane", industry: "Haircare", cat: "haircare", market: "Europe", prefs: "sulfate-free, vegan", pricing: "mid-range", loc: "London, UK", web: "https://ecomane.co.uk" },
      { name: "PureForm Athletics", industry: "Sports Nutrition", cat: "supplements", market: "North America", prefs: "whey isolate, no artificial sweeteners", pricing: "premium", loc: "Austin, USA", web: "https://pureform.fit" },
      { name: "Bloom Collective", industry: "Clean Beauty", cat: "cosmetics", market: "Global", prefs: "EWG verified, mineral-based", pricing: "luxury", loc: "Paris, France", web: "https://bloomcollective.fr" },
      { name: "DermaFirst", industry: "Dermocosmetics", cat: "skincare", market: "Europe", prefs: "clinically tested, fragrance-free", pricing: "premium", loc: "Munich, Germany", web: "https://dermafirst.de" },
      { name: "Tropica Naturals", industry: "Natural Beauty", cat: "personal care", market: "Latin America", prefs: "organic oils, fair-trade ingredients", pricing: "mid-range", loc: "São Paulo, Brazil", web: "https://tropicanaturals.com.br" },
      { name: "ZenSkin Japan", industry: "J-Beauty", cat: "skincare", market: "Asia Pacific", prefs: "rice bran, green tea, minimalist", pricing: "premium", loc: "Tokyo, Japan", web: "https://zenskin.jp" },
      { name: "FreshStart Wellness", industry: "Wellness", cat: "supplements", market: "North America", prefs: "adaptogens, mushroom extracts", pricing: "mid-range", loc: "Portland, USA", web: "https://freshstartwellness.com" },
    ];

    const influencers = [
      { name: "Mia Chen", platform: "Instagram", niche: "skincare", loc: "Los Angeles, USA", followers: 520000, eng: 4.2, geo: { US: 45, KR: 20, UK: 15, CA: 10, AU: 10 }, demo: { "18-24": 30, "25-34": 45, "35-44": 20, "45+": 5 } },
      { name: "Hana Kim", platform: "YouTube", niche: "beauty", loc: "Seoul, South Korea", followers: 1200000, eng: 5.1, geo: { KR: 40, US: 25, JP: 15, TW: 10, TH: 10 }, demo: { "18-24": 35, "25-34": 40, "35-44": 20, "45+": 5 } },
      { name: "Sophie Laurent", platform: "TikTok", niche: "skincare", loc: "Paris, France", followers: 340000, eng: 6.8, geo: { FR: 35, US: 25, UK: 15, DE: 15, ES: 10 }, demo: { "18-24": 50, "25-34": 35, "35-44": 10, "45+": 5 } },
      { name: "Jake Williams", platform: "YouTube", niche: "fitness", loc: "London, UK", followers: 890000, eng: 3.5, geo: { UK: 40, US: 30, AU: 15, CA: 10, IE: 5 }, demo: { "18-24": 25, "25-34": 40, "35-44": 25, "45+": 10 } },
      { name: "Aisha Patel", platform: "Instagram", niche: "wellness", loc: "Mumbai, India", followers: 250000, eng: 7.2, geo: { IN: 50, US: 20, UK: 15, AE: 10, SG: 5 }, demo: { "18-24": 20, "25-34": 45, "35-44": 25, "45+": 10 } },
      { name: "Carlos Rivera", platform: "TikTok", niche: "lifestyle", loc: "Mexico City, Mexico", followers: 780000, eng: 5.5, geo: { MX: 35, US: 30, CO: 15, ES: 10, AR: 10 }, demo: { "18-24": 45, "25-34": 35, "35-44": 15, "45+": 5 } },
      { name: "Emma Johnson", platform: "Instagram", niche: "beauty", loc: "New York, USA", followers: 150000, eng: 8.1, geo: { US: 60, CA: 15, UK: 10, AU: 10, FR: 5 }, demo: { "18-24": 30, "25-34": 45, "35-44": 20, "45+": 5 } },
      { name: "Yuki Tanaka", platform: "YouTube", niche: "skincare", loc: "Tokyo, Japan", followers: 430000, eng: 4.8, geo: { JP: 50, KR: 20, US: 15, TW: 10, TH: 5 }, demo: { "18-24": 25, "25-34": 40, "35-44": 25, "45+": 10 } },
      { name: "Lina Andersson", platform: "TikTok", niche: "wellness", loc: "Stockholm, Sweden", followers: 95000, eng: 6.3, geo: { SE: 30, US: 25, DE: 20, UK: 15, NO: 10 }, demo: { "18-24": 40, "25-34": 40, "35-44": 15, "45+": 5 } },
      { name: "Priya Sharma", platform: "Instagram", niche: "beauty", loc: "Dubai, UAE", followers: 670000, eng: 3.9, geo: { AE: 25, IN: 25, US: 20, UK: 15, SA: 15 }, demo: { "18-24": 20, "25-34": 45, "35-44": 25, "45+": 10 } },
      { name: "Marcus Brown", platform: "YouTube", niche: "fitness", loc: "Sydney, Australia", followers: 310000, eng: 5.7, geo: { AU: 40, US: 25, UK: 20, NZ: 10, CA: 5 }, demo: { "18-24": 30, "25-34": 40, "35-44": 20, "45+": 10 } },
      { name: "Isabella Costa", platform: "Instagram", niche: "lifestyle", loc: "São Paulo, Brazil", followers: 420000, eng: 4.5, geo: { BR: 45, US: 20, PT: 15, MX: 10, AR: 10 }, demo: { "18-24": 35, "25-34": 40, "35-44": 20, "45+": 5 } },
      { name: "David Lee", platform: "TikTok", niche: "skincare", loc: "Toronto, Canada", followers: 180000, eng: 7.4, geo: { CA: 35, US: 35, UK: 15, AU: 10, KR: 5 }, demo: { "18-24": 45, "25-34": 35, "35-44": 15, "45+": 5 } },
      { name: "Fatima Al-Hassan", platform: "Instagram", niche: "beauty", loc: "Riyadh, Saudi Arabia", followers: 540000, eng: 4.1, geo: { SA: 35, AE: 25, EG: 15, KW: 15, US: 10 }, demo: { "18-24": 25, "25-34": 45, "35-44": 20, "45+": 10 } },
      { name: "Olivia Martin", platform: "YouTube", niche: "wellness", loc: "Berlin, Germany", followers: 210000, eng: 6.0, geo: { DE: 35, US: 25, AT: 15, CH: 15, UK: 10 }, demo: { "18-24": 20, "25-34": 45, "35-44": 25, "45+": 10 } },
      { name: "Ryan Park", platform: "TikTok", niche: "beauty", loc: "Seoul, South Korea", followers: 950000, eng: 5.3, geo: { KR: 45, US: 20, JP: 15, TH: 10, VN: 10 }, demo: { "18-24": 50, "25-34": 35, "35-44": 10, "45+": 5 } },
      { name: "Ava Thompson", platform: "Instagram", niche: "skincare", loc: "Chicago, USA", followers: 75000, eng: 8.5, geo: { US: 65, CA: 15, UK: 10, AU: 5, MX: 5 }, demo: { "18-24": 35, "25-34": 40, "35-44": 20, "45+": 5 } },
      { name: "Leo Rossi", platform: "YouTube", niche: "fitness", loc: "Rome, Italy", followers: 620000, eng: 3.8, geo: { IT: 40, US: 20, ES: 15, FR: 15, DE: 10 }, demo: { "18-24": 25, "25-34": 40, "35-44": 25, "45+": 10 } },
      { name: "Nina Johansson", platform: "TikTok", niche: "lifestyle", loc: "Copenhagen, Denmark", followers: 130000, eng: 7.0, geo: { DK: 30, SE: 20, US: 20, UK: 15, NO: 15 }, demo: { "18-24": 45, "25-34": 35, "35-44": 15, "45+": 5 } },
      { name: "Zara Ahmed", platform: "Instagram", niche: "wellness", loc: "London, UK", followers: 280000, eng: 5.9, geo: { UK: 40, US: 25, AE: 15, PK: 10, CA: 10 }, demo: { "18-24": 25, "25-34": 45, "35-44": 20, "45+": 10 } },
    ];

    // Create profiles and role-specific profiles
    const mfgIds: string[] = [];
    const brandIds: string[] = [];
    const infIds: string[] = [];
    const profileRows: any[] = [];
    const mfgRows: any[] = [];
    const brandRows: any[] = [];
    const infRows: any[] = [];

    for (let i = 0; i < manufacturers.length; i++) {
      const profileId = uuid();
      const mfgId = uuid();
      const m = manufacturers[i];
      profileRows.push({ id: profileId, email: `mfg${i + 1}@test.beautyhub.com`, role: "manufacturer", profile_completed: true, status: "active" });
      mfgRows.push({ id: mfgId, user_id: profileId, company_name: m.company, categories: m.cats, certifications: m.certs, moq: m.moq, lead_time: m.lead, location: m.loc, formulation_expertise: m.expertise, description: m.desc });
      mfgIds.push(mfgId);
    }

    for (let i = 0; i < brands.length; i++) {
      const profileId = uuid();
      const brandId = uuid();
      const b = brands[i];
      profileRows.push({ id: profileId, email: `brand${i + 1}@test.beautyhub.com`, role: "brand", profile_completed: true, status: "active" });
      brandRows.push({ id: brandId, user_id: profileId, brand_name: b.name, industry: b.industry, product_category: b.cat, target_market: b.market, ingredient_preferences: b.prefs, pricing_positioning: b.pricing, location: b.loc, website: b.web });
      brandIds.push(brandId);
    }

    for (let i = 0; i < influencers.length; i++) {
      const profileId = uuid();
      const infId = uuid();
      const inf = influencers[i];
      profileRows.push({ id: profileId, email: `influencer${i + 1}@test.beautyhub.com`, role: "influencer", profile_completed: true, status: "active" });
      infRows.push({ id: infId, user_id: profileId, name: inf.name, primary_platform: inf.platform, niche: inf.niche, location: inf.loc, follower_count: inf.followers, engagement_rate: inf.eng, audience_geography: inf.geo, follower_demographics: inf.demo });
      infIds.push(infId);
    }

    // Insert all profiles
    const { error: pErr } = await supabaseAdmin.from("profiles").insert(profileRows);
    if (pErr) throw new Error(`Profiles insert: ${pErr.message}`);

    const { error: mErr } = await supabaseAdmin.from("manufacturer_profiles").insert(mfgRows);
    if (mErr) throw new Error(`Manufacturer profiles: ${mErr.message}`);

    const { error: bErr } = await supabaseAdmin.from("brand_profiles").insert(brandRows);
    if (bErr) throw new Error(`Brand profiles: ${bErr.message}`);

    const { error: iErr } = await supabaseAdmin.from("influencer_profiles").insert(infRows);
    if (iErr) throw new Error(`Influencer profiles: ${iErr.message}`);

    report.profiles = profileRows.length;
    report.manufacturers = mfgRows.length;
    report.brands = brandRows.length;
    report.influencers = infRows.length;

    // ── 2. Campaign Performance ──
    const campPerf: any[] = [];
    for (let i = 0; i < 30; i++) {
      const infId = pick(infIds);
      const impressions = randInt(5000, 500000);
      const clicks = randInt(Math.floor(impressions * 0.01), Math.floor(impressions * 0.08));
      const conversions = randInt(Math.floor(clicks * 0.02), Math.floor(clicks * 0.15));
      const spend = randDec(200, 15000);
      const revenue = randDec(spend * 0.5, spend * 5);
      campPerf.push({
        influencer_id: infId,
        campaign_id: `campaign-${uuid().slice(0, 8)}`,
        impressions, clicks, conversions, spend, revenue,
        engagement_rate: randDec(1.5, 9.0),
      });
    }
    const { error: cpErr } = await supabaseAdmin.from("campaign_performance").insert(campPerf);
    if (cpErr) throw new Error(`Campaign performance: ${cpErr.message}`);
    report.campaign_performance = campPerf.length;

    // ── 3. Engagement Metrics ──
    const engMetrics: any[] = [];
    for (let i = 0; i < 40; i++) {
      const views = randInt(1000, 200000);
      engMetrics.push({
        influencer_id: pick(infIds),
        campaign_id: `campaign-${uuid().slice(0, 8)}`,
        views,
        likes: randInt(Math.floor(views * 0.02), Math.floor(views * 0.1)),
        comments: randInt(Math.floor(views * 0.001), Math.floor(views * 0.02)),
        shares: randInt(Math.floor(views * 0.005), Math.floor(views * 0.03)),
        post_url: `https://instagram.com/p/${uuid().slice(0, 10)}`,
      });
    }
    const { error: emErr } = await supabaseAdmin.from("engagement_metrics").insert(engMetrics);
    if (emErr) throw new Error(`Engagement metrics: ${emErr.message}`);
    report.engagement_metrics = engMetrics.length;

    // ── 4. Conversion Metrics ──
    const convMetrics: any[] = [];
    for (let i = 0; i < 30; i++) {
      const clicks = randInt(100, 10000);
      convMetrics.push({
        influencer_id: pick(infIds),
        campaign_id: `campaign-${uuid().slice(0, 8)}`,
        clicks,
        affiliate_traffic: randInt(Math.floor(clicks * 0.3), clicks),
        promo_code_usage: randInt(10, Math.floor(clicks * 0.2)),
        conversions: randInt(5, Math.floor(clicks * 0.1)),
        revenue: randDec(100, 20000),
      });
    }
    const { error: cmErr } = await supabaseAdmin.from("conversion_metrics").insert(convMetrics);
    if (cmErr) throw new Error(`Conversion metrics: ${cmErr.message}`);
    report.conversion_metrics = convMetrics.length;

    // ── 5. AI Matches ──
    const matches: any[] = [];
    for (const brandId of brandIds) {
      // Match each brand with several manufacturers
      for (const mfgId of mfgIds) {
        const score = randInt(35, 95);
        const reasons = ["strong formulation fit", "certification overlap", "location aligned", "MOQ compatible", "lead time suitable"];
        const explanation = `Score ${score}: ${pick(reasons)}, ${pick(reasons)}.`;
        matches.push({ brand_id: brandId, candidate_id: mfgId, candidate_type: "manufacturer", score, explanation });
      }
      // Match each brand with a subset of influencers
      const shuffled = [...infIds].sort(() => Math.random() - 0.5).slice(0, randInt(5, 10));
      for (const infId of shuffled) {
        const score = randInt(30, 92);
        const reasons = ["niche alignment", "high engagement rate", "audience geography match", "platform relevance", "strong follower demographics"];
        const explanation = `Score ${score}: ${pick(reasons)}, ${pick(reasons)}.`;
        matches.push({ brand_id: brandId, candidate_id: infId, candidate_type: "influencer", score, explanation });
      }
    }
    const { error: amErr } = await supabaseAdmin.from("ai_matches").insert(matches);
    if (amErr) throw new Error(`AI matches: ${amErr.message}`);
    report.ai_matches = matches.length;

    // ── 6. Escrow System ──
    const milestoneTemplates = ["Sampling", "Formulation Approval", "Mass Production", "Quality Check", "Shipment"];
    const escrowMilestones: any[] = [];
    const walletRows: any[] = [];
    const txRows: any[] = [];

    for (let c = 0; c < 5; c++) {
      const brandId = brandIds[c];
      const mfgId = mfgIds[c];
      const contractId = `contract-${uuid().slice(0, 8)}`;
      const brandProfileId = brandRows[c].user_id;
      const mfgProfileId = mfgRows[c].user_id;

      for (let m = 0; m < milestoneTemplates.length; m++) {
        const amount = randDec(500, 5000);
        const statuses = ["pending", "funded", "approved", "released"];
        const status = statuses[Math.min(m, statuses.length - 1)];
        const msId = uuid();
        escrowMilestones.push({
          id: msId, contract_id: contractId, title: milestoneTemplates[m],
          description: `${milestoneTemplates[m]} milestone for contract ${contractId}`,
          amount, milestone_order: m + 1, brand_id: brandId, manufacturer_id: mfgId, status,
          funded_at: m >= 1 ? new Date().toISOString() : null,
          approved_at: m >= 2 ? new Date().toISOString() : null,
          released_at: m >= 3 ? new Date().toISOString() : null,
        });

        // Transaction for funded+ milestones
        if (m >= 1) {
          const fee = parseFloat((amount * 0.05).toFixed(2));
          txRows.push({
            payer_id: brandId, receiver_id: mfgId, amount,
            platform_fee: fee, net_amount: parseFloat((amount - fee).toFixed(2)),
            milestone_id: msId, escrow_status: status,
            transaction_type: status === "released" ? "escrow_release" : "escrow_deposit",
            description: `${milestoneTemplates[m]} - ${contractId}`,
          });
        }
      }

      // Wallets for brand and manufacturer users
      walletRows.push({ user_id: brandProfileId, balance: randDec(1000, 50000), pending_balance: randDec(500, 10000), total_sent: randDec(2000, 30000), total_received: 0 });
      walletRows.push({ user_id: mfgProfileId, balance: randDec(500, 20000), pending_balance: randDec(200, 5000), total_sent: 0, total_received: randDec(1000, 25000) });
    }

    const { error: esErr } = await supabaseAdmin.from("escrow_milestones").insert(escrowMilestones);
    if (esErr) throw new Error(`Escrow milestones: ${esErr.message}`);

    const { error: wErr } = await supabaseAdmin.from("wallets").insert(walletRows);
    if (wErr) throw new Error(`Wallets: ${wErr.message}`);

    const { error: tErr } = await supabaseAdmin.from("transactions").insert(txRows);
    if (tErr) throw new Error(`Transactions: ${tErr.message}`);

    report.escrow_milestones = escrowMilestones.length;
    report.wallets = walletRows.length;
    report.transactions = txRows.length;

    return new Response(JSON.stringify({ success: true, report }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Seed error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error", report }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
