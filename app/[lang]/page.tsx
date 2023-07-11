import { lazy } from "react"
import { client } from "@/sanity/lib/sanity-utils"
import Home, { Locale } from "./HomePage"
import { Metadata } from 'next'
import { Lang, navQuery } from "@/sanity/lib/sanity-query"
import { transformLocale } from "@/components/utils/utils"
import { draftMode } from "next/headers"
import HomePreview from "./HomePreview"
import Preview from "@/components/preview/Preview"
import Navbar from "@/components/navbar/Navbar"
import { groq } from "next-sanity"

export interface ParamsProps {
  params: {
    lang: Locale,
    slug?: string
  },
}

export interface MetaDataProps extends ParamsProps { }

// query for home data from CMS
const homeQuery = (lang: Lang) => {
  return groq`*[_type == "home"][0]{
      introduction{title{"title": title${lang}}, content{"content": content${lang}}},
      recipe{title{"title": title${lang}}, content{"content": content${lang}}, image},
      travel{title{"title": title${lang}}, content{"content": content${lang}}, image}, 
      imageSlider
    }`
}

// meta data
export async function generateMetadata(
  { params }: MetaDataProps
): Promise<Metadata> {
  const { lang } = params
  const data = await client.fetch(homeQuery(transformLocale(lang)))
  const text = lang === "en" ? "TheButcheress_ | A blog about food, recipes and travel" : "TheButcheress_ | Ein Blog über Nahrung, Rezepte und Reisen"
  const domain = process.env.NEXT_PUBLIC_DOMAIN

  const keywords = lang === "en" ? ["blog", "food", "travel"] : ["Blog", "Essen", "Reisen"]

  return {
    title: text,
    description: data?.introduction?.content?.content,
    keywords: keywords,
    authors: [{ name: 'TheButcheress_' }],
    openGraph: {
      title: text,
      description: data?.introduction?.content?.content,
      url: `${domain}/${lang}`,
      siteName: 'TheButcheress_',
      images: [],
      locale: lang,
      type: 'website',
    },
  }
}

export const generateStaticParams = () => {
  return [{ lang: "de" }, { lang: "en" }]
}

const Footer = lazy(() => import("@/components/footer/Footer"))

export default async function HomePage({ params: { lang } }: ParamsProps) {
  const { isEnabled } = draftMode()
  const pageQuery = homeQuery(transformLocale(lang))
  const data = !isEnabled ? await client.fetch(pageQuery) : ""
  const navData = await client.fetch(navQuery(transformLocale(lang)))

  return isEnabled ? (
    <>
      <Navbar navData={navData} lang={lang} />
      <Preview>
        <HomePreview pageQuery={pageQuery} lang={lang} />
      </Preview>
      <Footer lang={lang} />
    </>
  ) :
    <>
      <Navbar navData={navData} lang={lang} />
      <Home pageData={data} lang={lang} />
      <Footer lang={lang} />
    </>
}
