import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — Lumen AI" },
      { name: "description", content: "Chat with your workplace AI assistant." },
    ],
  }),
  component: ChatPage,
});

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Summarize the latest project status into 3 bullets",
  "Help me write a polite decline to a meeting invite",
  "Suggest 5 icebreakers for a remote team kickoff",
  "What should I focus on this week?",
];

const placeholderReplies = [
  "Great question — here's how I'd approach it. First, clarify the desired outcome in one sentence. Then break the problem into 3 concrete steps and tackle the smallest one today. Want me to draft those steps for you?",
  "Here's a quick take: prioritize what moves the needle for your customer, batch the rest, and revisit weekly. I can help you structure this into a plan if you'd like.",
  "Sure — based on common patterns, I'd suggest focusing on clarity first, momentum second, and polish last. Want me to expand on any of those?",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: "Hi Alex 👋 I'm Lumen, your workplace AI assistant. Ask me anything — drafting, planning, summarizing, brainstorming. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const reply = placeholderReplies[Math.floor(Math.random() * placeholderReplies.length)];
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      setThinking(false);
    }, 700);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-7rem)] w-full max-w-4xl flex-col">
      <PageHeader
        eyebrow="Chatbot"
        title="Chat with Lumen"
        description="Suggested prompts below, or type your own question."
      />
      <Card className="flex flex-1 flex-col overflow-hidden shadow-card">
        <CardContent className="flex flex-1 flex-col gap-0 p-0">
          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-hero text-primary-foreground">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground"
                      : "max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm leading-relaxed"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-hero text-primary-foreground">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length <= 1 && (
            <div className="border-t border-border bg-muted/30 p-4 sm:p-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Try asking
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-xl border border-border bg-card px-3 py-2.5 text-left text-sm transition-colors hover:border-primary/40 hover:bg-primary-soft/50"
                  >
                    <MessageSquare className="mr-2 inline h-3.5 w-3.5 text-primary" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border p-3 sm:p-4">
            <div className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Lumen…"
                rows={1}
                className="min-h-[44px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
              />
              <Button onClick={() => send()} size="icon" className="h-11 w-11 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
