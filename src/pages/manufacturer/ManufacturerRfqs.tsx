import { DashboardLayout } from "@/components/DashboardLayout";
import { useManufacturerProfile } from "@/hooks/useManufacturerProfile";
import { useRfqs } from "@/hooks/useRfqs";
import { RfqList } from "@/components/manufacturer/RfqList";
import { Loader2 } from "lucide-react";

export default function ManufacturerRfqs() {
  const { profile, loading: profileLoading } = useManufacturerProfile();
  const { rfqs, loading: rfqsLoading, refetch } = useRfqs(profile?.id);

  if (profileLoading) {
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
        <div>
          <h1 className="text-2xl font-bold text-foreground">Requests for Quotation</h1>
          <p className="text-muted-foreground">
            View and respond to incoming RFQs from brands ({rfqs.length} total)
          </p>
        </div>

        {/* RFQ List */}
        <RfqList 
          rfqs={rfqs} 
          loading={rfqsLoading} 
          manufacturerId={profile.id}
          onRefresh={refetch}
        />
      </div>
    </DashboardLayout>
  );
}
