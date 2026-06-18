import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Lock, AlertTriangle, Users, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI — Lumen AI" },
      { name: "description", content: "How we think about AI limitations, privacy, and responsible use." },
    ],
  }),
  component: ResponsibleAIPage,
});

const principles = [
  {
    icon: AlertTriangle,
    title: "AI has real limitations",
    body: "Lumen can produce inaccurate, outdated, or biased output. It does not 'know' things — it predicts plausible text. Always review AI output before sharing, sending, or acting on it, especially for decisions with legal, financial, medical, or interpersonal impact.",
  },
  {
    icon: Lock,
    title: "Your data, your control",
    body: "We never sell your data. Content you submit to Lumen is used to generate your response and to improve service quality with strict access controls. You can export or delete your data at any time from Settings.",
  },
  {
    icon: Users,
    title: "Humans stay in the loop",
    body: "Lumen is built to assist, not replace. Decisions about people — hiring, performance, customer outcomes — should always involve human judgment. Treat AI output as a starting point, not a verdict.",
  },
  {
    icon: Heart,
    title: "Use AI with care",
    body: "Avoid pasting confidential or regulated information unless your organization has explicitly approved it. Be transparent with colleagues and customers when AI was used to draft or generate content.",
  },
];

function ResponsibleAIPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <PageHeader
        eyebrow="Responsible AI"
        title="Building AI you can trust"
        description="Our commitments around limitations, privacy, and the responsible use of AI at work."
      />

      <Card className="mb-6 overflow-hidden shadow-card">
        <div className="bg-gradient-hero p-6 text-primary-foreground sm:p-8">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">Lumen is a tool, not an oracle</h2>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                AI can speed up your work dramatically — but it can also be confidently wrong.
                These principles guide how we build Lumen and how we recommend you use it.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {principles.map((p) => (
          <Card key={p.title} className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
                  <p.icon className="h-4 w-4" />
                </div>
                <CardTitle className="text-base">{p.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Your responsibilities as a user</CardTitle>
          <CardDescription>A short checklist before you act on AI output</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2.5 text-sm">
            {[
              "Read AI output carefully and verify facts that matter.",
              "Don't paste secrets, passwords, or regulated personal data.",
              "Disclose AI assistance when expected by your team or audience.",
              "Edit and own the final version — you are accountable for what you send.",
              "Report problematic output so we can improve the system.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
