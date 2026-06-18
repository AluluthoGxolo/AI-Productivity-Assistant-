import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Sparkles, Copy, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Lumen AI" },
      { name: "description", content: "Draft polished emails in seconds." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!purpose.trim()) {
      toast.error("Please describe the purpose of your email.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const greeting = recipient ? `Hi ${recipient.split(/[\s@]/)[0]},` : "Hi there,";
      const draft = `${greeting}

I hope this message finds you well. I'm reaching out regarding ${purpose.trim()}.

Based on our recent conversations and priorities, I wanted to share a few thoughts and propose a clear next step so we can keep momentum. Please let me know if the approach below works on your end, or if you'd prefer to discuss live.

Looking forward to your thoughts — happy to adjust based on your input.

Best regards,
Alex`;
      setOutput(
        tone === "casual"
          ? draft.replace("I hope this message finds you well.", "Hope you're doing great!").replace("Best regards,", "Cheers,")
          : tone === "friendly"
          ? draft.replace("Best regards,", "Warmly,")
          : draft,
      );
      setLoading(false);
      toast.success("Draft generated");
    }, 700);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        eyebrow="Smart Email"
        title="Generate a polished email"
        description="Tell Lumen who you're writing to and the purpose — get a ready-to-send draft."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Mail className="h-4 w-4 text-primary" /> Email details</CardTitle>
            <CardDescription>Fill in the fields below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Jane Smith — Head of Marketing" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Quick follow up on the Q4 campaign" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={5} placeholder="Follow up on last week's meeting and propose a date to review the campaign brief." />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generate} disabled={loading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" /> {loading ? "Generating…" : "Generate email"}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
            <div>
              <CardTitle className="text-base">Draft</CardTitle>
              <CardDescription>Edit before sending</CardDescription>
            </div>
            {output && (
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={copy}><Copy className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={generate}><RotateCw className="h-4 w-4" /></Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {output ? (
              <>
                {subject && <div className="mb-3 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm"><span className="text-muted-foreground">Subject: </span><span className="font-medium">{subject}</span></div>}
                <Textarea value={output} onChange={(e) => setOutput(e.target.value)} rows={16} className="font-mono text-sm leading-relaxed" />
              </>
            ) : (
              <div className="grid place-items-center rounded-xl border border-dashed border-border py-16 text-center">
                <Sparkles className="mb-3 h-8 w-8 text-muted-foreground/60" />
                <div className="text-sm font-medium">Your draft appears here</div>
                <div className="mt-1 text-xs text-muted-foreground">Fill the form and click Generate</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
