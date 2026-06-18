import { Bell, Moon, Search, Sun } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";

export function TopNav() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur-md sm:px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-1 h-5" />
      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tools, docs, anything…"
          className="h-9 pl-9"
        />
      </div>
      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
          AM
        </div>
      </div>
    </header>
  );
}
