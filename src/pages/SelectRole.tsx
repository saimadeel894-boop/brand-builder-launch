import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { OnboardingLayout } from "@/components/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Factory, Building2, Users, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "manufacturer" | "brand" | "influencer";

interface RoleOption {
  id: Role;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
}

const roles: RoleOption[] = [
  {
    id: "manufacturer",
    title: "Manufacturer",
    description: "Produce and supply products for brands and retailers",
    icon: Factory,
    colorClass: "text-manufacturer",
  },
  {
    id: "brand",
    title: "Brand",
    description: "Create and market beauty products to consumers",
    icon: Building2,
    colorClass: "text-brand",
  },
  {
    id: "influencer",
    title: "Influencer",
    description: "Promote products to your audience and community",
    icon: Users,
    colorClass: "text-influencer",
  },
];

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const { updateRole } = useFirebaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "You need to select a role to continue",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await updateRole(selectedRole);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save your role. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    navigate("/create-profile");
  };

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={3}
      title="Choose your role"
      subtitle="Select the role that best describes you"
    >
      <div className="space-y-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={cn(
                "role-card w-full text-left",
                isSelected && "selected"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn("rounded-lg bg-secondary p-3", role.colorClass)}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{role.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Button
        onClick={handleContinue}
        className="mt-8 w-full"
        disabled={!selectedRole || loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Continue"
        )}
      </Button>
    </OnboardingLayout>
  );
}
