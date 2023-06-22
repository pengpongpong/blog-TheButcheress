import Navbar from "@/components/navbar/Navbar"
import { ReactNode, lazy } from "react"
import { Locale } from "../HomePage"
import { client } from "@/sanity/lib/sanity-utils"
import { transformLocale } from "@/components/utils/utils"
import { navQuery } from "@/sanity/lib/sanity-query"
import Provider from "@/components/provider/Provider"

const Footer = lazy(() => import("@/components/footer/Footer"))

const ContactLayout = async ({ children, params }: { children: ReactNode, params: { lang: Locale } }) => {
    const navData = await client.fetch(navQuery(transformLocale(params.lang)))

    return (
        <>
            <Provider>
                <Navbar navData={navData} lang={params.lang} />
                {children}
                {/* <Footer lang={params.lang} /> */}
            </Provider>
        </>
    )
}

export default ContactLayout