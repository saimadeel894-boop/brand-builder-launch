import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { ManufacturerFilters as Filters } from "@/hooks/useManufacturerDiscovery";

interface ManufacturerFiltersProps {
  filters: Filters;
  onUpdateFilters: (filters: Partial<Filters>) => void;
  onResetFilters: () => void;
  availableCategories: string[];
  availableCertifications: string[];
  availableLocations: string[];
  resultCount: number;
}

export function ManufacturerFilters({
  filters,
  onUpdateFilters,
  onResetFilters,
  availableCategories,
  availableCertifications,
  availableLocations,
  resultCount,
}: ManufacturerFiltersProps) {
  const hasActiveFilters =
    filters.search ||
    filters.categories.length > 0 ||
    filters.certifications.length > 0 ||
    filters.location;

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onUpdateFilters({ categories: newCategories });
  };

  const toggleCertification = (cert: string) => {
    const newCerts = filters.certifications.includes(cert)
      ? filters.certifications.filter((c) => c !== cert)
      : [...filters.certifications, cert];
    onUpdateFilters({ certifications: newCerts });
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search manufacturers..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => onUpdateFilters({ search: e.target.value })}
          />
        </div>

        {/* Location Filter */}
        <Select
          value={filters.location || "all"}
          onValueChange={(value) => onUpdateFilters({ location: value === "all" ? "" : value })}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {availableLocations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Sheet (Mobile & Advanced) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  !
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Manufacturers</SheetTitle>
              <SheetDescription>
                Refine your search with specific criteria
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Categories */}
              <div>
                <Label className="text-sm font-medium">Categories</Label>
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {availableCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={`cat-${category}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                  {availableCategories.length === 0 && (
                    <p className="text-sm text-muted-foreground">No categories available</p>
                  )}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <Label className="text-sm font-medium">Certifications</Label>
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {availableCertifications.map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cert-${cert}`}
                        checked={filters.certifications.includes(cert)}
                        onCheckedChange={() => toggleCertification(cert)}
                      />
                      <label
                        htmlFor={`cert-${cert}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {cert}
                      </label>
                    </div>
                  ))}
                  {availableCertifications.length === 0 && (
                    <p className="text-sm text-muted-foreground">No certifications available</p>
                  )}
                </div>
              </div>

              {/* Reset Button */}
              {hasActiveFilters && (
                <Button variant="outline" className="w-full" onClick={onResetFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.categories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => toggleCategory(cat)}
            >
              {cat}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          {filters.certifications.map((cert) => (
            <Badge
              key={cert}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => toggleCertification(cert)}
            >
              {cert}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          {filters.location && (
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={() => onUpdateFilters({ location: "" })}
            >
              {filters.location}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={onResetFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Result Count */}
      <p className="text-sm text-muted-foreground">
        Showing {resultCount} manufacturer{resultCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
