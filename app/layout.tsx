import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://spicypizza.dk"),
  title: "Spicy Pizza & Grill | Pizza og takeaway i Horsens",
  description: "Frisklavet pizza, pasta, burger og grill på Vestergade i Horsens. Bestil til afhentning eller levering.",
  openGraph: { title: "Spicy Pizza & Grill", description: "Pizza, pasta og grill i Horsens.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Spicy Pizza & Grill", description: "Pizza, pasta og grill i Horsens.", images: ["/og.png"] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="da"><body>{children}</body></html>; }
