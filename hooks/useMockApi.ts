"use client";

import { useEffect, useState, useRef } from "react";
import { addMinutes, subDays, formatISO } from "date-fns";

export type Metric = { title: string; value: string; change: string };
export type LinePoint = { date: string; revenue: number };
export type BarPoint = { campaign: string; clicks: number };
export type PieSlice = { name: string; value: number };

function randomDelta(oldVal: number, variance = 0.1) {
  const change = (Math.random() * 2 - 1) * variance;
  return Math.max(0, oldVal * (1 + change));
}

export function useMockApi(dateRange: { from: Date; to: Date }) {
  const [metrics, setMetrics] = useState<Metric[] | null>(null);
  const [lineData, setLineData] = useState<LinePoint[] | null>(null);
  const [barData, setBarData] = useState<BarPoint[] | null>(null);
  const [pieData, setPieData] = useState<PieSlice[] | null>(null);
  const intervalRef = useRef<number | null>(null);

  const generate = () => {
    // Base seed (could be persisted)
    const baseRevenue = 100000;
    const users = 8500;
    const conversions = 1200;
    const growth = 0.14;

    setMetrics([
      {
        title: "Revenue",
        value: `$${(baseRevenue + Math.random() * 20000).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`,
        change: `+${(Math.random() * 10 + 2).toFixed(1)}%`,
      },
      {
        title: "Users",
        value: (users + Math.floor(Math.random() * 500)).toLocaleString(),
        change: `+${(Math.random() * 5 + 1).toFixed(1)}%`,
      },
      {
        title: "Conversions",
        value: (conversions + Math.floor(Math.random() * 150)).toLocaleString(),
        change: `+${(Math.random() * 7 + 1).toFixed(1)}%`,
      },
      {
        title: "Growth",
        value: `${(growth * 100 + Math.random() * 5).toFixed(1)}%`,
        change: `+${(Math.random() * 3 + 0.5).toFixed(1)}%`,
      },
    ]);

    // Line chart: daily revenue between dateRange
    const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const line: LinePoint[] = Array.from({ length: days }).map((_, idx) => {
      const d = new Date(dateRange.from);
      d.setDate(d.getDate() + idx);
      return {
        date: d.toISOString().slice(0, 10),
        revenue: Math.floor(3000 + Math.random() * 3000),
      };
    });
    setLineData(line);

    // Bar chart: campaigns
    setBarData([
      { campaign: "Campaign A", clicks: Math.floor(200 + Math.random() * 300) },
      { campaign: "Campaign B", clicks: Math.floor(150 + Math.random() * 300) },
      { campaign: "Campaign C", clicks: Math.floor(250 + Math.random() * 300) },
    ]);

    // Pie: traffic sources
    const fb = Math.floor(300 + Math.random() * 200);
    const ig = Math.floor(200 + Math.random() * 200);
    const ga = Math.floor(200 + Math.random() * 200);
    setPieData([
      { name: "Facebook", value: fb },
      { name: "Instagram", value: ig },
      { name: "Google Ads", value: ga },
    ]);
  };

  useEffect(() => {
    // initial load with simulated latency
    const t = setTimeout(() => generate(), 800);
    // real-time updates
    intervalRef.current = window.setInterval(() => {
      // mutate existing data slightly
      setMetrics(prev =>
        prev
          ? prev.map(m => ({
              ...m,
              value: m.title === "Revenue" ? `$${(Math.floor(Math.random() * 140000) + 80000).toLocaleString()}` : m.value,
              change: `+${(Math.random() * 5 + 1).toFixed(1)}%`,
            }))
          : prev
      );
      setLineData(prev =>
        prev
          ? prev.map(pt => ({
              ...pt,
              revenue: Math.floor(randomDelta(pt.revenue, 0.05)),
            }))
          : prev
      );
      setBarData(prev =>
        prev
          ? prev.map(b => ({
              ...b,
              clicks: Math.floor(randomDelta(b.clicks, 0.1)),
            }))
          : prev
      );
      setPieData(prev =>
        prev
          ? prev.map(p => ({
              ...p,
              value: Math.floor(randomDelta(p.value, 0.08)),
            }))
          : prev
      );
    }, 10000); // every 10s

    return () => {
      clearTimeout(t);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [dateRange.from.toISOString(), dateRange.to.toISOString()]);

  return {
    metrics,
    lineData,
    barData,
    pieData,
    loading: !metrics || !lineData || !barData || !pieData,
  };
}
