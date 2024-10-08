import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: "Svg Drag And Drop",
  description: "Created by Aghasy Ghazaryan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>{children}</ReduxProvider>      
        </body>
    </html>
  );
}
