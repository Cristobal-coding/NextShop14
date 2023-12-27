import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/config/fonts'
import { Footer, Sidebar, TopMenu } from '@/components'


export const metadata: Metadata = {
  title: {
    template: '%s Teslo | Shop',
    default: 'Home'
  },
  description: 'Una tienda virtual de productos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen`}>
        <TopMenu />
        <Sidebar />
        <div className='py-2 px-3 '>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
