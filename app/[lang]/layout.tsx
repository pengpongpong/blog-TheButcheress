import { ReactNode } from "react"
import "./globals.css"
import { Locale } from "./HomePage"
import CookieBanner from "@/components/cookie-banner/CookieBanner"
import Analytics from "@/components/analytics/Analytics"

const domain = process.env.NEXT_PUBLIC_DOMAIN

export const metadata = {
  metadataBase: new URL(`${domain}`),
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "blog",
  httpEquiv: "test"
}


export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode,
  params: { lang: Locale },
}) {



  return (
    <html lang={`${params.lang ?? "de"}`}>
      <Analytics />
      
      <body className="min-h-screen flex flex-col">
        {children}
        <CookieBanner lang={params.lang} />
      </body>
    </html>
  )
}
