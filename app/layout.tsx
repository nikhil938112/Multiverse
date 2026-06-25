import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import ThemeSwitcher from "@/app/components/ui/ThemeSwitcher";

export const metadata: Metadata = {
  title: "Nikhil Kumar | Full Stack Developer & Software Engineer",
  description:
    "Portfolio of Nikhil Kumar — Full Stack Developer specializing in MERN Stack, React, Next.js, Node.js, and AI integrations. Explore my multiverse of skills and projects.",
  keywords: [
    "Nikhil Kumar",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Next.js",
    "Node.js",
    "Software Engineer",
    "Portfolio",
    "AI Developer",
  ],
  authors: [{ name: "Nikhil Kumar" }],
  creator: "Nikhil Kumar",
  openGraph: {
    title: "Nikhil Kumar | Full Stack Developer",
    description: "Explore the Multiverse Portfolio — a cinematic 3D journey through my skills, projects, and professional journey.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Kumar | Full Stack Developer",
    description: "Explore the Multiverse Portfolio — cinematic 3D journey through skills & projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <ThemeProvider>
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
