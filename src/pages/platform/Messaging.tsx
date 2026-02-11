import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Send, Paperclip, Phone, Video, MoreVertical, Circle } from "lucide-react";

const conversations = [
  { id: 1, name: "LuxeFormula Labs", role: "Manufacturer", lastMessage: "We can start production next week", time: "2m ago", unread: 2, online: true },
  { id: 2, name: "Glow Beauty Co", role: "Brand", lastMessage: "The samples look amazing!", time: "1h ago", unread: 0, online: true },
  { id: 3, name: "Sarah Chen", role: "Influencer", lastMessage: "I'd love to feature this product", time: "3h ago", unread: 1, online: false },
  { id: 4, name: "Pacific Cosmetics", role: "Manufacturer", lastMessage: "Quote attached for your review", time: "1d ago", unread: 0, online: false },
  { id: 5, name: "Bloom & Petal", role: "Brand", lastMessage: "Let's schedule a call", time: "2d ago", unread: 0, online: true },
];

const messages = [
  { id: 1, sender: "them", text: "Hi! I reviewed the product specifications you sent.", time: "10:30 AM" },
  { id: 2, sender: "them", text: "We can definitely handle the MOQ of 5,000 units. Our lead time would be approximately 4-6 weeks.", time: "10:31 AM" },
  { id: 3, sender: "me", text: "That sounds great! What about the organic certification?", time: "10:45 AM" },
  { id: 4, sender: "them", text: "Yes, we have ECOCERT and COSMOS certifications. All our facilities are GMP compliant.", time: "10:47 AM" },
  { id: 5, sender: "them", text: "We can start production next week if you approve the formulation samples.", time: "10:48 AM" },
];

export default function Messaging() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <Button className="gap-2">
            <MessageSquare className="h-4 w-4" />
            New Message
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="flex h-[calc(100vh-220px)] min-h-[500px]">
            {/* Conversation List */}
            <div className="w-80 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-9" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv, i) => (
                  <div key={conv.id} className={`flex items-center gap-3 p-4 hover:bg-secondary/50 cursor-pointer border-b border-border ${i === 0 ? "bg-accent/50" : ""}`}>
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        {conv.name.charAt(0)}
                      </div>
                      {conv.online && (
                        <Circle className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 fill-manufacturer text-manufacturer" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground text-sm truncate">{conv.name}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px]">{conv.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">L</div>
                  <div>
                    <p className="font-semibold text-foreground">LuxeFormula Labs</p>
                    <p className="text-xs text-manufacturer">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${msg.sender === "me" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button size="icon"><Send className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
