import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function DemoInfluencerFeedback() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Influencer Feedback Portal</h2>
          <Badge className="bg-primary/10 text-primary border-primary">Status: In Progress</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Product Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <Card className="overflow-hidden">
              <div className="aspect-[4/5] bg-muted flex items-center justify-center text-6xl">🧴</div>
              <CardContent className="p-8 space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Core Claims</h4>
                  <ul className="space-y-3">
                    {["24h Deep Hydration", "Blue Light Protection", "Non-Comedogenic Formula"].map((c) => (
                      <li key={c} className="flex items-center gap-3 text-sm">✅ {c}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Target Profile</h4>
                  <p className="text-sm text-muted-foreground italic">"Designed for the urban professional seeking a refreshing midday barrier boost without disrupting makeup artistry."</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Need help?</h4>
                <p className="text-xs opacity-70 mb-4">Our lab technicians are available for direct messaging about active ingredients.</p>
                <button className="text-[10px] font-bold uppercase tracking-widest border-b border-primary-foreground/30 pb-1">Contact Formulation Team</button>
              </CardContent>
            </Card>
          </aside>

          {/* Feedback Form */}
          <div className="lg:col-span-8 space-y-12">
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Step 1 of 3: Detailed Assessment</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h2 className="text-4xl font-bold mb-2">Share Your Experience</h2>
              <p className="text-muted-foreground text-sm">Your feedback directly influences the final formulation before market launch.</p>
            </div>

            {/* Section 1 */}
            <Card>
              <CardContent className="p-10">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold">Sensory Experience</h3>
                    <p className="text-sm text-muted-foreground">How did the product feel, smell, and interact with your skin?</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    { label: "Texture & Weight", rating: 4, hint: "Rate the mist's weight" },
                    { label: "Scent Profile", rating: 3, hint: "Does the natural botanical scent feel premium?" },
                    { label: "Absorption Speed", rating: 5, hint: "How quickly did the product settle?" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest block">{item.label}</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-xl ${s <= item.rating ? "text-amber-500" : "text-muted-foreground/30"}`}>★</span>
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground italic">{item.hint}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card>
              <CardContent className="p-10">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold">Efficacy & Results</h3>
                    <p className="text-sm text-muted-foreground">Document changes in your skin after 7 days of consistent use.</p>
                  </div>
                </div>
                <Textarea placeholder="Describe the hydration levels, any redness reduction, or interaction with your daily SPF/Makeup..." rows={5} className="bg-muted border-none" />
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card>
              <CardContent className="p-10">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold">Packaging & Unboxing</h3>
                    <p className="text-sm text-muted-foreground">Upload visuals of the unboxing experience and dispenser functionality.</p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-border rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-pointer">
                  <span className="text-4xl mb-4">☁️</span>
                  <h5 className="text-sm font-bold uppercase tracking-widest mb-1">Upload Photos or Videos</h5>
                  <p className="text-[11px] text-muted-foreground">Drag and drop or click to browse. (Max 50MB, MP4 or JPG)</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between pt-8">
              <button className="px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">Save Progress</button>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-background border rounded-full text-[11px] font-bold uppercase tracking-widest">Back</button>
                <button className="px-12 py-4 bg-primary text-primary-foreground rounded-full text-[11px] font-bold uppercase tracking-widest">Submit Final Feedback</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
