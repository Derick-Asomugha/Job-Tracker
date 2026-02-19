import type { Metadata } from "next";
import "./globals.css";
// import { Providers } from "./providers";

import { ThemeProvider } from "./context/ThemeContext";


export const metadata: Metadata = {
  title: "JobTrack AI",
  description: "Track your applications and get AI-powered insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
