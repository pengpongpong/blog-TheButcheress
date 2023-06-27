import React from 'react'
import Navbar from "./Navbar"
import { usePreview } from "@/sanity/lib/sanity-preview"
import { Locale } from "@/app/[lang]/(main-nav)/HomePage"

const NavbarPreview = ({ navQuery, lang }: { navQuery: string, lang: Locale }) => {
    const data = usePreview(null, navQuery)

    return <Navbar navData={data} lang={lang} />
}

export default NavbarPreview