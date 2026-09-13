import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import clsx from 'clsx'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Academy of Computer Science & Artificial Intelligence",
  description:
    "The Academy of Computer Science & Artificial Intelligence at South Brunswick High School — a four-year career academy teaching the skills that shape the future.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body id="root" className={clsx(inter.className, "min-h-screen flex items-center flex-col")}>
        <StyledComponentsRegistry>
          <Navbar />
          <div className="w-full grow flex flex-col items-center">
            {children}
          </div>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
