import { useState, useEffect, useCallback } from "react";
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  manufacturerId: string;
  name: string;
  category: string;
  description: string | null;
  moq?: number | null;
  moqUnit?: string | null;
  leadTime?: number | null;
  leadTimeUnit?: "days" | "weeks" | "months" | null;
  price?: number | null;
  currency?: "USD" | "EUR" | "JPY" | "CNY" | "KRW" | null;
  images: string[];
  documents: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductData {
  manufacturerId: string;
  name: string;
  category: string;
  description?: string;
  moq?: number;
  moqUnit?: string;
  leadTime?: number;
  leadTimeUnit?: "days" | "weeks" | "months";
  price?: number;
  currency?: "USD" | "EUR" | "JPY" | "CNY" | "KRW";
  images?: string[];
  documents?: string[];
}

export function useProducts(manufacturerId: string | undefined) {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!manufacturerId) {
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, "products"),
        where("manufacturerId", "==", manufacturerId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const productsData: Product[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        productsData.push({
          id: doc.id,
          manufacturerId: data.manufacturerId,
          name: data.name,
          category: data.category,
          description: data.description || null,
          moq: data.moq ?? null,
          moqUnit: data.moqUnit || null,
          leadTime: data.leadTime ?? null,
          leadTimeUnit: data.leadTimeUnit || null,
          price: data.price ?? null,
          currency: data.currency || null,
          images: data.images || [],
          documents: data.documents || [],
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        });
      });

      setProducts(productsData);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description:
          error?.code === "permission-denied"
            ? "Products are blocked by Firestore permissions. Please verify Firestore rules for the 'products' collection."
            : "Failed to load products",
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
      const docRef = await addDoc(collection(db, "products"), {
        ...data,
        images: data.images || [],
        documents: data.documents || [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      const newProduct: Product = {
        id: docRef.id,
        manufacturerId: data.manufacturerId,
        name: data.name,
        category: data.category,
        description: data.description || null,
        moq: data.moq ?? null,
        moqUnit: data.moqUnit || null,
        leadTime: data.leadTime ?? null,
        leadTimeUnit: data.leadTimeUnit || null,
        price: data.price ?? null,
        currency: data.currency || null,
        images: data.images || [],
        documents: data.documents || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setProducts((prev) => [newProduct, ...prev]);
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      return newProduct;
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
      await updateDoc(doc(db, "products", id), {
        ...updates,
        updatedAt: serverTimestamp(),
      });

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
      await deleteDoc(doc(db, "products", id));

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
