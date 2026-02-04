import { Link } from "react-router-dom";
import { Factory, MapPin, Clock, Package, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ManufacturerCardProps {
  manufacturer: {
    id: string;
    companyName: string;
    categories: string[];
    certifications: string[];
    moq: string | null;
    leadTime: string | null;
    description: string | null;
    location: string | null;
  };
}

export function ManufacturerCard({ manufacturer }: ManufacturerCardProps) {
  return (
    <div className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-manufacturer/10">
              <Factory className="h-6 w-6 text-manufacturer" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{manufacturer.companyName}</h3>
              {manufacturer.location && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {manufacturer.location}
                </div>
              )}
            </div>
          </div>
        </div>

        {manufacturer.description && (
          <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
            {manufacturer.description}
          </p>
        )}

        {/* Categories */}
        {manufacturer.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {manufacturer.categories.slice(0, 3).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {manufacturer.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{manufacturer.categories.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Key Metrics */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {manufacturer.moq && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>MOQ: {manufacturer.moq}</span>
            </div>
          )}
          {manufacturer.leadTime && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{manufacturer.leadTime}</span>
            </div>
          )}
        </div>

        {/* Certifications */}
        {manufacturer.certifications.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <Award className="h-4 w-4 text-manufacturer" />
            <div className="flex flex-wrap gap-1">
              {manufacturer.certifications.slice(0, 2).map((cert) => (
                <Badge key={cert} variant="outline" className="text-xs border-manufacturer/30 text-manufacturer">
                  {cert}
                </Badge>
              ))}
              {manufacturer.certifications.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{manufacturer.certifications.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-2">
          <Button asChild className="flex-1">
            <Link to={`/brand/manufacturers/${manufacturer.id}`}>
              View Profile
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={`/brand/rfqs/create?manufacturer=${manufacturer.id}`}>
              Create RFQ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
