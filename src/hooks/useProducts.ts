import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  manufacturer_id: string;
  name: string;
  category: string;
  description: string | null;
  moq: string | null;
  lead_time: string | null;
  price_range: string | null;
  images: string[];
  documents: string[];
  created_at: string;
  updated_at: string;
}

// Helper to normalize nullable arrays
const normalizeProduct = (data: any): Product => ({
  ...data,
  images: data.images || [],
  documents: data.documents || [],
});

export interface CreateProductData {
  manufacturer_id: string;
  name: string;
  category: string;
  description?: string;
  moq?: string;
  lead_time?: string;
  price_range?: string;
  images?: string[];
  documents?: string[];
}

export function useProducts(manufacturerId: string | undefined) {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!manufacturerId) return;

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("manufacturer_id", manufacturerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts((data || []).map(normalizeProduct));
    } catch (error: any) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [manufacturerId, toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = async (data: CreateProductData): Promise<Product | null> => {
    try {
      const { data: product, error } = await supabase
        .from("products")
        .insert(data)
        .select()
        .single();

      if (error) throw error;

      const normalizedProduct = normalizeProduct(product);
      setProducts((prev) => [normalizedProduct, ...prev]);
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      return normalizedProduct;
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      return true;
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      return true;
    } catch (error: any) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
}
