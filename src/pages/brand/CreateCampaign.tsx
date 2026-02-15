import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { createCampaign } from "@/services/firestore/campaigns";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect } from "react";

const CATEGORIES = [
  "Skincare", "Haircare", "Makeup", "Fragrance", "Body Care",
  "Nail Care", "Men's Grooming", "Sun Care", "Clean Beauty", "Other",
];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [brandName, setBrandName] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [requirements, setRequirements] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    const fetchBrandName = async () => {
      if (!user) return;
      try {
        const snap = await getDoc(doc(db, "brandProfiles", user.uid));
        if (snap.exists()) setBrandName(snap.data().brandName || "");
      } catch (e) {
        console.error(e);
      }
    };
    fetchBrandName();
  }, [user]);

  const handleSubmit = async () => {
    if (!user || !title || !description || !category || !requirements) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const result = await createCampaign({
        brandId: user.uid,
        brandName,
        title,
        description,
        category,
        requirements,
        budget: budget || undefined,
        deadline: deadline || undefined,
        status: "active",
      });

      if (result.error) throw result.error;

      toast({ title: "Campaign Published!", description: "Influencers can now discover your campaign." });
      navigate("/campaign-tracking");
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to create campaign.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" asChild className="-ml-2 mb-4">
          <Link to="/campaign-tracking">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Link>
        </Button>

        <h1 className="text-2xl font-bold text-foreground mb-1">Create Campaign</h1>
        <p className="text-muted-foreground mb-8">Publish a campaign for influencers to discover and apply to.</p>

        <div className="bg-card rounded-xl border shadow-sm p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title *</Label>
            <Input id="title" placeholder="e.g., Summer Skincare Launch" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" rows={4} placeholder="Describe the campaign goals and deliverables..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements *</Label>
            <Textarea id="requirements" rows={3} placeholder="e.g., Minimum 10K followers, beauty niche..." value={requirements} onChange={(e) => setRequirements(e.target.value)} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input id="budget" placeholder="e.g., $500 – $2,000" value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Publishing...</> : <><Send className="h-4 w-4 mr-2" />Publish Campaign</>}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
