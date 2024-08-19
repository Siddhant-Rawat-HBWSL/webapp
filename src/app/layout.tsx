import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sigosigns Design Webapp",
  description: "Sigosigns Design Webapp Desciption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="https://www.google.com/recaptcha/api.js" strategy="lazyOnload"></Script>
        {children}
      </body>
    </html>
  );
}
