import { transformLocale } from "@/components/utils/utils"
import { navQuery } from "@/sanity/lib/sanity-query"
import { client } from "@/sanity/lib/sanity-utils"
import { ReactNode } from "react"
import { Locale } from "../HomePage"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const RecipeLayout = async ({ children, params }: { children: ReactNode, params: {lang: Locale} }) => {
    const navData = await client.fetch(navQuery(transformLocale(params.lang)))

    return (
        <>
            <Navbar navData={navData} lang={params.lang} />
            {children}
            <Footer lang={params.lang} />
        </>
    )
}

export default RecipeLayout