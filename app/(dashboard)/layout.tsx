import type { Metadata } from "next";
import SideNav from "@/components/sideNav";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "JobTrack AI",
  description: "Track your applications and get AI-powered insights",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* SideNav: fixed, full height on desktop */}
      <div className="hidden md:block">
        <div className="sticky top-0 z-30 h-screen">
          <SideNav />
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1">
        {/* Navbar: sticky at top */}
        <div className="sticky top-0 z-40 w-full">
          <Navbar />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-auto h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
