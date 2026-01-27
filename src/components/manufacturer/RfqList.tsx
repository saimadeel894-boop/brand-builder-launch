import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, Loader2 } from "lucide-react";
import { Rfq } from "@/hooks/useRfqs";
import { format } from "date-fns";

interface RfqListProps {
  rfqs: Rfq[];
  loading: boolean;
}

export function RfqList({ rfqs, loading }: RfqListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        );
      case "in_review":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Review
          </Badge>
        );
      case "accepted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (rfqs.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-foreground">No RFQs Yet</h3>
          <p className="text-muted-foreground mt-1">
            You haven't received any requests for quotation yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Incoming RFQs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Deadline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rfqs.map((rfq) => (
                <TableRow key={rfq.id}>
                  <TableCell className="font-medium">{rfq.title}</TableCell>
                  <TableCell>{rfq.brand_name}</TableCell>
                  <TableCell>{rfq.category || "-"}</TableCell>
                  <TableCell>{getStatusBadge(rfq.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(rfq.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {rfq.deadline ? (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(new Date(rfq.deadline), "MMM d, yyyy")}
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
