import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AutoParts — Quality Parts for Every Vehicle",
  description:
    "Browse our extensive catalog of auto parts. Filter by vehicle make, model, and year to find the exact part you need.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-slate-50 text-slate-900">
        <Navbar />
        {children}
        <footer className="mt-16 bg-slate-900 text-slate-400 text-sm py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              <span className="text-red-500 font-bold">AUTO</span>
              <span className="text-white font-bold">PARTS</span>
              {" "}— Quality parts for every vehicle
            </p>
            <p>© {new Date().getFullYear()} AutoParts. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
