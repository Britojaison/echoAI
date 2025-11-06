import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Infini8 Voice - AI Voice Calling Agents for Customer Engagement',
    template: '%s | Infini8 Voice'
  },
  description: 'Automate customer interactions with AI voice calling agents. Collect feedback, qualify leads, and engage customers in English and regional languages. Trusted by 500+ companies worldwide.',
  keywords: [
    'AI voice agents',
    'voice AI',
    'customer engagement',
    'automated calling',
    'lead qualification',
    'multilingual support',
    'customer feedback',
    'conversational AI',
    'voice automation',
    'AI phone calls',
    'customer service automation',
    'outbound calling',
    'inbound calling',
    'AI chatbot',
    'voice bot',
    'customer experience',
    'call center automation',
    'telephony AI',
    'interactive voice response',
    'IVR'
  ],
  authors: [{ name: 'Infini8 Voice', url: 'https://infini8voice.com' }],
  creator: 'Infini8 Voice',
  publisher: 'Infini8 Voice',
  applicationName: 'Infini8 Voice',
  category: 'Technology',
  icons: {
    icon: [
      { url: '/echo-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/echo-logo.png', sizes: '64x64', type: 'image/png' },
      { url: '/echo-logo.png', sizes: '96x96', type: 'image/png' },
      { url: '/echo-logo.png', sizes: '128x128', type: 'image/png' },
      { url: '/echo-logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/echo-logo.png',
    apple: [
      { url: '/echo-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://infini8voice.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Infini8 Voice - AI Voice Calling Agents for Customer Engagement',
    description: 'Automate customer interactions with AI voice calling agents. Collect feedback, qualify leads, and engage customers in English and regional languages.',
    url: 'https://infini8voice.com',
    siteName: 'Infini8 Voice',
    images: [
      {
        url: '/og-image.jpg',
        width: 1400,
        height: 700,
        alt: 'Infini8 Voice - AI Voice Calling Agents',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infini8 Voice - AI Voice Calling Agents for Customer Engagement',
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
  verification: {
    // Add verification codes when you get them from Google Search Console, Bing, etc.
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
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

