import { createFileRoute } from "@tanstack/react-router";
import { User, Bell, Globe, Palette, Save } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Lumen AI" },
      { name: "description", content: "Manage your profile, notifications, and preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PageHeader
        eyebrow="Settings"
        title="Preferences"
        description="Manage your profile, notifications, language, and appearance."
        actions={<Button onClick={() => toast.success("Settings saved")}><Save className="mr-2 h-4 w-4" /> Save changes</Button>}
      />

      <div className="space-y-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><User className="h-4 w-4 text-primary" /> Profile</CardTitle>
            <CardDescription>How you appear across Lumen</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="Alex Morgan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Product Manager" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue="Acme Co." />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Bell className="h-4 w-4 text-primary" /> Notifications</CardTitle>
            <CardDescription>Choose what reaches you and how</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "email", label: "Email notifications", desc: "Daily digest of activity and reminders", on: true },
              { key: "product", label: "Product updates", desc: "New features and improvements", on: true },
              { key: "tips", label: "AI tips & best practices", desc: "Weekly tips for using Lumen", on: false },
              { key: "marketing", label: "Marketing emails", desc: "Occasional offers and announcements", on: false },
            ].map((n) => (
              <div key={n.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="min-w-0">
                  <div className="text-sm font-medium">{n.label}</div>
                  <div className="text-xs text-muted-foreground">{n.desc}</div>
                </div>
                <Switch defaultChecked={n.on} />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Globe className="h-4 w-4 text-primary" /> Language</CardTitle>
              <CardDescription>Interface and AI responses</CardDescription>
            </CardHeader>
            <CardContent>
              <Select defaultValue="en">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Palette className="h-4 w-4 text-primary" /> Appearance</CardTitle>
              <CardDescription>Choose your theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`rounded-xl border p-3 text-left transition-all ${theme === "light" ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40"}`}
                >
                  <div className="mb-2 h-12 rounded-md bg-gradient-to-br from-white to-slate-100 ring-1 ring-slate-200" />
                  <div className="text-sm font-medium">Light</div>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`rounded-xl border p-3 text-left transition-all ${theme === "dark" ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40"}`}
                >
                  <div className="mb-2 h-12 rounded-md bg-gradient-to-br from-slate-800 to-slate-950 ring-1 ring-slate-700" />
                  <div className="text-sm font-medium">Dark</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
