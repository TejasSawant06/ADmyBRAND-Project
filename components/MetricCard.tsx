import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <Card className="transition hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl sm:text-3xl font-bold">{value}</p>
        <p className="text-green-500 text-sm">{change}</p>
      </CardContent>
    </Card>
  );
}
