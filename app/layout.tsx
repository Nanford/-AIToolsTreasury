import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Tools Treasury - The Ultimate AI Tools Directory",
  description: "Explore the ultimate collection of AI tools for creative, productivity and professional use",
  keywords: "AI tools, artificial intelligence, AI directory, ChatGPT, Midjourney, AI image generation, AI code generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-apple-gray6`}
      >
        {children}
      </body>
    </html>
  );
}
