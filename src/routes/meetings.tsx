import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Sparkles, CheckCircle2, Calendar, Gavel } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Lumen AI" },
      { name: "description", content: "Turn raw notes into clear summaries." },
    ],
  }),
  component: MeetingsPage,
});

interface Summary {
  summary: string;
  actions: { task: string; owner: string }[];
  decisions: string[];
  deadlines: { item: string; date: string }[];
}

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);

  const summarize = () => {
    if (!notes.trim()) {
      toast.error("Paste your meeting notes first.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResult({
        summary:
          "The team reviewed Q3 progress and aligned on Q4 priorities. Marketing presented the upcoming campaign roadmap, Engineering shared platform stability metrics, and Sales outlined renewal risks. The group agreed to consolidate efforts around three top accounts and ship two flagship features before the end of November.",
        actions: [
          { task: "Draft Q4 campaign brief and circulate for review", owner: "Jane (Marketing)" },
          { task: "Prepare account health report for top 10 customers", owner: "Marco (Sales)" },
          { task: "Spec out the new analytics dashboard", owner: "Priya (Engineering)" },
          { task: "Book a workshop with design for the onboarding flow", owner: "Alex" },
        ],
        decisions: [
          "Focus Q4 on enterprise expansion in EMEA.",
          "Pause the legacy mobile app investment.",
          "Adopt the new design system across all surfaces by Dec 15.",
        ],
        deadlines: [
          { item: "Q4 campaign brief", date: "Oct 24" },
          { item: "Analytics dashboard MVP", date: "Nov 14" },
          { item: "Design system rollout", date: "Dec 15" },
        ],
      });
      setLoading(false);
      toast.success("Meeting summarized");
    }, 800);
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        eyebrow="Meeting Notes"
        title="Summarize a meeting"
        description="Paste raw notes or a transcript — Lumen extracts summary, actions, decisions, and deadlines."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><FileText className="h-4 w-4 text-primary" /> Raw notes</CardTitle>
            <CardDescription>Paste your transcript or bullet notes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea rows={18} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste meeting notes here…" />
            <Button onClick={summarize} disabled={loading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" /> {loading ? "Summarizing…" : "Summarize"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-3">
          {result ? (
            <>
              <Card className="shadow-card">
                <CardHeader><CardTitle className="text-base">Summary</CardTitle></CardHeader>
                <CardContent>
                  <Textarea
                    rows={5}
                    value={result.summary}
                    onChange={(e) => setResult({ ...result, summary: e.target.value })}
                    className="text-sm leading-relaxed"
                  />
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="shadow-card">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><CheckCircle2 className="h-4 w-4 text-success" /> Action items</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {result.actions.map((a, i) => (
                      <div key={i} className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                        <div className="font-medium">{a.task}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{a.owner}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Gavel className="h-4 w-4 text-primary" /> Decisions</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {result.decisions.map((d, i) => (
                      <div key={i} className="rounded-lg border border-border bg-muted/30 p-3 text-sm">{d}</div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <Card className="shadow-card">
                <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Calendar className="h-4 w-4 text-accent-foreground" /> Deadlines</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {result.deadlines.map((d, i) => (
                    <div key={i} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border bg-muted/30 p-3 text-sm">
                      <div className="min-w-0 truncate">{d.item}</div>
                      <div className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">{d.date}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-card">
              <CardContent className="grid place-items-center py-20 text-center">
                <Sparkles className="mb-3 h-8 w-8 text-muted-foreground/60" />
                <div className="text-sm font-medium">Summary appears here</div>
                <div className="mt-1 text-xs text-muted-foreground">Paste notes and click Summarize</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
