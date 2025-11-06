import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Discover how leading companies use ECHO AI to automate customer interactions, qualify leads, and collect feedback. Real success stories from Cinco, Creative Orbit, and more.',
  openGraph: {
    title: 'Case Studies - ECHO AI Success Stories',
    description: 'Discover how leading companies use ECHO AI to automate customer interactions, qualify leads, and collect feedback.',
    url: 'https://echoai.com/case-studies',
    siteName: 'ECHO AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ECHO AI Case Studies',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - ECHO AI Success Stories',
    description: 'Discover how leading companies use ECHO AI to automate customer interactions, qualify leads, and collect feedback.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://echoai.com/case-studies',
  },
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


