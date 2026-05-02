import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohsin Raza — Links",
  description: "Developer, Creator & AI Educator. Find all my social links, projects, certificates and more in one place.",
  keywords: ["Mohsin Raza", "CodeWithMohsin", "AI Developer", "Next.js", "YouTube", "Pakistan Developer"],
  metadataBase: new URL("https://codewithmohsin-links.vercel.app"),
  openGraph: {
    title: "Mohsin Raza — Links",
    description: "Developer, Creator & AI Educator. Find all my social links, projects, certificates and more in one place.",
    url: "https://codewithmohsin-links.vercel.app",
    siteName: "Mohsin Raza",
    images: [
      {
        url: "/profile.png",
        width: 400,
        height: 400,
        alt: "Mohsin Raza — Developer & AI Educator",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Mohsin Raza — Links",
    description: "Developer, Creator & AI Educator. All my links in one place.",
    images: ["/profile.png"],
    creator: "@raza75828",
  },
  icons: {
    icon: "/profile.png",
    apple: "/profile.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceMono.variable}`}>
      <body style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
