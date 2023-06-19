import { ReactNode, lazy } from "react";
import { Locale } from "../HomePage";
import Navbar from "@/components/navbar/Navbar";
import { client } from "@/sanity/lib/sanity-utils";
import { navQuery } from "@/sanity/lib/sanity-query";
import { transformLocale } from "@/components/utils/utils";

const Footer = lazy(() => import("@/components/footer/Footer"))

const RecipeLayout = async ({ children, params }: { children: ReactNode, params: { lang: Locale } }) => {
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