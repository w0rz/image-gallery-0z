import type { Metadata } from "next";
import Navbar from "./Navbar";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Next.js Image Gallery",
  description: "Image gallery application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
