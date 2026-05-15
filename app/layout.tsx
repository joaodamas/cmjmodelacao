import type { Metadata } from "next";
import Script from "next/script";
import { ConversionTracking } from "@/components/conversion-tracking";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cmj.jpproject.com.br"),
  title: "CMJ Modelação | Moldes em Isopor para Fundição",
  description:
    "Fabricação de moldes em isopor para fundição em alumínio, aço e ferro fundido. Estrutura CNC, acabamento técnico e atendimento industrial em São Bernardo do Campo/SP.",
  keywords: [
    "moldes em isopor para fundição",
    "modelação industrial",
    "moldes para fundição",
    "moldes para alumínio",
    "moldes para aço",
    "moldes para ferro fundido",
    "CNC router modelação",
    "modelação em São Bernardo do Campo",
    "moldes industriais sob medida"
  ],
  openGraph: {
    title: "CMJ Modelação | Moldes em Isopor para Fundição",
    description:
      "Moldes em isopor para fundição com estrutura CNC, acabamento técnico e atendimento B2B industrial.",
    url: "https://cmj.jpproject.com.br",
    siteName: "CMJ Modelação",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CMJ Modelação - Moldes em Isopor para Fundição"
      }
    ],
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CMJ Modelação | Moldes em Isopor para Fundição",
    description:
      "Fabricação de moldes em isopor para fundição em alumínio, aço e ferro fundido com estrutura CNC.",
    images: ["/opengraph-image"]
  },
  alternates: {
    canonical: "https://cmj.jpproject.com.br"
  },
  robots: {
    index: true,
    follow: true
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="pt-BR">
      <body>
        {gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        ) : null}
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {metaPixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <FirebaseAnalytics />
        <ConversionTracking />
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
