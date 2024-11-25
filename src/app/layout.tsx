import { Toaster } from "@/components/ui/primitives/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PomoSuperFocus",
    template: "%s | PomoSuperFocus",
  },
  description: "Generated by create next app",
  openGraph: {
    title: "PomoSuperFocus | Unlock your best version!",
    description:
      "All in one productivity tool which aims to unlock your best version!",
    url: "https://pomo-super-focus.vercel.app/",
    images: [
      {
        url: "/public/thumbnail.png", // Path to your preview image
        width: 1200,
        height: 630,
        alt: "PomoSuperFocus Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </StoreProvider>
    </html>
  );
}
