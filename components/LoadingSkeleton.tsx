import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeletons() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} className="h-48 w-full" />
        ))}
      </div>

      <Skeleton className="h-64 w-full" />
    </div>
  );
}
