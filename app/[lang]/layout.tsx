import { ReactNode } from "react"
import "./globals.css"
import { Locale } from "./HomePage"
import CookieBanner from "@/components/cookie-banner/CookieBanner"
import Script from "next/script"
import { randomBytes } from 'crypto'
import Head from "next/head"

export const metadata = {
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

  const token = process.env.NEXT_PUBLIC_TINYBIRD
  const nonce = randomBytes(128).toString('base64')
  const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic'`

  return (
    <html lang={`${params.lang ?? "de"}`}>
      {/* <Head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </Head> */}
      <Script
        defer
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.tinybird.co"
        data-token={token}
        id="tinybird"
      />
      <body className="min-h-screen flex flex-col">
        {children}
        <CookieBanner lang={params.lang} />
      </body>
    </html>
  )
}
