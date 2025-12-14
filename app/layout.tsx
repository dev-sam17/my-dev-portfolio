import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextAuthSessionProvider from "@/app/providers/session-provider";
import Script from "next/script";

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
        <head>
          {/* Google tag (gtag.js) */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-6QVQ96HBP6"
          ></Script>
          <Script id="gtag-init" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6QVQ96HBP6');
  `}
          </Script>
        </head>
        <body className="bg-black">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
