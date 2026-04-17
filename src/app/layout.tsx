import type { Metadata } from "next";
import "./globals.css";
// import Navbar from "./components/Navbar";
// import DotNavigation from "./components/DotNavigation";
// import StickyBlur from "./components/StickyBlur";

export const metadata: Metadata = {
  title: "PengenLibur",
  description: "App for traversing DOM Tree using BFS and DFS",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='0.9em' font-size='90'%3E🌲%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/sf-pro-display"
        />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='0.9em' font-size='90'%3E👨🏻‍💻%3C/text%3E%3C/svg%3E" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        {/* <Navbar /> */}
        {/* <DotNavigation /> */}
        {children}
        {/* <StickyBlur /> */}
      </body>
    </html>
  );
}
