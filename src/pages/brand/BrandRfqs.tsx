import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { RfqList } from "@/components/brand/RfqList";
import { useBrandRfqs } from "@/hooks/useBrandRfqs";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function BrandRfqs() {
  const { user } = useFirebaseAuth();
  const { rfqs, loading } = useBrandRfqs(user?.uid);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My RFQs</h1>
            <p className="mt-1 text-muted-foreground">
              Track and manage your requests for quotation
            </p>
          </div>
          <Button asChild>
            <Link to="/brand/rfqs/create">
              <Plus className="mr-2 h-4 w-4" />
              Create RFQ
            </Link>
          </Button>
        </div>

        {/* RFQ List */}
        <RfqList rfqs={rfqs} loading={loading} />
      </div>
    </DashboardLayout>
  );
}
