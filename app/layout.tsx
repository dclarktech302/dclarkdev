import type { Metadata } from "next";
import "./globals.css";
import "@/styles/Shared.css";
import "@/styles/Navigation.css";
import "@/styles/Hero.css";
import "@/styles/About.css";
import "@/styles/Projects.css";
import "@/styles/Stack.css";
import "@/styles/Blog.css";
import "@/styles/Contact.css";
import "@/styles/Footer.css";

export const metadata: Metadata = {
  title: "DEV.FOLIO - Full Stack Engineer & Software Architect",
  description: "5+ years crafting fast, scalable web apps from database to deployment. React, Next.js, Node.js & cloud-native — built for startups & local businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
