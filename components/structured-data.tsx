import { contact, faqs, services } from "@/lib/site-data";

const baseUrl = "https://www.cmjmodelacao.com.br";

export function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#business`,
      name: "CMJ Modelação",
      url: baseUrl,
      telephone: "+55 11 4342-7908",
      areaServed: "Brasil",
      address: {
        "@type": "PostalAddress",
        addressLocality: "São Bernardo do Campo",
        addressRegion: "SP",
        addressCountry: "BR"
      },
      description:
        "Fabricação de moldes em isopor para fundição em alumínio, aço e ferro fundido com estrutura CNC e acabamento técnico.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55 11 95819-0776",
        contactType: "sales",
        availableLanguage: "Portuguese"
      },
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description
        }
      }))
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
      name: "CMJ Modelação",
      url: baseUrl,
      inLanguage: "pt-BR",
      publisher: {
        "@id": `${baseUrl}/#business`
      }
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
