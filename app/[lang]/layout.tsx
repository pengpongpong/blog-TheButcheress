import { ReactNode } from "react"
import "./globals.css"
import { Locale } from "./HomePage"

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
      </body>
    </html>
  )
}
