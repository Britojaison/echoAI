import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ECHO AI - AI Voice Calling Agents for Customer Engagement',
  description: 'Automate customer interactions with AI voice calling agents. Collect feedback, qualify leads, and engage customers in English and regional languages with ECHO AI.',
  keywords: 'AI voice agents, customer engagement, automated calling, lead qualification, multilingual support, customer feedback',
  authors: [{ name: 'ECHO AI' }],
  creator: 'ECHO AI',
  publisher: 'ECHO AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://echoai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ECHO AI - AI Voice Calling Agents for Customer Engagement',
    description: 'Automate customer interactions with AI voice calling agents. Collect feedback, qualify leads, and engage customers in English and regional languages.',
    url: 'https://echoai.com',
    siteName: 'ECHO AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ECHO AI - AI Voice Calling Agents',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECHO AI - AI Voice Calling Agents for Customer Engagement',
    description: 'Automate customer interactions with AI voice calling agents. Collect feedback, qualify leads, and engage customers in English and regional languages.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

