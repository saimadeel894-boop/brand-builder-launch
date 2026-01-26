-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('manufacturer', 'brand', 'influencer');

-- Create profiles table (replaces users collection - stores main user data)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role,
  profile_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create manufacturer_profiles table
CREATE TABLE public.manufacturer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  categories TEXT[] NOT NULL DEFAULT '{}',
  certifications TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create brand_profiles table  
CREATE TABLE public.brand_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  brand_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create influencer_profiles table
CREATE TABLE public.influencer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  primary_platform TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manufacturer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for manufacturer_profiles
CREATE POLICY "Manufacturers can view their own profile"
  ON public.manufacturer_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Manufacturers can insert their own profile"
  ON public.manufacturer_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = user_id 
    AND EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'manufacturer'
    )
  );

CREATE POLICY "Manufacturers can update their own profile"
  ON public.manufacturer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for brand_profiles
CREATE POLICY "Brands can view their own profile"
  ON public.brand_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Brands can insert their own profile"
  ON public.brand_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = user_id 
    AND EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'brand'
    )
  );

CREATE POLICY "Brands can update their own profile"
  ON public.brand_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for influencer_profiles
CREATE POLICY "Influencers can view their own profile"
  ON public.influencer_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Influencers can insert their own profile"
  ON public.influencer_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = user_id 
    AND EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'influencer'
    )
  );

CREATE POLICY "Influencers can update their own profile"
  ON public.influencer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_manufacturer_profiles_updated_at
  BEFORE UPDATE ON public.manufacturer_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_brand_profiles_updated_at
  BEFORE UPDATE ON public.brand_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_influencer_profiles_updated_at
  BEFORE UPDATE ON public.influencer_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();