import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useManufacturerProfile } from "@/hooks/useManufacturerProfile";
import { useProducts, Product, CreateProductData } from "@/hooks/useProducts";
import { ProductCard } from "@/components/manufacturer/ProductCard";
import { ProductFormDialog } from "@/components/manufacturer/ProductFormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Package, Loader2 } from "lucide-react";

export default function ManufacturerProducts() {
  const { profile, loading: profileLoading } = useManufacturerProfile();
  const { products, loading: productsLoading, createProduct, updateProduct, deleteProduct } = useProducts(profile?.id);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenCreate = () => {
    setEditingProduct(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: CreateProductData | Partial<Product>) => {
    if (editingProduct) {
      return await updateProduct(editingProduct.id, data as Partial<Product>);
    } else {
      return await createProduct(data as CreateProductData);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loading = profileLoading || productsLoading;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Profile not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">
              Manage your product catalog ({products.length} products)
            </p>
          </div>
          <Button onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={deleteProduct}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground">No Products Yet</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              Start adding your products to showcase your manufacturing capabilities to brands.
            </p>
            <Button className="mt-6" onClick={handleOpenCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products match your search</p>
          </div>
        )}
      </div>

      {/* Product Form Dialog */}
      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        manufacturerId={profile.id}
        product={editingProduct}
        onSubmit={handleSubmit}
      />
    </DashboardLayout>
  );
}
