import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Instrument_Sans } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Light.woff', weight: '300', style: 'normal' },
    { path: '../public/fonts/Satoshi-Regular.woff', weight: '400', style: 'normal' },
    { path: '../public/fonts/Satoshi-Medium.woff', weight: '500', style: 'normal' },
    { path: '../public/fonts/Satoshi-Bold.woff', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Infini8 Voice',
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
      <body className={`${satoshi.variable} ${instrumentSans.variable} antialiased`}>
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Footer />
        <div aria-hidden className="bg-black overflow-hidden">
          <div className="border-t border-white/10" />
          <div className="flex justify-center items-end h-[88vw] sm:h-[66vw] md:h-[52vw] lg:h-[44vw]">
            <span className="text-white/10 tracking-tight font-black leading-[0.8] text-[80vw] sm:text-[60vw] md:text-[48vw] lg:text-[40vw]">
              infini8
            </span>
          </div>
        </div>
      </body>
    </html>
  )
}

