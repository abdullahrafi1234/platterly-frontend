import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { AuthProvider } from "@/modules/auth/authContext";
import { CartProvider } from "@/modules/order/cartContext";
import type { Metadata } from "next";
import {
  Fraunces,
  Geist,
  Geist_Mono,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ variable: "--font-display", subsets: ["latin"] });
const inter = Inter({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Platterly",
  description: "Discover & Order Delicious Meals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
