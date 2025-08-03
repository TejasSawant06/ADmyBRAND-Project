"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function ChartCard({
  type,
  title,
  data,
}: {
  type: "line" | "bar" | "pie";
  title: string;
  data: any[];
}) {
  let chart: React.ReactElement;

  if (type === "line") {
    chart = (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    );
  } else if (type === "bar") {
    chart = (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="clicks"
          fill="#82ca9d"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    );
  } else {
    chart = (
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius="70%"
          label
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  }

  return (
    <Card className="transition hover:shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          {chart}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
