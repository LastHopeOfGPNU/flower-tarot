import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const crimson = Crimson_Text({ 
  weight: ["400", "600", "700"], 
  subsets: ["latin"], 
  variable: "--font-crimson" 
});

export const metadata: Metadata = {
  title: "直言塔罗 - Blunt AI Tarot",
  description: "A direct, no-nonsense AI Tarot reader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${crimson.variable} font-sans bg-slate-950 text-slate-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}