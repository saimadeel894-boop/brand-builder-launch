-- Add MOQ and lead_time to manufacturer_profiles
ALTER TABLE public.manufacturer_profiles 
ADD COLUMN IF NOT EXISTS moq text,
ADD COLUMN IF NOT EXISTS lead_time text,
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS website text;

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  manufacturer_id UUID NOT NULL REFERENCES public.manufacturer_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  moq TEXT,
  lead_time TEXT,
  price_range TEXT,
  images TEXT[] DEFAULT '{}',
  documents TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products policies - manufacturers can manage their own products
CREATE POLICY "Manufacturers can view their own products"
ON public.products FOR SELECT
USING (
  manufacturer_id IN (
    SELECT id FROM public.manufacturer_profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Manufacturers can create products"
ON public.products FOR INSERT
WITH CHECK (
  manufacturer_id IN (
    SELECT id FROM public.manufacturer_profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Manufacturers can update their own products"
ON public.products FOR UPDATE
USING (
  manufacturer_id IN (
    SELECT id FROM public.manufacturer_profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Manufacturers can delete their own products"
ON public.products FOR DELETE
USING (
  manufacturer_id IN (
    SELECT id FROM public.manufacturer_profiles WHERE user_id = auth.uid()
  )
);

-- Create trigger for products updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create RFQs table
CREATE TABLE public.rfqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID NOT NULL REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
  manufacturer_id UUID NOT NULL REFERENCES public.manufacturer_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  quantity TEXT,
  budget TEXT,
  deadline DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'accepted', 'rejected', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on RFQs
ALTER TABLE public.rfqs ENABLE ROW LEVEL SECURITY;

-- RFQ policies - manufacturers can view RFQs sent to them (read-only for now)
CREATE POLICY "Manufacturers can view RFQs sent to them"
ON public.rfqs FOR SELECT
USING (
  manufacturer_id IN (
    SELECT id FROM public.manufacturer_profiles WHERE user_id = auth.uid()
  )
);

-- Brands can view their own RFQs
CREATE POLICY "Brands can view their own RFQs"
ON public.rfqs FOR SELECT
USING (
  brand_id IN (
    SELECT id FROM public.brand_profiles WHERE user_id = auth.uid()
  )
);

-- Brands can create RFQs (for future use)
CREATE POLICY "Brands can create RFQs"
ON public.rfqs FOR INSERT
WITH CHECK (
  brand_id IN (
    SELECT id FROM public.brand_profiles WHERE user_id = auth.uid()
  )
);

-- Create trigger for RFQs updated_at
CREATE TRIGGER update_rfqs_updated_at
BEFORE UPDATE ON public.rfqs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policies for product images (public read, authenticated upload)
CREATE POLICY "Product images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own product images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own product images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for documents (private, owner access only)
CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);