import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import CustomCursor from "@/components/animations/CustomCursor";
import AnimeParticles from "@/components/animations/AnimeParticles";
import InteractiveWorld from "@/components/interactive-world/InteractiveWorld";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import profileData from "@/data/profile.json";
import siteData from "@/data/site.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata = {
  title: `${profileData.name} — ${profileData.role}`,
  description: profileData.headline,
  metadataBase: new URL(siteData.siteUrl || "https://developer-portfolio.com"),
  openGraph: {
    title: `${profileData.name} — ${profileData.role}`,
    description: profileData.headline,
    url: siteData.siteUrl,
    siteName: profileData.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} — ${profileData.role}`,
    description: profileData.headline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name,
    jobTitle: profileData.role,
    description: profileData.headline,
    address: {
      "@type": "PostalAddress",
      addressLocality: profileData.location,
    },
    knowsAbout: [
      "ReactJS",
      "React Native",
      "Node.js",
      "Vue.js",
      "Next.js",
      "PostgreSQL",
      "SQLite",
      "Full Stack Development",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-white transition-colors duration-300 relative min-h-screen">
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <AnimeParticles />
            <InteractiveWorld />
            <Navbar />
            {children}
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
