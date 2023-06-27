import Navbar from "@/components/navbar/Navbar"
import { ReactNode, lazy } from "react"
import { Locale } from "../HomePage"
import { client } from "@/sanity/lib/sanity-utils"
import { transformLocale } from "@/components/utils/utils"
import { navQuery } from "@/sanity/lib/sanity-query"

const Footer = lazy(() => import("@/components/footer/Footer"))

const DataPrivacyLayout = async ({ children, params }: { children: ReactNode, params: { lang: Locale } }) => {
    const navData = await client.fetch(navQuery(transformLocale(params.lang)))

    return (
        <>
            <Navbar navData={navData} lang={params.lang} />
            {children}
            <Footer lang={params.lang} />
        </>
    )
}

export default DataPrivacyLayout