import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Retaily",
  description: "Retaily is a modern e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang='en'>
    //   <ClerkProvider>
    //     <body>
    //       <ThemeProvider
    //         attribute="class"
    //         defaultTheme="system"
    //         enableSystem
    //         disableTransitionOnChange
    //       >
    //         {children}
    //       </ThemeProvider>
    //     </body>
    //   </ClerkProvider>
    // </html>
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}