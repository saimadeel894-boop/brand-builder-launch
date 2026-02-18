import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { collection, getDocs, doc, setDoc, getDoc, updateDoc, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import jsPDF from "jspdf";
import {
  FileText, Download, Share2, Pen, MessageSquare, Plus, FolderOpen, Handshake, Archive,
  Loader2, CheckCircle, Clock, Send, Sparkles,
} from "lucide-react";

interface Contract {
  id: string;
  title: string;
  status: "draft" | "sent" | "signed";
  partyA: string;
  partyAName: string;
  partyB: string;
  partyBName: string;
  scope: string;
  deliverables: string;
  timeline: string;
  paymentTerms: string;
  generatedText: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function ContractGeneration() {
  const { user, profile } = useFirebaseAuth();
  const { toast } = useToast();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [activeContract, setActiveContract] = useState<Contract | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<{ id: string; name: string; role: string }[]>([]);

  // Form state
  const [form, setForm] = useState({
    title: "",
    partyB: "",
    scope: "",
    deliverables: "",
    timeline: "",
    paymentTerms: "",
  });

  useEffect(() => {
    if (user) loadContracts();
  }, [user]);

  const loadContracts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const snap = await getDocs(
        query(collection(db, "contracts"), where("partyA", "==", user.uid))
      );
      const snap2 = await getDocs(
        query(collection(db, "contracts"), where("partyB", "==", user.uid))
      );
      const all = new Map<string, Contract>();
      [...snap.docs, ...snap2.docs].forEach(d => {
        const data = d.data();
        all.set(d.id, {
          id: d.id,
          title: data.title,
          status: data.status,
          partyA: data.partyA,
          partyAName: data.partyAName,
          partyB: data.partyB,
          partyBName: data.partyBName,
          scope: data.scope,
          deliverables: data.deliverables,
          timeline: data.timeline,
          paymentTerms: data.paymentTerms,
          generatedText: data.generatedText || "",
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        });
      });
      const list = Array.from(all.values()).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      setContracts(list);
      if (list.length > 0 && !activeContract) setActiveContract(list[0]);
    } catch (err) {
      console.error("Error loading contracts:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    if (!user) return;
    const users: { id: string; name: string; role: string }[] = [];
    const mfgSnap = await getDocs(collection(db, "manufacturerProfiles"));
    mfgSnap.forEach(d => { if (d.id !== user.uid) users.push({ id: d.id, name: d.data().companyName, role: "Manufacturer" }); });
    const brandSnap = await getDocs(collection(db, "brandProfiles"));
    brandSnap.forEach(d => { if (d.id !== user.uid) users.push({ id: d.id, name: d.data().brandName, role: "Brand" }); });
    const infSnap = await getDocs(collection(db, "influencerProfiles"));
    infSnap.forEach(d => { if (d.id !== user.uid) users.push({ id: d.id, name: d.data().name, role: "Influencer" }); });
    setAvailableUsers(users);
  };

  const generateContract = async () => {
    if (!form.title || !form.partyB || !user) return;
    setGenerating(true);

    const target = availableUsers.find(u => u.id === form.partyB);
    const myName = profile?.email?.split("@")[0] || "Party A";

    try {
      // Try AI enhancement
      let generatedText = "";
      try {
        const { data, error } = await supabase.functions.invoke("ai-match", {
          body: {
            type: "contract",
            candidates: `Generate a professional contract with the following details:
Title: ${form.title}
Party A: ${myName}
Party B: ${target?.name || "Party B"}
Scope: ${form.scope}
Deliverables: ${form.deliverables}
Timeline: ${form.timeline}
Payment Terms: ${form.paymentTerms}

Generate formal legal contract text with sections: 1. Parties, 2. Scope of Services, 3. Deliverables, 4. Timeline, 5. Compensation, 6. Terms and Conditions, 7. Signatures. Use professional language.`,
          },
        });
        if (!error && data?.result) generatedText = data.result;
      } catch {
        // Fallback template
        generatedText = `CONTRACT AGREEMENT\n\nTitle: ${form.title}\n\n1. PARTIES\nThis Agreement is entered into between ${myName} ("Party A") and ${target?.name || "Party B"} ("Party B").\n\n2. SCOPE OF SERVICES\n${form.scope}\n\n3. DELIVERABLES\n${form.deliverables}\n\n4. TIMELINE\n${form.timeline}\n\n5. COMPENSATION\n${form.paymentTerms}\n\n6. TERMS AND CONDITIONS\nBoth parties agree to perform their respective obligations in good faith.\n\n7. SIGNATURES\n\n_______________          _______________\n${myName}               ${target?.name || "Party B"}`;
      }

      const docRef = doc(collection(db, "contracts"));
      await setDoc(docRef, {
        title: form.title,
        status: "draft",
        partyA: user.uid,
        partyAName: myName,
        partyB: form.partyB,
        partyBName: target?.name || "Party B",
        scope: form.scope,
        deliverables: form.deliverables,
        timeline: form.timeline,
        paymentTerms: form.paymentTerms,
        generatedText,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({ title: "Contract Created", description: "AI-enhanced contract has been generated." });
      setShowNew(false);
      setForm({ title: "", partyB: "", scope: "", deliverables: "", timeline: "", paymentTerms: "" });
      await loadContracts();
    } catch (err) {
      toast({ title: "Error", description: "Failed to generate contract", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const updateStatus = async (contract: Contract, newStatus: "sent" | "signed") => {
    if (contract.status === "signed") {
      toast({ title: "Locked", description: "Signed contracts cannot be modified.", variant: "destructive" });
      return;
    }
    try {
      await updateDoc(doc(db, "contracts", contract.id), { status: newStatus, updatedAt: serverTimestamp() });
      toast({ title: "Updated", description: `Contract marked as ${newStatus}.` });
      await loadContracts();
      if (activeContract?.id === contract.id) {
        setActiveContract({ ...contract, status: newStatus });
      }
    } catch {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const downloadPdf = (contract: Contract) => {
    const pdf = new jsPDF();
    const margin = 20;
    const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;

    pdf.setFontSize(18);
    pdf.text(contract.title, margin, 30);

    pdf.setFontSize(10);
    pdf.text(`Status: ${contract.status.toUpperCase()}`, margin, 40);
    pdf.text(`Generated: ${contract.createdAt?.toLocaleDateString() || "N/A"}`, margin, 46);

    pdf.setFontSize(11);
    const lines = pdf.splitTextToSize(contract.generatedText, pageWidth);
    let y = 58;
    for (const line of lines) {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(line, margin, y);
      y += 6;
    }

    pdf.save(`${contract.title.replace(/\s+/g, "_")}.pdf`);
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "signed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "sent": return <Send className="h-4 w-4 text-primary" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Contract Generation</h1>
            <p className="text-sm text-muted-foreground mt-1">Create, manage, and sign AI-enhanced contracts</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => { setShowNew(true); loadUsers(); }} className="gap-2">
              <Plus className="h-4 w-4" /> New Contract
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Contract List */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardContent className="p-3 space-y-1">
                {contracts.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No contracts yet</p>
                )}
                {contracts.map(c => (
                  <div
                    key={c.id}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeContract?.id === c.id ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                    onClick={() => setActiveContract(c)}
                  >
                    {statusIcon(c.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.partyBName}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] capitalize">{c.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contract Preview */}
          {activeContract ? (
            <>
              <Card className="lg:col-span-5">
                <CardContent className="p-8 bg-secondary/30 min-h-[600px]">
                  <div className="bg-background shadow-sm rounded p-8 space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-10 w-10 bg-foreground text-background flex items-center justify-center font-bold text-lg rounded">BC</div>
                      <Badge className="capitalize">{activeContract.status}</Badge>
                    </div>
                    <h2 className="text-xl font-bold text-center">{activeContract.title}</h2>
                    <div className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed mt-4">
                      {activeContract.generatedText || "No content generated."}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-4 space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-sm font-semibold mb-2">Actions</h3>
                    <Button className="w-full gap-2" onClick={() => downloadPdf(activeContract)}>
                      <Download className="h-4 w-4" /> Download PDF
                    </Button>
                    {activeContract.status === "draft" && (
                      <Button variant="outline" className="w-full gap-2" onClick={() => updateStatus(activeContract, "sent")}>
                        <Send className="h-4 w-4" /> Send to Party
                      </Button>
                    )}
                    {activeContract.status === "sent" && (
                      <Button className="w-full gap-2" onClick={() => updateStatus(activeContract, "signed")}>
                        <Pen className="h-4 w-4" /> Sign Contract
                      </Button>
                    )}
                    {activeContract.status === "signed" && (
                      <p className="text-sm text-green-600 text-center flex items-center justify-center gap-2">
                        <CheckCircle className="h-4 w-4" /> Contract is signed and locked
                      </p>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Parties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
                        {activeContract.partyAName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activeContract.partyAName}</p>
                        <p className="text-xs text-muted-foreground">Party A (Creator)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
                        {activeContract.partyBName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activeContract.partyBName}</p>
                        <p className="text-xs text-muted-foreground">Party B</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="lg:col-span-9 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="font-medium">Select a contract or create a new one</p>
              </div>
            </div>
          )}
        </div>

        {/* New Contract Dialog */}
        <Dialog open={showNew} onOpenChange={setShowNew}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Generate New Contract</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input placeholder="Contract Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <Select value={form.partyB} onValueChange={v => setForm({ ...form, partyB: v })}>
                <SelectTrigger><SelectValue placeholder="Select other party" /></SelectTrigger>
                <SelectContent>
                  {availableUsers.map(u => (
                    <SelectItem key={u.id} value={u.id}>{u.name} ({u.role})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea placeholder="Scope of work" value={form.scope} onChange={e => setForm({ ...form, scope: e.target.value })} />
              <Textarea placeholder="Deliverables" value={form.deliverables} onChange={e => setForm({ ...form, deliverables: e.target.value })} />
              <Input placeholder="Timeline (e.g., 3 months)" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} />
              <Input placeholder="Payment terms (e.g., $5,000 on completion)" value={form.paymentTerms} onChange={e => setForm({ ...form, paymentTerms: e.target.value })} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
              <Button onClick={generateContract} disabled={generating || !form.title || !form.partyB}>
                {generating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                {generating ? "Generating..." : "Generate with AI"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
