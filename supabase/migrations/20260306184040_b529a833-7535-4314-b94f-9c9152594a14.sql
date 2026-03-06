
-- Ingredients reference table
CREATE TABLE public.ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  inci_name TEXT NOT NULL,
  cas_number TEXT,
  category TEXT NOT NULL DEFAULT '',
  functions TEXT[] NOT NULL DEFAULT '{}',
  safety_rating TEXT NOT NULL DEFAULT 'Low',
  ewg_score INTEGER DEFAULT 1,
  origin TEXT DEFAULT '',
  max_concentration JSONB DEFAULT '{}',
  regulatory_status JSONB DEFAULT '{}',
  restrictions TEXT[] DEFAULT '{}',
  alternatives TEXT[] DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Allow all authenticated users to read ingredients
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view ingredients" ON public.ingredients FOR SELECT TO authenticated USING (true);

-- Formulation analyses table
CREATE TABLE public.formulation_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_name TEXT NOT NULL DEFAULT 'Untitled',
  formulation_text TEXT NOT NULL,
  target_markets TEXT[] NOT NULL DEFAULT '{FDA,EU}',
  parsed_ingredients JSONB DEFAULT '[]',
  compliance_results JSONB DEFAULT '{}',
  suggestions JSONB DEFAULT '[]',
  overall_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.formulation_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own analyses" ON public.formulation_analyses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create analyses" ON public.formulation_analyses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own analyses" ON public.formulation_analyses FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Seed initial ingredients data
