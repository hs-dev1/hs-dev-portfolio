import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import ScrollProgress from "@/components/ui/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Muhammad Hussnain | Senior Software Engineer",
    template: "%s | Muhammad Hussnain"
  },
  description: "Senior Software Engineer architecting high-performance mobile applications. Expert in Flutter, Dart, and Native optimizations.",
  keywords: [
    "Flutter Developer",
    "Mobile Engineer",
    "Senior Software Engineer",
    "DartExpert",
    "iOS",
    "Android",
    "Cross-Platform",
    "React",
    "Next.js"
  ],
  authors: [{ name: "Muhammad Hussnain", url: "https://hussnain.dev" }],
  creator: "Muhammad Hussnain",
  metadataBase: new URL('https://hussnain.dev'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hussnain.dev",
    title: "Muhammad Hussnain | Senior Flutter Developer",
    description: "Architecting Mobile Excellence. Explore my portfolio of high-performance apps.",
    siteName: "Muhammad Hussnain",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: "Muhammad Hussnain Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hussnain | Senior Flutter Developer",
    description: "Architecting Mobile Excellence. Explore my portfolio.",
    creator: "@hs_dev1",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
