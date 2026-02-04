import { DashboardLayout } from "@/components/DashboardLayout";
import { ManufacturerCard } from "@/components/brand/ManufacturerCard";
import { ManufacturerFilters } from "@/components/brand/ManufacturerFilters";
import { useManufacturerDiscovery } from "@/hooks/useManufacturerDiscovery";
import { Loader2, Factory } from "lucide-react";

export default function ManufacturerDiscovery() {
  const {
    manufacturers,
    loading,
    filters,
    updateFilters,
    resetFilters,
    availableCategories,
    availableCertifications,
    availableLocations,
  } = useManufacturerDiscovery();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Find Manufacturers</h1>
          <p className="mt-1 text-muted-foreground">
            Browse and discover manufacturers for your products
          </p>
        </div>

        {/* Filters */}
        <ManufacturerFilters
          filters={filters}
          onUpdateFilters={updateFilters}
          onResetFilters={resetFilters}
          availableCategories={availableCategories}
          availableCertifications={availableCertifications}
          availableLocations={availableLocations}
          resultCount={manufacturers.length}
        />

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : manufacturers.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border">
            <Factory className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              No Manufacturers Found
            </h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {manufacturers.map((manufacturer) => (
              <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
