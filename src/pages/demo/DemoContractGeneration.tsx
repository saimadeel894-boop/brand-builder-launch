import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";

export default function DemoContractGeneration() {
  const activities = [
    { time: "Just now", text: 'You updated Clause 3: Payment Terms.', detail: '"Increased total fee to $50,000 USD."' },
    { time: "2 hours ago", text: "Robert Chen signed the agreement." },
    { time: "Yesterday", text: "Sarah Jenkins viewed the document." },
    { time: "Oct 22", text: "AI generated initial contract draft." },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold">Influencer Marketing Agreement - Summer Campaign</h1>
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-medium border border-primary/20">v3.2 Draft</span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">Reference ID: #CTR-2024-892 • Last auto-saved at 14:30</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-accent">📄 Export PDF</button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-accent">🔗 Share</button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-medium text-muted-foreground px-1">
            <span>Drafting</span><span>Review</span><span className="text-primary font-bold">Negotiation</span><span>Pending Signature</span><span>Signed</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden flex">
            <div className="h-full bg-green-500 w-1/5 border-r border-white/20" />
            <div className="h-full bg-green-500 w-1/5 border-r border-white/20" />
            <div className="h-full bg-primary w-1/5 relative overflow-hidden"><div className="absolute inset-0 bg-white/20 animate-pulse" /></div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Document */}
          <div className="flex-1 min-w-0">
            <div className="bg-card rounded-sm shadow-sm border border-border min-h-[800px] flex flex-col">
              <div className="p-10 pb-4 border-b border-border">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center font-bold text-xl rounded">BC</div>
                  <div className="text-right text-xs text-muted-foreground font-mono">DOC-REF: 8829-XJ<br />PAGE 1 OF 4</div>
                </div>
                <h2 className="text-3xl font-bold text-center mb-2 uppercase tracking-wide">Influencer Marketing Agreement</h2>
                <p className="text-center text-muted-foreground italic text-sm">This Agreement is made on this 24th day of October, 2023</p>
              </div>

              <div className="p-10 pt-8 text-[15px] leading-[1.8] text-justify space-y-6">
                <div className="bg-blue-50/50 p-4 rounded border-l-4 border-primary/40 -ml-4">
                  <p className="font-bold text-sm text-primary mb-1 uppercase tracking-wider">1. Parties Involved</p>
                  <p><strong>BETWEEN:</strong> <span className="bg-yellow-100 px-1 rounded">Glow Cosmetics Ltd.</span> (hereinafter referred to as the "Brand")</p>
                  <p><strong>AND:</strong> <span className="bg-yellow-100 px-1 rounded">Sarah Jenkins</span> (hereinafter referred to as the "Influencer")</p>
                  <p><strong>AND:</strong> <span className="bg-yellow-100 px-1 rounded">Pure Labs Manufacturing</span> (hereinafter referred to as the "Manufacturer")</p>
                </div>

                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">2. Scope of Services</p>
                  <p>The Influencer agrees to provide promotional services for the Brand's new product line, "Summer Glow Serum". Services include:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Three (3) Instagram Reels showcasing the product application.</li>
                    <li>One (1) Dedicated YouTube video (10-15 minutes).</li>
                    <li>Five (5) Instagram Stories with direct-to-consumer links.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">3. Compensation & Payment Terms</p>
                  <p>The Brand agrees to pay the Influencer a total fee of <span className="bg-red-100 text-red-800 px-1 rounded line-through">$45,000 USD</span> <span className="bg-green-100 text-green-800 px-1 rounded font-semibold">$50,000 USD</span>.</p>
                  <p className="mt-2">Payment: 30% upon signing, 30% upon content approval, 40% upon campaign completion. Net 30 days.</p>
                </div>

                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">4. Intellectual Property Rights</p>
                  <p>The Influencer grants the Brand a worldwide, irrevocable, royalty-free license to use the content for a period of <span className="border-b-2 border-dotted border-muted-foreground/30 text-muted-foreground italic">[Enter Duration]</span> months.</p>
                </div>

                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">5. Confidentiality</p>
                  <p>Both parties agree to keep all terms of this Agreement confidential, except as required by law.</p>
                </div>

                {/* Signature Block */}
                <div className="grid grid-cols-2 gap-12 mt-8 pt-8 border-t border-border">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-8">Signed on behalf of Brand</p>
                    <div className="h-12 border-b border-muted-foreground/30 flex items-end pb-2 text-2xl italic opacity-50">Pending...</div>
                    <p className="text-sm font-bold mt-2">Glow Cosmetics Ltd.</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-8">Signed by Influencer</p>
                    <div className="h-12 border-b border-muted-foreground/30" />
                    <p className="text-sm font-bold mt-2">Sarah Jenkins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 shrink-0 hidden xl:flex flex-col gap-6">
            <Card className="p-6">
              <h3 className="text-sm font-semibold mb-4">Actions</h3>
              <div className="flex flex-col gap-3">
                <button className="w-full bg-primary text-primary-foreground font-medium py-3 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2">✍️ Sign Contract</button>
                <button className="w-full bg-card border border-border font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-accent">📝 Request Changes</button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Parties Involved</h3>
                <button className="text-primary text-xs font-medium hover:underline">Manage</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Jane Doe (You)", role: "Brand Rep", status: "Signed", color: "text-green-600 bg-green-50" },
                  { name: "Sarah Jenkins", role: "Influencer", status: "Pending", color: "text-yellow-600 bg-yellow-50" },
                  { name: "Robert Chen", role: "Manufacturer", status: "Signed", color: "text-green-600 bg-green-50" },
                ].map(p => (
                  <div key={p.name} className={`flex items-center justify-between ${p.status === 'Pending' ? 'opacity-60' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-bold text-sm">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.role}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${p.color}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 flex-1 overflow-y-auto">
              <h3 className="text-sm font-semibold mb-4">Activity Feed</h3>
              <div className="relative pl-4 border-l border-border space-y-6">
                {activities.map((a, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-background bg-primary" />
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                    <p className="text-sm mt-1">{a.text}</p>
                    {a.detail && <div className="p-2 bg-muted rounded text-xs text-muted-foreground italic mt-1">{a.detail}</div>}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
