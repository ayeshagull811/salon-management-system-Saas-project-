// src/app/layout.jsx
import "./globals.css";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // jo bhi weights chahiyein
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geistMono.className}>{children}</body>
    </html>
  );
}
