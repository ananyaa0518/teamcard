import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fashion.ai — Style Redefined",
  description: "Discover your perfect wardrobe, curated by intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
