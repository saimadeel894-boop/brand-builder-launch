import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Package, MoreVertical, Edit, Trash2, Image } from "lucide-react";
import { Product } from "@/hooks/useProducts";
import { formatMoq, formatLeadTime, formatPrice } from "@/components/ui/unit-input";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => Promise<boolean>;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(product.id);
    setDeleting(false);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="overflow-hidden">
        {/* Image */}
        <div className="relative h-40 bg-secondary">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <Image className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
          <Badge className="absolute top-2 left-2">{product.category}</Badge>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              {product.description && (
                <CardDescription className="mt-1 line-clamp-2">
                  {product.description}
                </CardDescription>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(product)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDeleteDialogOpen(true)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {product.moq != null && (
              <div>
                <span className="text-muted-foreground">MOQ:</span>{" "}
                <span className="font-medium">{formatMoq(product.moq)}</span>
              </div>
            )}
            {product.leadTime != null && product.leadTimeUnit && (
              <div>
                <span className="text-muted-foreground">Lead:</span>{" "}
                <span className="font-medium">{formatLeadTime(product.leadTime, product.leadTimeUnit)}</span>
              </div>
            )}
            {product.price != null && product.currency && (
              <div className="col-span-2">
                <span className="text-muted-foreground">Price:</span>{" "}
                <span className="font-medium">{formatPrice(product.price, product.currency)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
