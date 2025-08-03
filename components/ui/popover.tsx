// components/ui/popover.tsx
"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface PopoverProps {
  children: ReactNode;
  className?: string;
}

interface PopoverTriggerProps {
  children: ReactNode;
  "aria-label"?: string;
}

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

export function Popover({ children, className = "" }: PopoverProps) {
  return <div className={`relative inline-block ${className}`}>{children}</div>;
}

export function PopoverTrigger({
  children,
  "aria-label": ariaLabel,
}: PopoverTriggerProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      data-popover-trigger
      className="inline-flex items-center"
    >
      {children}
    </button>
  );
}

export function PopoverContent({
  children,
  className = "",
}: PopoverContentProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);

  // Simple delegation: find the trigger in parent by attribute
  useEffect(() => {
    const parent = contentRef.current?.parentElement;
    if (!parent) return;
    trigger.current = parent.querySelector("[data-popover-trigger]") as HTMLElement;
    const handleToggle = () => setOpen((o) => !o);
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        open &&
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        trigger.current &&
        !trigger.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    trigger.current?.addEventListener("click", handleToggle);
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      trigger.current?.removeEventListener("click", handleToggle);
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      role="dialog"
      aria-modal="false"
      className={`absolute z-50 mt-2 rounded-md border bg-white shadow-md p-2 ${className}`}
    >
      {children}
    </div>
  );
}
