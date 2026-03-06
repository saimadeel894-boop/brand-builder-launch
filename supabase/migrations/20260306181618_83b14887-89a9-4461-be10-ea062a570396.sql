
-- Engagement metrics per influencer per campaign per post
CREATE TABLE public.engagement_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid NOT NULL REFERENCES public.influencer_profiles(id) ON DELETE CASCADE,
  campaign_id text NOT NULL,
  post_url text,
  views integer NOT NULL DEFAULT 0,
  likes integer NOT NULL DEFAULT 0,
  comments integer NOT NULL DEFAULT 0,
  shares integer NOT NULL DEFAULT 0,
  recorded_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.engagement_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Influencers can view own engagement" ON public.engagement_metrics
  FOR SELECT TO authenticated
  USING (influencer_id IN (SELECT id FROM influencer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Authenticated can insert engagement" ON public.engagement_metrics
  FOR INSERT TO authenticated
  WITH CHECK (influencer_id IN (SELECT id FROM influencer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Influencers can update own engagement" ON public.engagement_metrics
  FOR UPDATE TO authenticated
  USING (influencer_id IN (SELECT id FROM influencer_profiles WHERE user_id = auth.uid()));

-- Brand users can view engagement for their campaigns
CREATE POLICY "Brands can view campaign engagement" ON public.engagement_metrics
  FOR SELECT TO authenticated
  USING (campaign_id IN (
    SELECT id::text FROM rfqs WHERE brand_id IN (SELECT id FROM brand_profiles WHERE user_id = auth.uid())
  ));

CREATE INDEX idx_engagement_influencer ON public.engagement_metrics (influencer_id);
CREATE INDEX idx_engagement_campaign ON public.engagement_metrics (campaign_id);

-- Conversion metrics per influencer per campaign
CREATE TABLE public.conversion_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid NOT NULL REFERENCES public.influencer_profiles(id) ON DELETE CASCADE,
  campaign_id text NOT NULL,
  clicks integer NOT NULL DEFAULT 0,
  affiliate_traffic integer NOT NULL DEFAULT 0,
  promo_code_usage integer NOT NULL DEFAULT 0,
  conversions integer NOT NULL DEFAULT 0,
  revenue numeric NOT NULL DEFAULT 0,
  recorded_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.conversion_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Influencers can view own conversions" ON public.conversion_metrics
  FOR SELECT TO authenticated
  USING (influencer_id IN (SELECT id FROM influencer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Authenticated can insert conversions" ON public.conversion_metrics
  FOR INSERT TO authenticated
  WITH CHECK (influencer_id IN (SELECT id FROM influencer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Influencers can update own conversions" ON public.conversion_metrics
  FOR UPDATE TO authenticated
  USING (influencer_id IN (SELECT id FROM influencer_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Brands can view campaign conversions" ON public.conversion_metrics
  FOR SELECT TO authenticated
  USING (campaign_id IN (
    SELECT id::text FROM rfqs WHERE brand_id IN (SELECT id FROM brand_profiles WHERE user_id = auth.uid())
  ));

CREATE INDEX idx_conversion_influencer ON public.conversion_metrics (influencer_id);
CREATE INDEX idx_conversion_campaign ON public.conversion_metrics (campaign_id);

-- Also add SELECT policy on campaign_performance for brands
CREATE POLICY "Brands can view campaign performance" ON public.campaign_performance
  FOR SELECT TO authenticated
  USING (campaign_id IN (
    SELECT id::text FROM rfqs WHERE brand_id IN (SELECT id FROM brand_profiles WHERE user_id = auth.uid())
  ));
