export function SkeletonPanel() {
  return (
    <div className="space-y-4">
      <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
      <div className="h-64 animate-pulse rounded-2xl bg-white/5" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-56 animate-pulse rounded-2xl bg-white/5" />
        <div className="h-56 animate-pulse rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}
