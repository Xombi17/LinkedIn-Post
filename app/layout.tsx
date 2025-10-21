import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PostPilot Lite — Write. Rewrite. Shine.",
  description: "AI-powered LinkedIn post generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add a stable class on the html element to avoid hydration mismatches
    // when browser extensions or client scripts mutate the <html> before React hydrates.
    <html lang="en" className="hydrated">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
