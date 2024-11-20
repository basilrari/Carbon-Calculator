import type { Metadata } from "next";
import localFont from "next/font/local";  // Local font import
import "./globals.css";  // Your global styles
import { Toaster } from "sonner";

// Load local fonts
const geistSans = localFont({
  src: "../../public/GeistVF.woff",  // Ensure this file is in the public folder
  variable: "--font-geist-sans",  // This is used in your className
  weight: "100 900",  // Specify the range of font weights supported by the file
});
const geistMono = localFont({
  src: "../../public/GeistMonoVF.woff",  // Ensure this file is in the public folder
  variable: "--font-geist-mono",  // This is used in your className
  weight: "100 900",  // Specify the range of font weights supported by the file
});

export const metadata: Metadata = {
  title: "decarb",
  description: "Sustainability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}  // Apply the custom fonts
      >
        <Toaster
          position="top-right"
          richColors={true}
          toastOptions={{
            className: "font-syne text-md",  // Example for toast font and styling
            duration: 3000,
          }}
        />
        {children}  {/* Render children (the rest of your app) */}
      </body>
    </html>
  );
}
