import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { useManufacturerDiscovery } from "@/hooks/useManufacturerDiscovery";
import { createRfq, uploadRfqAttachment, addAttachmentsToRfq, sendRfq } from "@/services/firestore/brandRfqs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Factory,
  FileText,
  Upload,
  X,
  Loader2,
  Check,
  Send,
  Save,
} from "lucide-react";

const CATEGORIES = [
  "Skincare",
  "Haircare",
  "Makeup",
  "Fragrance",
  "Body Care",
  "Nail Care",
  "Men's Grooming",
  "Sun Care",
  "Baby Care",
  "Oral Care",
  "Other",
];

const CERTIFICATIONS = [
  "ISO 22716",
  "GMP",
  "Cruelty-Free",
  "Vegan",
  "Organic",
  "FDA Registered",
  "EU Compliant",
  "HALAL",
  "Kosher",
];

const STEPS = [
  { id: 1, title: "Select Manufacturer" },
  { id: 2, title: "Product Details" },
  { id: 3, title: "Requirements" },
  { id: 4, title: "Review & Send" },
];

export default function CreateRfq() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useFirebaseAuth();
  const { toast } = useToast();
  const { manufacturers, loading: loadingMfgs } = useManufacturerDiscovery();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  // Pre-select manufacturer from URL param
  useEffect(() => {
    const manufacturerId = searchParams.get("manufacturer");
    if (manufacturerId) {
      setSelectedManufacturer(manufacturerId);
      setCurrentStep(2);
    }
  }, [searchParams]);

  const selectedMfg = manufacturers.find((m) => m.id === selectedManufacturer);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCertification = (cert: string) => {
    setSelectedCertifications((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!selectedManufacturer;
      case 2:
        return !!title && !!category && !!quantity;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async (asDraft: boolean) => {
    if (!user) return;

    setSubmitting(true);
    try {
      // Create RFQ
      const rfqId = await createRfq({
        brandId: user.uid,
        manufacturerId: selectedManufacturer,
        title,
        description,
        category,
        quantity,
        budget,
        deadline,
        certifications: selectedCertifications,
        notes,
        status: asDraft ? "draft" : "sent",
      });

      // Upload attachments one by one to better handle errors
      if (attachments.length > 0) {
        const urls: string[] = [];
        for (const file of attachments) {
          try {
            console.log("Uploading file:", file.name, "Size:", file.size);
            const url = await uploadRfqAttachment(user.uid, rfqId, file);
            urls.push(url);
          } catch (uploadError: any) {
            console.error("Failed to upload file:", file.name, uploadError);
            toast({
              title: "Upload Error",
              description: `Failed to upload ${file.name}: ${uploadError.message}`,
              variant: "destructive",
            });
            // Continue with other files
          }
        }
        if (urls.length > 0) {
          await addAttachmentsToRfq(rfqId, urls);
        }
      }

      toast({
        title: asDraft ? "Draft Saved" : "RFQ Sent",
        description: asDraft
          ? "Your RFQ has been saved as a draft"
          : "Your RFQ has been sent to the manufacturer",
      });

      navigate("/brand/rfqs");
    } catch (error: any) {
      console.error("Error creating RFQ:", error);
      toast({
        title: "Error",
        description: "Failed to create RFQ. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="-ml-2 mb-4">
            <Link to="/brand/rfqs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to RFQs
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Create RFQ</h1>
          <p className="mt-1 text-muted-foreground">
            Submit a request for quotation to a manufacturer
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:inline ${
                    currentStep >= step.id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-xl border shadow-sm p-6">
          {/* Step 1: Select Manufacturer */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Select Manufacturer
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose which manufacturer you want to send this RFQ to
                </p>
              </div>

              {loadingMfgs ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid gap-3">
                  {manufacturers.map((mfg) => (
                    <div
                      key={mfg.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedManufacturer === mfg.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedManufacturer(mfg.id)}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-manufacturer/10">
                        <Factory className="h-6 w-6 text-manufacturer" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {mfg.companyName}
                        </p>
                        {mfg.location && (
                          <p className="text-sm text-muted-foreground">
                            {mfg.location}
                          </p>
                        )}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          selectedManufacturer === mfg.id
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedManufacturer === mfg.id && (
                          <Check className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                  ))}

                  {manufacturers.length === 0 && (
                    <div className="text-center py-8">
                      <Factory className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">
                        No manufacturers available
                      </p>
                      <Button asChild variant="link" className="mt-2">
                        <Link to="/brand/manufacturers">
                          Browse Manufacturers
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Product Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Product Details
                </h2>
                <p className="text-sm text-muted-foreground">
                  Describe what you're looking for
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">RFQ Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Organic Facial Serum Development"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Product Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 5,000 units"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Target Budget</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., $50,000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product requirements in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Requirements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Requirements
                </h2>
                <p className="text-sm text-muted-foreground">
                  Specify certifications and additional notes
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Required Certifications</Label>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {CERTIFICATIONS.map((cert) => (
                      <div key={cert} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cert-${cert}`}
                          checked={selectedCertifications.includes(cert)}
                          onCheckedChange={() => toggleCertification(cert)}
                        />
                        <label
                          htmlFor={`cert-${cert}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {cert}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any other requirements or information..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Attachments</Label>
                  <div className="mt-2">
                    <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Click to upload files (PDF, images)
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Send */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Review & Send
                </h2>
                <p className="text-sm text-muted-foreground">
                  Review your RFQ before sending
                </p>
              </div>

              <div className="space-y-4">
                {/* Manufacturer */}
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-manufacturer/10">
                    <Factory className="h-6 w-6 text-manufacturer" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Sending to
                    </p>
                    <p className="font-medium text-foreground">
                      {selectedMfg?.companyName}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Title</span>
                    <span className="font-medium">{title}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  {budget && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Budget</span>
                      <span className="font-medium">{budget}</span>
                    </div>
                  )}
                  {deadline && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Deadline</span>
                      <span className="font-medium">{deadline}</span>
                    </div>
                  )}
                  {selectedCertifications.length > 0 && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Certifications</span>
                      <span className="font-medium">
                        {selectedCertifications.join(", ")}
                      </span>
                    </div>
                  )}
                  {attachments.length > 0 && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Attachments</span>
                      <span className="font-medium">
                        {attachments.length} file(s)
                      </span>
                    </div>
                  )}
                </div>

                {description && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Description
                    </p>
                    <p className="text-sm">{description}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={!canProceed()}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleSubmit(true)}
                  disabled={submitting}
                >
                  {submitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Draft
                </Button>
                <Button
                  onClick={() => handleSubmit(false)}
                  disabled={submitting}
                >
                  {submitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Send RFQ
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
