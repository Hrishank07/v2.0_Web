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
  keywords: [
    "Hrishank Chhatbar",
    "Hrishank",
    "Hrishankk",
    "Hrishank C",
    "Software Engineer",
    "Cloud Architect",
    "AWS",
    "Full Stack",
    "Lambda",
    "Next.js Developer"
  ],
  authors: [{ name: "Hrishank Chhatbar" }],
  openGraph: {
    title: "Hrishank Chhatbar - Software Engineer & Cloud Architect",
    description: "Building scalable systems that solve complex challenges",
    url: "https://hrishankc.netlify.app",
    siteName: "Hrishank Chhatbar Portfolio",
    images: [
      {
        url: "https://hrishankc.netlify.app/og-image.png", // Ensure you have an og-image
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  verification: {
    google: "0KSBnChCi9dBPjm7kXBCBPQkXFRsK0liVofcTi_XNr8",
  },
  alternates: {
    canonical: "https://hrishankc.netlify.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hrishank Chhatbar",
    alternateName: ["Hrishank", "Hrishank C", "Hrishankk"],
    url: "https://hrishankc.netlify.app",
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/Hrishank07",
      "https://linkedin.com/in/hrishank-chhatbar",
      // Add other social profiles here if available
    ],
    knowsAbout: ["Software Engineering", "Cloud Architecture", "AWS", "Next.js", "React", "Python"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeWrapper>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
