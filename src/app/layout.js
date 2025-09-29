import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/layout/Header";
import { Toaster } from "sonner";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "MintedMe - NFT Portfolio",
  description: "RAITE Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col gap-5`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Toaster/>
      </body>
    </html>
  );
}
