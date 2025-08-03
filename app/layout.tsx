import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col md:flex-row min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light">
          {/* Sidebar collapses to top on mobile */}
          <div className="md:w-64 w-full md:block border-b md:border-b-0 md:border-r">
            <Sidebar />
          </div>
          <main className="flex-1">
            <Navbar />
            <div className="p-4 sm:p-6">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
