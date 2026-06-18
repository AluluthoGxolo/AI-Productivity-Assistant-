import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  Zap,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Lumen AI" },
      { name: "description", content: "Your AI workplace at a glance." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Tasks completed", value: "127", delta: "+18% this week", icon: CheckCircle2, tone: "text-success" },
  { label: "Hours saved", value: "42.5h", delta: "via AI tools", icon: Clock, tone: "text-primary" },
  { label: "AI actions", value: "1,284", delta: "+9% vs last week", icon: Zap, tone: "text-accent-foreground" },
  { label: "Productivity score", value: "92", delta: "Top 5% of teams", icon: TrendingUp, tone: "text-success" },
];

const quickActions = [
  { title: "Draft an Email", desc: "Reply, follow up, or pitch in seconds", to: "/email", icon: Mail },
  { title: "Summarize Meeting", desc: "Turn notes into decisions & actions", to: "/meetings", icon: FileText },
  { title: "Plan My Day", desc: "Prioritize tasks into a schedule", to: "/tasks", icon: ListChecks },
  { title: "Research Topic", desc: "Get a structured AI briefing", to: "/research", icon: Search },
  { title: "Ask the Assistant", desc: "Chat with Lumen for anything", to: "/chatbot", icon: MessageSquare },
];

const activity = [
  { title: "Drafted email to Marketing team", tool: "Smart Email", time: "12 min ago" },
  { title: "Summarized Q3 planning meeting", tool: "Meeting Notes", time: "1 hour ago" },
  { title: "Created schedule for tomorrow", tool: "Task Planner", time: "3 hours ago" },
  { title: "Researched competitor pricing", tool: "Research", time: "Yesterday" },
];

const tips = [
  "Ask Lumen for 3 versions of an email when you're unsure about tone.",
  "Paste raw meeting transcripts — the summarizer extracts decisions automatically.",
  "Review and edit AI output before sending. You're always the final author.",
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-hero p-6 text-primary-foreground shadow-elevated sm:p-10">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <Badge className="mb-4 border-white/20 bg-white/15 text-primary-foreground backdrop-blur">
            <Sparkles className="mr-1 h-3 w-3" /> Good morning, Alex
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let's make today your most productive yet.
          </h2>
          <p className="mt-3 text-base text-primary-foreground/85">
            You have 3 priority tasks and 2 meetings on the calendar. Start with a quick win.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/tasks">
                Plan my day <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-primary-foreground backdrop-blur hover:bg-white/20 hover:text-primary-foreground">
              <Link to="/chatbot">Ask Lumen</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-muted-foreground">{s.label}</div>
                <s.icon className={`h-4 w-4 ${s.tone}`} />
              </div>
              <div className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.delta}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mb-8">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Quick actions
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <a.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <div className="mt-4 text-base font-semibold">{a.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{a.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Your last AI-assisted actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {activity.map((a) => (
              <div
                key={a.title}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{a.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.tool}</div>
                  </div>
                </div>
                <div className="shrink-0 text-xs text-muted-foreground">{a.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent/30 text-accent-foreground">
                <Lightbulb className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base">Productivity tips</CardTitle>
                <CardDescription>Get more from Lumen</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {tips.map((t, i) => (
              <div key={i} className="rounded-xl border border-border bg-muted/30 p-3 text-sm leading-relaxed">
                {t}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
