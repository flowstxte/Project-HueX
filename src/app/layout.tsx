import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "./client-providers";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "HueX",
  description: "color picker and code generator.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
