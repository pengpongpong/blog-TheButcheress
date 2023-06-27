import React from 'react'
import { Headline, Text } from "../datenschutz/page"
import Link from "next/link"

const ImpressumPage = () => {
    return (
        <>
            <header>
                <h1 className="my-4 lg:mb-16 lg:mt-12 text-6xl lg:text-8xl text-center font-text">Impressum</h1>
            </header>
            <main className="mx-8 lg:mx-auto mb-8 lg:mb-16 lg:max-w-screen-xl lg:w-2/5 font-text">
                <Headline title="The Butcheress_">
                    <Text text="Geschäftsführerin: Someone Bla" />
                    <Text text="Fantasy Street 10" />
                    <Text text="1234 Fantasy" />
                    <Link href="">somelink@thebutcheress.me</Link><br />
                    <Text text="UID: AT123456" />
                </Headline>
                <Headline title="Bankverbindung:">
                    <Text text="Empfänger: The Butcheress_" />
                    <Text text="BIC: RSTAT12345" />
                    <Text text="IBAN: AT123456678" />
                    <Text text="Raiffeisenbank Graz" />
                </Headline>
                <Headline title="Konzept & Design:">
                    <Text text="The Butcheress_" />
                </Headline>
                <Headline title="Bildernachweis:">
                    <Text text="Creator: Someone" />
                </Headline>
                <Headline title="Technische Umsetzung:">
                    <Text text="Web developer" />
                </Headline>
            </main>
        </>

    )
}

export default ImpressumPage