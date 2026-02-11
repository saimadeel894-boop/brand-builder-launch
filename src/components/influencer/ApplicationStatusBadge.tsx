import { Badge } from "@/components/ui/badge";

interface ApplicationStatusBadgeProps {
  status: string;
}

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
          Pending
        </Badge>
      );
    case "accepted":
      return (
        <Badge variant="outline" className="bg-success/10 text-success border-success/30">
          Accepted
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
