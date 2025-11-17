"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "react-quill-new/dist/quill.snow.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import "@radix-ui/themes/styles.css";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin")
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
            >

                    {children}

            </body>
        </html>
    );
}