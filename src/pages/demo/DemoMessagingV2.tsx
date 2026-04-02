import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function DemoMessagingV2() {
  const conversations = [
    { name: "Organic Serum Launch", sub: "Step 2: Formulation", preview: "You: Attached the revised...", active: true, isProject: true },
    { name: "Matte Lipstick Line", sub: "Packaging Review", preview: "Supplier B: Color samples sent.", isProject: true },
    { name: "Jane Doe", role: "INFLUENCER", preview: "Re: Campaign moodboard...", online: true },
    { name: "Michael Chen", role: "SUPPLIER", preview: "I'll check the inventory and..." },
  ];

  const messages = [
    { sender: "Supplier A", role: "MANUFACTURER", roleColor: "bg-blue-100 text-blue-700", time: "10:24 AM", text: "Here are the revised lab samples for the organic serum base. We've adjusted the viscosity as requested in the last meeting to match the reference.", attachment: { name: "Formula_v3_Final.pdf", size: "2.4 MB", type: "PDF Document" } },
    { sender: "You", role: "BRAND", roleColor: "bg-amber-100 text-amber-700", time: "10:30 AM", text: "Looks good! I'll share this with the marketing team. Can we schedule a call to discuss the packaging next?", isSelf: true },
    { sender: "Jane Doe", role: "INFLUENCER", roleColor: "bg-purple-100 text-purple-700", time: "10:35 AM", text: 'The texture looks amazing in the photos! I\'m thinking about a "behind the scenes" reel for the launch. Something raw and authentic.' },
  ];

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] gap-0 -m-8 overflow-hidden">
        {/* Conversation List */}
        <div className="w-80 lg:w-96 bg-background border-r flex flex-col shrink-0">
          <div className="h-16 flex items-center justify-between px-5 border-b">
            <h2 className="text-lg font-bold">Inbox</h2>
            <div className="flex gap-2">
              <button className="text-muted-foreground hover:text-primary">🔍</button>
              <button className="text-muted-foreground hover:text-primary">✏️</button>
            </div>
          </div>
          <div className="px-5 py-4">
            <Input placeholder="Search projects or people..." />
          </div>
          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
            <p className="px-2 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider flex justify-between">
              <span>Active Projects</span>
              <span className="bg-muted px-1.5 py-0.5 rounded text-[10px]">3</span>
            </p>
            {conversations.filter(c => c.isProject).map((c) => (
              <div key={c.name} className={`p-3 rounded-xl cursor-pointer ${c.active ? "bg-card border border-primary/30 shadow-sm" : "hover:bg-card"}`}>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-muted flex-shrink-0 flex items-center justify-center text-xl">🧴</div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold truncate">{c.name}</h3>
                    <p className="text-xs text-primary font-medium">{c.sub}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.preview}</p>
                  </div>
                </div>
              </div>
            ))}
            <p className="px-2 pt-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Direct Messages</p>
            {conversations.filter(c => !c.isProject).map((c) => (
              <div key={c.name} className="p-3 rounded-xl hover:bg-card cursor-pointer">
                <div className="flex gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">👤</div>
                    {c.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold truncate">{c.name}</h3>
                      {c.role && <Badge className={`text-[10px] ${c.role === "INFLUENCER" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{c.role}</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 px-6 border-b flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <h2 className="text-lg font-bold truncate">Project: Organic Serum Launch</h2>
              </div>
              <p className="text-xs text-muted-foreground">Secure Thread • Last updated 2m ago</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">SA</div>
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">JD</div>
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-bold">+2</div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-muted/30">
            <div className="flex justify-center">
              <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full uppercase tracking-wide">Today</span>
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 max-w-2xl ${m.isSelf ? "flex-row-reverse ml-auto" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm flex-shrink-0">👤</div>
                <div className={m.isSelf ? "flex flex-col items-end" : ""}>
                  <div className="flex items-center gap-2 mb-1.5">
                    {m.isSelf && <span className="text-xs text-muted-foreground">{m.time}</span>}
                    <span className="font-bold text-sm">{m.sender}</span>
                    <Badge className={`text-[10px] ${m.roleColor}`}>{m.role}</Badge>
                    {!m.isSelf && <span className="text-xs text-muted-foreground">{m.time}</span>}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm ${m.isSelf ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card border rounded-tl-none"}`}>
                    <p className="text-sm leading-relaxed">{m.text}</p>
                  </div>
                  {m.attachment && (
                    <div className="mt-2 flex items-center gap-3 p-3 bg-card border rounded-xl w-72 cursor-pointer hover:shadow-md">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">📄</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{m.attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{m.attachment.size} • {m.attachment.type}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <button className="text-muted-foreground">📎</button>
              <Input placeholder="Type a message..." className="flex-1" />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold">Send</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
