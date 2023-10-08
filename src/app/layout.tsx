import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from "@mmccalldev/components/Footer";
import NavigationBar from "@mmccalldev/components/NavigationBar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Matthew McCall',
  description: 'Personal website and portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{
          fontFeatureSettings: "'ss01', 'cv11'",
      }}>
      <NavigationBar position={"fixed"} />
      {children}
      <Footer />
      </body>
    </html>
  )
}
