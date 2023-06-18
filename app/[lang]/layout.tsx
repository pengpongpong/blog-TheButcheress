import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import { transformLocale } from "@/components/utils/utils"
import { navQuery } from "@/sanity/lib/sanity-query"
import { client } from "@/sanity/lib/sanity-utils"
import { ReactNode, lazy } from "react"

const Footer = lazy(() => import("@/components/footer/Footer"))

export const metadata = {
  title: 'TheButcheress | Blog',
  description: "A blog about food, recipes and travel",
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode,
  params: { lang: "de" | "en" },
}) {

  const navData = await client.fetch(navQuery(transformLocale(params.lang)))

  return (
    <html lang={`${params?.lang ?? "de"}`}>
      <body>
        <Navbar navData={navData} lang={transformLocale(params.lang)} />
        {children}
        <Footer lang={params?.lang} />
      </body>
    </html>
  )
}
