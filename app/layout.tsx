import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tường Vy & Trung Nghĩa",
  description: "Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi.",
  
  openGraph: {
    title: "Tường Vy & Trung Nghĩa",
    description: "Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi.",
    type: "website",
    images: [
      {
        url: "https://wedding-nghiavy.vercel.app/images/og_card.jpg", // 🔥 sửa lại domain của bạn
        width: 1200,
        height: 630,
        alt: "Tường Vy & Trung Nghĩa",
      },
    ],
  },

  // (khuyên dùng thêm cho Zalo + Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Tường Vy & Trung Nghĩa",
    description: "Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi.",
    images: ["https://wedding-nghiavy.vercel.app/images/og_card.jpg"], // giống phía trên
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}