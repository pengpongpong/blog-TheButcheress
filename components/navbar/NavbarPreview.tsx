import React from 'react'
import Navbar from "./Navbar"
import { usePreview } from "@/sanity/lib/sanity-preview"
import { Lang } from "@/sanity/lib/sanity-query"

const NavbarPreview = ({ navQuery, lang }: { navQuery: string, lang: Lang }) => {
    const data = usePreview(null, navQuery)

    return <Navbar navData={data} lang={lang} />
}

export default NavbarPreview