import { client } from "@/sanity/lib/sanity-utils"
import Home, { Locale } from "./HomePage"
import { Metadata, ResolvingMetadata } from 'next'
import { homeQuery } from "@/sanity/lib/sanity-query"
import { transformLocale } from "@/components/utils/utils"
import { draftMode } from "next/headers"
import HomePreview from "./HomePreview"
import Preview from "@/components/preview/Preview"

export interface ParamsProps {
  params: {
    lang: Locale,
    slug?: string
  },
}

export interface MetaDataProps extends ParamsProps {}

//!fix meta tag image
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

export default async function HomePage({ params: { lang } }: ParamsProps) {
  const { isEnabled } = draftMode()
  const pageQuery = homeQuery(transformLocale(lang))
  const data = !isEnabled ? await client.fetch(pageQuery) : ""

  return isEnabled ? (
    <>
      <Preview>
        <HomePreview pageQuery={pageQuery} lang={lang} />
      </Preview>
    </>
  ) :
    <>
      <Home pageData={data} lang={lang} />
    </>
}
