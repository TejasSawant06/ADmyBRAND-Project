"use client";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <button
          className="md:hidden p-2 rounded hover:bg-muted"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg sm:text-2xl font-bold">ADmyBRAND Insights</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
