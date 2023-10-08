import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Analytics from "@/components/Analytics";
import Head from "next/head";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat with Edsel Serrano",
  description: "A basic chat app with a chatbot powered by langchain",
  keywords: ["chat, react, nextjs, ai, langchain"],
  publisher: "Edsel Serrano",
  metadataBase: new URL("https://chat.edselserrano.com"),
  openGraph: {
    images: "/og-image.png",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          property="twitter:image"
          content="Twitter link preview image URL"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Chat with Edsel Serrano" />
        <meta
          property="twitter:description"
          content="Twitter link preview description"
        />
        <meta property="og:image" content="Link preview image URL" />
        <meta property="og:title" content="Chat with Edsel Serrano" />
        <meta property="og:description" content="Link preview description" />
        <meta property="og:url" content="https://chat.edselserrano.com/" />
        <title>Chat with Edsel Serrano</title>
      </Head>
      <body className={inter.className}>{children}</body>
      <Suspense>
        <Analytics />
      </Suspense>
    </html>
  );
}
