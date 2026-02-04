import { Badge } from "@/components/ui/badge";

interface RfqStatusBadgeProps {
  status: string;
}

export function RfqStatusBadge({ status }: RfqStatusBadgeProps) {
  switch (status) {
    case "draft":
      return (
        <Badge variant="outline" className="bg-muted text-muted-foreground border-muted">
          Draft
        </Badge>
      );
    case "sent":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Sent
        </Badge>
      );
    case "viewed":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Viewed
        </Badge>
      );
    case "in_review":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          In Review
        </Badge>
      );
    case "responded":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Responded
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
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          Completed
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">{status}</Badge>
      );
  }
}
