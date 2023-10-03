import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Edsel Chat",
  description: "A basic chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Suspense>
        <Analytics />
      </Suspense>
    </html>
  );
}
