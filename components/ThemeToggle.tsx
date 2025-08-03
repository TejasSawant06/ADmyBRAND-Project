"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until the component is mounted to read the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    if (!mounted) return;
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="toggle theme"
      onClick={handleClick}
    >
      {!mounted ? (
        // Show a neutral icon before hydration finishes
        <Sun aria-hidden="true" />
      ) : theme === "light" ? (
        <Moon aria-hidden="true" />
      ) : (
        <Sun aria-hidden="true" />
      )}
    </Button>
  );
}
