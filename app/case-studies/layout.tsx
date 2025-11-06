import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Discover how leading companies use Infini8 Voice to automate customer interactions, qualify leads, and collect feedback. Real success stories from Cinco, Creative Orbit, and more.',
  openGraph: {
    title: 'Case Studies - Infini8 Voice Success Stories',
    description: 'Discover how leading companies use Infini8 Voice to automate customer interactions, qualify leads, and collect feedback.',
    url: 'https://infini8voice.com/case-studies',
    siteName: 'Infini8 Voice',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Infini8 Voice Case Studies',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - Infini8 Voice Success Stories',
    description: 'Discover how leading companies use Infini8 Voice to automate customer interactions, qualify leads, and collect feedback.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://infini8voice.com/case-studies',
  },
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


