import { contact, faqs, services } from "@/lib/site-data";

const baseUrl = "https://cmj.jpproject.com.br";

export function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "Manufacturer"],
      "@id": `${baseUrl}/#business`,
      name: "CMJ Modelação",
      legalName: "CMJ Modelação",
      url: baseUrl,
      logo: `${baseUrl}/icon.svg`,
      image: `${baseUrl}/opengraph-image`,
      telephone: "+55 11 95819-0776",
      email: contact.email,
      priceRange: "$$",
      areaServed: ["Brasil", "São Paulo", "ABC Paulista"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "São Bernardo do Campo",
        addressRegion: "SP",
        addressCountry: "BR"
      },
      description:
        "Fabricação de moldes em isopor (EPS) para fundição em alumínio, aço e ferro fundido. Modelação industrial com estrutura CNC em São Bernardo do Campo/SP.",
      knowsAbout: [
        "Modelos em EPS para fundição",
        "Moldes em isopor",
        "Modelação industrial",
        "Fundição em alumínio",
        "Fundição em aço",
        "Fundição em ferro fundido",
        "Usinagem CNC Router",
        "Corte a fio"
      ],
      sameAs: [`https://${contact.site}`],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:30"
        }
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+55 11 95819-0776",
          contactType: "sales",
          availableLanguage: ["Portuguese"]
        }
      ],
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.problem,
          provider: { "@id": `${baseUrl}/#business` }
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/#service-moldes-isopor`,
      name: "Moldes em isopor para fundição",
      serviceType: "Modelação industrial",
      provider: { "@id": `${baseUrl}/#business` },
      areaServed: "Brasil",
      description:
        "Fabricação de modelos em EPS para processos de fundição em alumínio, aço e ferro fundido, com estrutura CNC própria.",
      offers: {
        "@type": "Offer",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "CMJ Modelação",
      url: baseUrl,
      inLanguage: "pt-BR",
      publisher: { "@id": `${baseUrl}/#business` }
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c")
      }}
    />
  );
}
