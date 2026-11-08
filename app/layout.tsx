import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI Ad Cloning Engine",
  description: "Programmatically clone and remix Shopify video ads using AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}