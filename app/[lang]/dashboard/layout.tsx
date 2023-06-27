import Navbar from "@/components/navbar/Navbar"
import { ReactNode } from "react"
import { Locale } from "../HomePage"
import { client } from "@/sanity/lib/sanity-utils"
import { transformLocale } from "@/components/utils/utils"
import { navQuery } from "@/sanity/lib/sanity-query"
import Provider from "@/components/provider/Provider"

const ContactLayout = async ({ children, params }: { children: ReactNode, params: { lang: Locale } }) => {
    const navData = await client.fetch(navQuery(transformLocale(params.lang)))

    return (
        <>
            <Navbar navData={navData} lang={params.lang} />
            <Provider>
                {children}
            </Provider>
        </>
    )
}

export default ContactLayout