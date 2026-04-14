import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tường Vy & Trung Nghĩa",
  description: "Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi.",
  
  openGraph: {
    title: "Tường Vy & Trung Nghĩa",
    description: "Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi.",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Tường Vy & Trung Nghĩa",
    description: "Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}