INSERT INTO public.ingredients (name, inci_name, cas_number, category, functions, safety_rating, ewg_score, origin, max_concentration, regulatory_status, restrictions, alternatives, description) VALUES
('Hyaluronic Acid', 'Sodium Hyaluronate', '9067-32-7', 'Humectant', '{"Moisturizing","Anti-aging","Skin conditioning"}', 'Low', 1, 'Biotechnology', '{"EU": "No limit", "FDA": "No limit", "Korea": "No limit"}', '{"EU": "Approved", "FDA": "Approved", "Korea": "Approved"}', '{}', '{"Glycerin","Panthenol","Betaine"}', 'A glycosaminoglycan that retains moisture in the skin.'),
('Niacinamide', 'Niacinamide', '98-92-0', 'Active', '{"Brightening","Pore minimizing","Anti-inflammatory"}', 'Low', 1, 'Synthetic', '{"EU": "No limit", "FDA": "No limit", "Korea": "No limit"}', '{"EU": "Approved", "FDA": "Approved", "Korea": "Approved"}', '{}', '{"Arbutin","Tranexamic Acid","Vitamin C"}', 'Vitamin B3 derivative with multiple skin benefits.'),
('Retinol', 'Retinol', '68-26-8', 'Active', '{"Anti-aging","Cell renewal","Collagen stimulation"}', 'Moderate', 4, 'Synthetic', '{"EU": "0.3% face / 0.05% body", "FDA": "OTC monograph limits", "Korea": "2500 IU/g"}', '{"EU": "Restricted", "FDA": "Approved", "Korea": "Restricted"}', '{"Not for use in lip products (EU)","Pregnancy warning required"}', '{"Bakuchiol","Retinal","Granactive Retinoid"}', 'Vitamin A derivative for anti-aging. Subject to concentration limits.'),
('Salicylic Acid', 'Salicylic Acid', '69-72-7', 'Exfoliant', '{"Acne treatment","Exfoliation","Anti-inflammatory"}', 'Moderate', 3, 'Plant-derived', '{"EU": "2% rinse-off / 0.5% leave-on", "FDA": "0.5-2% OTC", "Korea": "2%"}', '{"EU": "Restricted", "FDA": "OTC Active", "Korea": "Restricted"}', '{"Not for children under 3 (EU)","Concentration limits apply"}', '{"Willow Bark Extract","Mandelic Acid","Azelaic Acid"}', 'Beta hydroxy acid used for acne and exfoliation.'),
('Vitamin C', 'Ascorbic Acid', '50-81-7', 'Antioxidant', '{"Brightening","Antioxidant","Collagen synthesis"}', 'Low', 1, 'Synthetic', '{"EU": "No limit", "FDA": "No limit", "Korea": "No limit"}', '{"EU": "Approved", "FDA": "Approved", "Korea": "Approved"}', '{}', '{"Sodium Ascorbyl Phosphate","Ascorbyl Glucoside","Ethyl Ascorbic Acid"}', 'Powerful antioxidant that brightens skin and boosts collagen.'),
('Centella Asiatica', 'Centella Asiatica Extract', '84696-21-9', 'Botanical', '{"Soothing","Healing","Anti-inflammatory"}', 'Low', 1, 'Plant-derived', '{"EU": "No limit", "FDA": "No limit", "Korea": "No limit"}', '{"EU": "Approved", "FDA": "Approved", "Korea": "Approved"}', '{}', '{"Aloe Vera","Chamomile Extract","Allantoin"}', 'Known as Cica, traditional herb for wound healing.'),
('Glycolic Acid', 'Glycolic Acid', '79-14-1', 'AHA', '{"Exfoliation","Brightening","Anti-aging"}', 'Moderate', 4, 'Synthetic', '{"EU": "4% leave-on / 10% rinse-off", "FDA": "No specific limit", "Korea": "10%"}', '{"EU": "Restricted", "FDA": "Approved", "Korea": "Restricted"}', '{"pH must be >= 3.5 (EU)","Professional use up to 70%"}', '{"Lactic Acid","Mandelic Acid","PHA Gluconolactone"}', 'Smallest AHA molecule for effective exfoliation.'),
('Squalane', 'Squalane', '111-01-3', 'Emollient', '{"Moisturizing","Barrier repair","Non-comedogenic"}', 'Low', 1, 'Plant-derived', '{"EU": "No limit", "FDA": "No limit", "Korea": "No limit"}', '{"EU": "Approved", "FDA": "Approved", "Korea": "Approved"}', '{}', '{"Jojoba Oil","Ceramides","Shea Butter"}', 'Lightweight oil that mimics natural skin lipids.'),
('Hydroquinone', 'Hydroquinone', '123-31-9', 'Active', '{"Skin lightening","Depigmenting"}', 'High', 8, 'Synthetic', '{"EU": "Banned in cosmetics", "FDA": "2% OTC / Rx higher", "Korea": "Banned"}', '{"EU": "Banned", "FDA": "Restricted", "Korea": "Banned"}', '{"Banned in EU & Korea cosmetics","FDA requires OTC monograph","Known skin sensitizer"}', '{"Arbutin","Kojic Acid","Tranexamic Acid","Niacinamide"}', 'Potent depigmenting agent. Banned in several markets.'),
('Titanium Dioxide', 'Titanium Dioxide', '13463-67-7', 'UV Filter', '{"Sun protection","Physical sunscreen","Colorant"}', 'Low', 2, 'Mineral', '{"EU": "25%", "FDA": "25%", "Korea": "25%"}', '{"EU": "Approved (not nano inhaled)", "FDA": "Approved", "Korea": "Approved"}', '{"Nano form: not to be used in spray products (EU)","Must declare nano on label (EU)"}', '{"Zinc Oxide","Bemotrizinol","Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine"}', 'Mineral UV filter providing broad-spectrum protection.'),
('Phenoxyethanol', 'Phenoxyethanol', '122-99-6', 'Preservative', '{"Preservation","Antimicrobial"}', 'Low', 2, 'Synthetic', '{"EU": "1%", "FDA": "1%", "Korea": "1%"}', '{"EU": "Approved", "FDA": "Approved", "Korea": "Approved"}', '{"Max 1% concentration","Not recommended for lip products for children under 3 (EU advisory)"}', '{"Ethylhexylglycerin","Sodium Benzoate","Potassium Sorbate"}', 'Widely used broad-spectrum preservative.'),
('Fragrance', 'Parfum', 'N/A', 'Fragrance', '{"Scenting","Masking"}', 'High', 8, 'Synthetic/Natural', '{"EU": "26 allergens must be declared", "FDA": "No limit", "Korea": "25 allergens declared"}', '{"EU": "Restricted (allergen labeling)", "FDA": "Approved", "Korea": "Restricted (allergen labeling)"}', '{"26 allergens must be individually listed if above threshold (EU)","IFRA standards apply","Common allergen source"}', '{"Essential Oils (specific)","Fragrance-free formulation"}', 'Complex mixture of aroma chemicals. Major allergen concern.');
