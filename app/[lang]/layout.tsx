import { ReactNode } from "react"
import "./globals.css"

import CookieBanner from "@/components/cookie-banner/CookieBanner"
import { Locale } from "./(main-nav)/HomePage"

export const metadata = {
  title: 'TheButcheress | Blog',
  description: "A blog about food, recipes and travel",
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
      <body className="min-h-screen flex flex-col">
        {children}
        <CookieBanner lang={params.lang} />
      </body>
    </html>
  )
}
