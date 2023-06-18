import { client } from "@/sanity/lib/sanity-utils"
import Home from "./HomePage"
import { Metadata, ResolvingMetadata } from 'next'
import { Lang, homeQuery } from "@/sanity/lib/sanity-query"
import { transformLocale } from "@/components/utils/utils"
import { draftMode } from "next/headers"
import HomePreview from "./HomePreview"
import Preview from "@/components/preview/Preview"

const getData = async (lang: Lang) => {
  const pageQuery = homeQuery(lang)

  return await client.fetch(pageQuery)
}

interface HomePageProps {
  params: {
    lang: string
  },
}

type MetaDataProps = {
  params: { lang: string }
}

//!fix meta tag image
export async function generateMetadata(
  { params }: MetaDataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang } = params
  const data = await getData(lang.toUpperCase() as Lang)
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


export default async function HomePage({ params: { lang } }: HomePageProps) {
  const { isEnabled } = draftMode()
  const locale: "DE" | "EN" = transformLocale(lang)
  const pageQuery = homeQuery(locale)
  const data = !isEnabled ? await client.fetch(pageQuery) : ""

  return isEnabled ? (
    <>
      <Preview>
        <HomePreview pageQuery={pageQuery} lang={locale} />
      </Preview>
    </>
  ) :
    <>
      <Home pageData={data} lang={locale} />
    </>
}
