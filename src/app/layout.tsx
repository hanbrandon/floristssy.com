import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Florist SSY - Atlanta Wedding, Event & Destination Florist",
  description: "Creating romantic & refined floral moments for weddings, events, and destination events. Buford, Atlanta, Georgia. Now booking 2026/2027 weddings.",
  metadataBase: new URL("https://floristssy.com"),
  alternates: {
    canonical: "https://floristssy.com",
  },
  openGraph: {
    title: "Florist SSY - Atlanta Wedding, Event & Destination Florist",
    description: "Creating romantic & refined floral moments for weddings, events, and destination events.",
    url: "https://floristssy.com",
    siteName: "Florist SSY",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Florist SSY - Atlanta Wedding, Event & Destination Florist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Florist SSY - Atlanta Wedding, Event & Destination Florist",
    description: "Creating romantic & refined floral moments for weddings, events, and destination events.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=boska@500,501,700,701,900&f[]=switzer@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased overflow-x-hidden">
        <StructuredData />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;


