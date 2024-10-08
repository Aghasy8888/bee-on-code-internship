import type { Metadata } from "next";
import {Montserrat} from 'next/font/google';
import ReduxProvider from '@/redux/provider'
import "./globals.scss";

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: "Bee On Code Aghasy ",
  description: "Bee On Code internship test project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
