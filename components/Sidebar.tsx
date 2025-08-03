import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="p-4 bg-background">
      <nav className="space-y-2">
        <Link href="/" className="block p-2 rounded hover:bg-muted">Overview</Link>
        {/* <Link href="/reports" className="block p-2 rounded hover:bg-muted">Reports</Link> */}
      </nav>
    </aside>
  );
}
