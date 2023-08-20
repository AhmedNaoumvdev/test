import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../i18n";
import { AuthProvider } from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delegue",
  description:
    "Effortlessly manage student information with our intuitive platform.",
  openGraph: {
    type: "website",
    title: "Delegue",
    description:
      "Effortlessly manage student information with our intuitive platform.",
    images: [{ url: "./favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
