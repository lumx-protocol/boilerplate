import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import config from "../../lumx.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.pageTitle,
  description: config.pageDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col justify-between">
          {children}
        </div>
      </body>
    </html>
  );
}
