
-- 1. Expand influencer_profiles with performance metrics
ALTER TABLE public.influencer_profiles 
  ADD COLUMN IF NOT EXISTS follower_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS engagement_rate numeric(5,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS audience_geography jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS follower_demographics jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS niche text DEFAULT '',
  ADD COLUMN IF NOT EXISTS location text DEFAULT '';

-- 2. Expand manufacturer_profiles with formulation_expertise
ALTER TABLE public.manufacturer_profiles
  ADD COLUMN IF NOT EXISTS formulation_expertise text[] DEFAULT '{}'::text[];

-- 3. Expand brand_profiles with new fields
ALTER TABLE public.brand_profiles
  ADD COLUMN IF NOT EXISTS product_category text DEFAULT '',
  ADD COLUMN IF NOT EXISTS target_market text DEFAULT '',
  ADD COLUMN IF NOT EXISTS ingredient_preferences text DEFAULT '',
  ADD COLUMN IF NOT EXISTS pricing_positioning text DEFAULT '',
  ADD COLUMN IF NOT EXISTS location text DEFAULT '',
  ADD COLUMN IF NOT EXISTS website text DEFAULT '';

-- 4. Create campaign_performance table
CREATE TABLE IF NOT EXISTS public.campaign_performance (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  influencer_id uuid NOT NULL REFERENCES public.influencer_profiles(id) ON DELETE CASCADE,
  campaign_id text NOT NULL,
  impressions integer DEFAULT 0,
  clicks integer DEFAULT 0,
  conversions integer DEFAULT 0,
  spend numeric(12,2) DEFAULT 0,
  revenue numeric(12,2) DEFAULT 0,
  engagement_rate numeric(5,2) DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on campaign_performance
ALTER TABLE public.campaign_performance ENABLE ROW LEVEL SECURITY;

-- RLS: Influencers can view their own performance data
CREATE POLICY "Influencers can view own performance"
  ON public.campaign_performance FOR SELECT
  USING (influencer_id IN (
    SELECT id FROM public.influencer_profiles WHERE user_id = auth.uid()
  ));

-- RLS: Authenticated users can insert performance data  
CREATE POLICY "Authenticated users can insert performance"
  ON public.campaign_performance FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS: Influencers can update their own performance data
CREATE POLICY "Influencers can update own performance"
  ON public.campaign_performance FOR UPDATE
  USING (influencer_id IN (
    SELECT id FROM public.influencer_profiles WHERE user_id = auth.uid()
  ));

-- Trigger for updated_at
CREATE TRIGGER update_campaign_performance_updated_at
  BEFORE UPDATE ON public.campaign_performance
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
