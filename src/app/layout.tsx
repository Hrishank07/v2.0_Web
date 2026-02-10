import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeWrapper } from "@/components/theme-wrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Hrishank Chhatbar - Software Engineer",
  description: "Building scalable systems that solve complex challenges. From architecting AWS Lambda solutions to crafting full-stack applications with modern frameworks.",
  keywords: ["Hrishank Chhatbar", "Software Engineer", "Cloud Architect", "AWS", "Full Stack", "Lambda"],
  authors: [{ name: "Hrishank Chhatbar" }],
  openGraph: {
    title: "Hrishank Chhatbar - Software Engineer & Cloud Architect",
    description: "Building scalable systems that solve complex challenges",
    type: "website",
  },
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_ID", // Replace with your actual ID
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
