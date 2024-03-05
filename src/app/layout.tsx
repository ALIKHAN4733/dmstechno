import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TTE DMS',
  description: 'DMS',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
   
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <header className="header">
        <div className="header-content responsive-wrapper">
          <div className="header-logo">
            <a href="#">
              <div></div>
              <img src="/logo.png" alt="Logo" width="150px" height="150px" />
            </a>
          </div>
        </div>
      </header>
        
        
        {children}</body>
    </html>
  )
}
