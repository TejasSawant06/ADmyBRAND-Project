"use client";
import { useState } from "react";
import { subDays } from "date-fns";
import { useMockApi } from "@/hooks/useMockApi";
import { MetricCard } from "@/components/MetricCard";
import { ChartCard } from "@/components/ChartCard";
import { DataTable } from "@/components/DataTable";
import { DateRangePicker } from "@/components/DateRangePicker";
import { LoadingSkeletons } from "@/components/LoadingSkeleton";
import { exportToCSV, exportSectionToPDF } from "@/utils/exporters";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [range, setRange] = useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const { metrics, lineData, barData, pieData, loading } = useMockApi(range);

  const handleExportCSV = () => {
    if (lineData)
      exportToCSV(
        lineData.map((d) => ({ Date: d.date, Revenue: d.revenue })),
        "revenue.csv"
      );
  };

  const handleExportPDF = async () => {
    const el = document.getElementById("dashboard-root");
    if (el) await exportSectionToPDF(el);
  };

  return (
    <div id="dashboard-root" className="space-y-6">
      {/* Header + Controls */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Overview</h2>
          <p className="text-sm text-muted-foreground">
            Analytics snapshot for selected period
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DateRangePicker from={range.from} to={range.to} onChange={setRange} />
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            Export Revenue CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* Metrics */}
      {loading || !metrics ? (
        <LoadingSkeletons />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>
      )}

      {/* Charts */}
      {loading || !lineData || !barData || !pieData ? (
        <LoadingSkeletons />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard
            type="line"
            title="Revenue Over Time"
            data={lineData.map((d) => ({
              month: d.date,
              revenue: d.revenue,
            }))}
          />
          <ChartCard
            type="bar"
            title="Campaign Clicks"
            data={barData.map((b) => ({
              name: b.campaign,
              clicks: b.clicks,
            }))}
          />
          <ChartCard type="pie" title="Traffic Sources" data={pieData} />
        </div>
      )}

      {/* Data Table */}
      <div className="mt-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Users & Conversions
        </h3>
        <div className="overflow-x-auto">
          <DataTable />
        </div>
      </div>
    </div>
  );
}
