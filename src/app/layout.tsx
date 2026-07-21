import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Kishor — Software Engineer", template: "%s · Kishor" },
  description: "Kishor is a full-stack software engineer specializing in Java, React, Next.js, TypeScript, and reliable digital products.",
  keywords: ["Kishor", "Software Engineer", "Full Stack Developer", "Java Developer", "React Developer", "Next.js Developer"],
  authors: [{ name: "Kishor" }],
  creator: "Kishor",
  openGraph: { title: "Kishor — Software Engineer", description: "Full-stack engineer building reliable systems and polished product experiences.", type: "website", locale: "en_IN", siteName: "Kishor.dev" },
  twitter: { card: "summary_large_image", title: "Kishor — Software Engineer", description: "Full-stack engineer building reliable systems and polished product experiences." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={spaceGrotesk.variable}><body>{children}</body></html>;
}
