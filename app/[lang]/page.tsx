import { lazy } from "react"
import { client } from "@/sanity/lib/sanity-utils"
import Home, { Locale } from "./HomePage"
import { Metadata, ResolvingMetadata } from 'next'
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

const homeQuery = (lang: Lang) => {
  return groq`*[_type == "home"][0]{
      introduction{title{"title": title${lang}}, content{"content": content${lang}}},
      recipe{title{"title": title${lang}}, content{"content": content${lang}}, image},
      travel{title{"title": title${lang}}, content{"content": content${lang}}, image}, 
      imageSlider
    }`
}

export async function generateMetadata(
  { params }: MetaDataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang } = params
  const data = await client.fetch(homeQuery(transformLocale(lang)))
  const text = lang === "en" ? "The Butcheress_ | A blog about food, recipes and travel" : "The Butcheress_ | Ein Blog über Nahrung, Rezepte und Reisen"

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: text,
    description: `${data.introduction.content.content}`,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
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
