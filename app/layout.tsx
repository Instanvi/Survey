import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title:
    "The Impact of ESG Adoption on Sustainable Financial Performance in Your Organization",
  description:
    "Bilingual survey on ESG adoption and sustainable financial performance, with scoring (English / Français).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#ffffff] font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
