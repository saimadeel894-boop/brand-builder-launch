import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Calendar, Building2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RfqStatusBadge } from "./RfqStatusBadge";
import { BrandRfqDetailDialog } from "./BrandRfqDetailDialog";
import type { BrandRfq } from "@/hooks/useBrandRfqs";

interface RfqListProps {
  rfqs: BrandRfq[];
  loading: boolean;
}

export function RfqList({ rfqs, loading }: RfqListProps) {
  const [selectedRfq, setSelectedRfq] = useState<BrandRfq | null>(null);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-xl border p-6 animate-pulse">
            <div className="h-5 bg-muted rounded w-1/3 mb-2" />
            <div className="h-4 bg-muted rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (rfqs.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-xl border">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">No RFQs Yet</h3>
        <p className="mt-2 text-muted-foreground">
          Start by browsing manufacturers and creating your first RFQ.
        </p>
        <Button asChild className="mt-6">
          <Link to="/brand/manufacturers">Browse Manufacturers</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  RFQ Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Manufacturer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rfqs.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{rfq.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      {rfq.manufacturerName || "Unknown"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {rfq.category || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RfqStatusBadge status={rfq.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {rfq.createdAt
                        ? new Date(rfq.createdAt).toLocaleDateString()
                        : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRfq(rfq)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BrandRfqDetailDialog
        rfq={selectedRfq}
        onClose={() => setSelectedRfq(null)}
      />
    </>
  );
}
