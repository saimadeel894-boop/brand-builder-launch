import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { Package, Tag, Loader2, CheckCircle, Send } from "lucide-react";

interface WhiteLabelCardProps {
  id: string;
  title: string;
  manufacturerName?: string;
  description: string;
  category: string;
  moq?: string;
  priceRange?: string;
  hasApplied: boolean;
  applicationStatus?: string;
  onApply: (id: string, title: string, message?: string) => Promise<{ error: Error | null }>;
  applying: boolean;
}

export function WhiteLabelCard({
  id,
  title,
  manufacturerName,
  description,
  category,
  moq,
  priceRange,
  hasApplied,
  applicationStatus,
  onApply,
  applying,
}: WhiteLabelCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    const result = await onApply(id, title, message);
    if (!result.error) {
      setDialogOpen(false);
      setMessage("");
    }
  };

  return (
    <>
      <div className="bg-card rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground truncate">{title}</h3>
              <Badge variant="secondary" className="shrink-0">
                <Tag className="h-3 w-3 mr-1" />
                {category}
              </Badge>
            </div>
            {manufacturerName && (
              <p className="text-sm text-muted-foreground mb-2">by {manufacturerName}</p>
            )}
            <p className="text-sm text-foreground/80 line-clamp-2 mb-3">{description}</p>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {moq && (
                <span className="flex items-center gap-1">
                  <Package className="h-3 w-3" /> MOQ: {moq}
                </span>
              )}
              {priceRange && (
                <span className="flex items-center gap-1">
                  Price: {priceRange}
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0">
            {hasApplied ? (
              <div className="flex flex-col items-end gap-2">
                <ApplicationStatusBadge status={applicationStatus || "pending"} />
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Applied
                </span>
              </div>
            ) : (
              <Button size="sm" onClick={() => setDialogOpen(true)}>
                <Send className="h-4 w-4 mr-1" /> Apply
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply to "{title}"</DialogTitle>
            <DialogDescription>
              Submit your application for this white-label opportunity.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Describe how you'd promote this product... (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={applying}>
              {applying ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>
              ) : (
                <><Send className="h-4 w-4 mr-1" /> Submit Application</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
