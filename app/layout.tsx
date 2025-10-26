import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "@/lib/context/app-context";

const satoshi = localFont({
  src: [
    {
      path: "../public/Satoshi-Variable.ttf",
      style: "normal",
    },
    {
      path: "../public/Satoshi-VariableItalic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "ServeAI",
  description: "AI-powered restaurant analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} antialiased`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
