import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Plus, Sparkles, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Lumen AI" },
      { name: "description", content: "Turn your tasks into a focused schedule." },
    ],
  }),
  component: TasksPage,
});

type Priority = "low" | "medium" | "high";
interface Task {
  id: string;
  title: string;
  priority: Priority;
  due: string;
}

const priorityTone: Record<Priority, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-accent/30 text-accent-foreground border-accent/40",
  low: "bg-success/15 text-success border-success/30",
};

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Review the Q4 campaign brief", priority: "high", due: "Today" },
    { id: "2", title: "Prep slides for Friday's all-hands", priority: "medium", due: "Thu" },
    { id: "3", title: "Reply to onboarding survey", priority: "low", due: "Fri" },
  ]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [due, setDue] = useState("Today");
  const [schedule, setSchedule] = useState<{ time: string; task: string }[]>([]);

  const add = () => {
    if (!title.trim()) return;
    setTasks([...tasks, { id: crypto.randomUUID(), title: title.trim(), priority, due }]);
    setTitle("");
  };

  const remove = (id: string) => setTasks(tasks.filter((t) => t.id !== id));

  const plan = () => {
    if (tasks.length === 0) {
      toast.error("Add at least one task to plan your day.");
      return;
    }
    const ordered = [...tasks].sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    });
    const times = ["09:00", "10:30", "11:30", "13:30", "15:00", "16:00", "16:45"];
    setSchedule(
      ordered.slice(0, times.length).map((t, i) => ({ time: times[i], task: t.title })),
    );
    toast.success("Schedule generated");
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        eyebrow="Task Planner"
        title="Plan your day with AI"
        description="Add tasks, set priorities, and Lumen will build a focused daily schedule."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="shadow-card lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><ListChecks className="h-4 w-4 text-primary" /> Tasks</CardTitle>
            <CardDescription>Add, prioritize, and review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px_120px_auto]">
              <div className="space-y-1.5">
                <Label className="text-xs">Task</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to get done?" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Priority</Label>
                <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Due</Label>
                <Input value={due} onChange={(e) => setDue(e.target.value)} placeholder="Today" />
              </div>
              <div className="flex items-end">
                <Button onClick={add} className="w-full"><Plus className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="space-y-2">
              {tasks.map((t) => (
                <div key={t.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{t.title}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline" className={priorityTone[t.priority]}>{t.priority}</Badge>
                      <span className="text-xs text-muted-foreground">Due {t.due}</span>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => remove(t.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                  No tasks yet
                </div>
              )}
            </div>

            <Button onClick={plan} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" /> Generate daily schedule
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Clock className="h-4 w-4 text-primary" /> Today's schedule</CardTitle>
            <CardDescription>AI-prioritized focus blocks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {schedule.length > 0 ? (
              schedule.map((s, i) => (
                <div key={i} className="grid grid-cols-[60px_minmax(0,1fr)] items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
                  <div className="font-mono text-sm font-semibold text-primary">{s.time}</div>
                  <div className="min-w-0 truncate text-sm">{s.task}</div>
                </div>
              ))
            ) : (
              <div className="grid place-items-center rounded-xl border border-dashed border-border py-16 text-center">
                <Sparkles className="mb-3 h-8 w-8 text-muted-foreground/60" />
                <div className="text-sm font-medium">Your schedule appears here</div>
                <div className="mt-1 text-xs text-muted-foreground">Click Generate to plan your day</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
