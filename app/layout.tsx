import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingNavDemo } from "./ui/nav/navBar";

export const metadata: Metadata = {
  title: "Saurav Kumar",
  description: "Created In NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="bg-black">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <FloatingNavDemo />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
