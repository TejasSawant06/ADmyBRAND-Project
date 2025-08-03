// components/DateRangePicker.tsx
"use client";

import { useState, useEffect, ReactNode } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-date-range";
import type { Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// --- minimal popover implementation ---
interface PopoverProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
interface PopoverTriggerProps {
  children: ReactNode;
}
interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

function Popover({
  children,
  open: controlledOpen,
  onOpenChange,
  className = "",
}: PopoverProps) {
  const [open, setOpen] = useState<boolean>(!!controlledOpen);

  useEffect(() => {
    if (controlledOpen !== undefined) setOpen(controlledOpen);
  }, [controlledOpen]);

  const handleOpenChange = (next: boolean) => {
    if (onOpenChange) onOpenChange(next);
    if (controlledOpen === undefined) setOpen(next);
  };

  return (
    <div className={`relative inline-block ${className}`} data-popover>
      {Array.isArray(children)
        ? children.map((child, i) =>
            i === 0 ? (
              <div
                key={i}
                data-popover-trigger
                onClick={() => handleOpenChange(!open)}
              >
                {child}
              </div>
            ) : (
              open && (
                <div
                  key={i}
                  data-popover-content
                  className="absolute z-50 mt-2"
                >
                  {child}
                </div>
              )
            )
          )
        : children}
    </div>
  );
}

function PopoverTrigger({ children }: PopoverTriggerProps) {
  return <>{children}</>;
}

function PopoverContent({ children, className = "" }: PopoverContentProps) {
  return <div className={className}>{children}</div>;
}
// --- end popover stub ---

interface Props {
  from: Date;
  to: Date;
  onChange: (range: { from: Date; to: Date }) => void;
}

export function DateRangePicker({ from, to, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selection: Range = {
    startDate: from,
    endDate: to,
    key: "selection",
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          aria-label="Select date range"
          className="flex gap-2 items-center"
        >
          <CalendarIcon className="w-4 h-4" />
          <span>
            {format(from, "MMM d, yyyy")} - {format(to, "MMM d, yyyy")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <DateRange
          editableDateInputs
          onChange={(ranges) => {
            const sel = (ranges as any).selection;
            if (sel?.startDate && sel?.endDate) {
              onChange({ from: sel.startDate, to: sel.endDate });
            }
          }}
          moveRangeOnFirstSelection={false}
          ranges={[selection]}
          maxDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
