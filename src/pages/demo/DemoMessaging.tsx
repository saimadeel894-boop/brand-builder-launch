import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";

export default function DemoMessaging() {
  const conversations = [
    { name: "Elena V.", project: "Glow Serum Collaboration", lastMsg: '"The texture is looking great!"', time: "2m ago", online: true, active: true },
    { name: "Marcus T.", project: "Velvet Lip Tint", lastMsg: "Ready for the next sample batch?", time: "1h ago" },
    { name: "Sophia R.", project: "Retinol Night Oil", lastMsg: "Shared the milestone document.", time: "3h ago" },
  ];

  const messages = [
    { from: "them", text: "Hi! I just received the new v2.1 formulation of the Glow Serum. The luminosity is incredible.", time: "10:42 AM" },
    { from: "me", text: "That's wonderful to hear, Elena! We increased the pearl concentrate by 0.5% as you suggested. Does the absorption feel different?", time: "10:45 AM" },
    { from: "them", text: "Yes, it sinks in much faster now. It doesn't leave that sticky residue we had in v1.9. I'm ready to film the sensory test tomorrow.", time: "10:48 AM" },
  ];

  return (
    <DashboardLayout>
      <div className="flex gap-0 -m-4 sm:-m-6 lg:-m-8 h-[calc(100vh-64px)]">
        {/* Conversations List */}
        <aside className="w-80 lg:w-96 border-r border-border bg-card flex flex-col shrink-0">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Conversations</h2>
            <input className="w-full bg-muted border-none rounded-xl py-2 px-4 text-sm" placeholder="Search influencers..." />
          </div>
          <div className="flex-1 overflow-y-auto px-3 space-y-1">
            {conversations.map(c => (
              <div key={c.name} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-colors ${c.active ? 'bg-muted/50 border border-muted' : 'hover:bg-muted/30'}`}>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-bold">{c.name.charAt(0)}</div>
                  {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm truncate">{c.name}</h3>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-primary font-medium truncate uppercase tracking-tight">{c.project}</p>
                  <p className="text-xs text-muted-foreground truncate mt-1 italic">{c.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat */}
        <section className="flex-1 flex flex-col bg-muted/20">
          <div className="h-20 px-8 flex items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-bold">E</div>
              <div>
                <h3 className="font-bold text-sm">Elena V.</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Active Collaboration: Glow Serum</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground">📹</button>
              <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground">ℹ️</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col gap-2 max-w-[80%] ${m.from === 'me' ? 'items-end ml-auto' : 'items-start'}`}>
                <div className={`p-4 text-sm shadow-sm ${
                  m.from === 'me'
                    ? 'bg-primary text-primary-foreground rounded-[1.25rem] rounded-br-[0.25rem]'
                    : 'bg-card border border-border rounded-[1.25rem] rounded-bl-[0.25rem]'
                }`}>
                  {m.text}
                </div>
                <span className="text-[10px] text-muted-foreground mx-2">{m.time}</span>
              </div>
            ))}
            <div className="flex justify-center py-4">
              <div className="bg-muted px-4 py-1.5 rounded-full border border-border flex items-center gap-2">
                <span className="text-primary text-xs">✨</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Phase 2: Sensory Testing Locked</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-card border-t border-border">
            <div className="flex gap-4 mb-4">
              {["📎 Share File", "📹 Request Video Call", "🔗 Link to Workspace"].map(a => (
                <button key={a} className="px-4 py-2 bg-muted hover:bg-accent rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">{a}</button>
              ))}
            </div>
            <div className="relative flex items-end gap-4">
              <textarea className="w-full bg-muted border-none rounded-2xl py-4 px-6 text-sm resize-none" placeholder="Type your message..." rows={1} />
              <button className="absolute right-2 bottom-2 w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-lg">➤</button>
            </div>
          </div>
        </section>

        {/* Right Panel */}
        <aside className="w-80 lg:w-96 border-l border-border bg-card overflow-y-auto p-8 hidden xl:block">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Collaboration Context</h4>
          <div className="mb-8 p-4 rounded-3xl bg-muted/30 border border-border">
            <div className="aspect-square bg-card rounded-2xl mb-4 flex items-center justify-center text-6xl border border-border">🧴</div>
            <h3 className="text-xl font-bold">Glow Serum</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Version 2.4 (Beta)</p>
          </div>
          <div className="mb-8">
            <h5 className="text-[10px] font-bold uppercase tracking-widest mb-4 flex justify-between">Production Stage <span className="text-primary">65% Complete</span></h5>
            <div className="h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-[65%]" /></div>
            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-primary font-medium">✅ Initial Formula Approval</div>
              <div className="flex items-center gap-3 text-primary font-medium">✅ Stability Testing</div>
              <div className="flex items-center gap-3">⏳ Sensory Feedback (Current)</div>
              <div className="flex items-center gap-3 text-muted-foreground">○ Final Compliance</div>
            </div>
          </div>
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest mb-4">Upcoming Milestones</h5>
            <div className="space-y-4">
              {[{ date: "Due Oct 24", title: "Unboxing Content Review" }, { date: "Due Oct 28", title: "7-Day Efficacy Survey" }].map(m => (
                <Card key={m.title} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-[10px] text-muted-foreground uppercase mb-1">{m.date}</p>
                  <p className="text-xs font-bold">{m.title}</p>
                </Card>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
