import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, Lightbulb, Target } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Lumen AI" },
      { name: "description", content: "Structured AI briefings on any topic." },
    ],
  }),
  component: ResearchPage,
});

interface Brief {
  overview: string;
  insights: string[];
  recommendations: string[];
}

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loading, setLoading] = useState(false);

  const research = () => {
    if (!topic.trim()) {
      toast.error("Enter a topic to research.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setBrief({
        overview: `"${topic.trim()}" is a fast-evolving area shaped by shifting customer expectations, new tooling, and tighter budgets. The strongest organizations treat it as a cross-functional capability rather than a single team's responsibility, building feedback loops between product, operations, and go-to-market.`,
        insights: [
          "Adoption is accelerating among mid-market companies, where lighter governance enables faster experimentation.",
          "The leaders in this space invest 2–3× more in enablement than in tooling itself.",
          "Most measurable ROI comes from removing repetitive work, not from replacing senior judgment.",
          "Privacy and data governance remain the top blocker for enterprise rollouts.",
        ],
        recommendations: [
          "Start with one high-volume workflow and measure baseline cycle time before any rollout.",
          "Pair every pilot with a named owner accountable for adoption metrics.",
          "Publish clear guidelines on what's appropriate to automate vs. keep human-led.",
          "Revisit the strategy quarterly — the underlying capabilities are changing rapidly.",
        ],
      });
      setLoading(false);
      toast.success("Briefing ready");
    }, 800);
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader
        eyebrow="Research Assistant"
        title="Get a structured briefing"
        description="Enter a topic and get an overview, key insights, and recommended next steps."
      />

      <Card className="mb-4 shadow-card">
        <CardContent className="p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <div className="space-y-1.5">
              <Label htmlFor="topic" className="text-xs">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. AI adoption in customer support teams"
                onKeyDown={(e) => e.key === "Enter" && research()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={research} disabled={loading} className="w-full sm:w-auto">
                <Sparkles className="mr-2 h-4 w-4" /> {loading ? "Researching…" : "Generate brief"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {brief ? (
        <div className="grid grid-cols-1 gap-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Search className="h-4 w-4 text-primary" /> Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90">{brief.overview}</p>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><Lightbulb className="h-4 w-4 text-accent-foreground" /> Key insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {brief.insights.map((i, idx) => (
                  <div key={idx} className="rounded-lg border border-border bg-muted/30 p-3 text-sm leading-relaxed">
                    {i}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><Target className="h-4 w-4 text-success" /> Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {brief.recommendations.map((r, idx) => (
                  <div key={idx} className="rounded-lg border border-border bg-muted/30 p-3 text-sm leading-relaxed">
                    {r}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="shadow-card">
          <CardContent className="grid place-items-center py-20 text-center">
            <Sparkles className="mb-3 h-8 w-8 text-muted-foreground/60" />
            <div className="text-sm font-medium">Your briefing appears here</div>
            <div className="mt-1 text-xs text-muted-foreground">Enter a topic above to begin</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
