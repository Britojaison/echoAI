export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ECHO AI",
    "url": "https://echoai.com",
    "logo": "https://echoai.com/echo-logo.png",
    "description": "AI voice calling agents for customer engagement, lead qualification, and feedback collection",
    "sameAs": [
      // Add your social media profiles here
      // "https://www.linkedin.com/company/echo-ai",
      // "https://twitter.com/echoai",
      // "https://www.facebook.com/echoai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9876543210",
      "contactType": "Customer Service",
      "email": "connect@88gb.in",
      "availableLanguage": ["English", "Hindi", "Regional Languages"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ECHO AI",
    "url": "https://echoai.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://echoai.com/case-studies?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ECHO AI",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "AI Voice Calling Agents",
      "Multilingual Support",
      "Lead Qualification",
      "Customer Feedback Collection",
      "Automated Calling",
      "Real-time Analytics"
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
    </>
  )
}


