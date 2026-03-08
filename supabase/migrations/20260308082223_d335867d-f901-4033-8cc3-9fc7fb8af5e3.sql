CREATE POLICY "Authenticated users can view manufacturer profiles"
ON public.manufacturer_profiles
FOR SELECT
TO authenticated
USING (true);