"use client"
import React from 'react'
import Link from "next/link";
import Image from "next/image";

import PrinterIcon from "public/icons/share/bx-printer.svg"
import MailIcon from "public/icons/share/bx-envelope.svg"
import FacebookIcon from "public/icons/share/bxl-facebook.svg"
import TwitterIcon from "public/icons/share/bxl-twitter.svg"
import WhatsappIcon from "public/icons/share/bxl-whatsapp.svg"
import TelegramIcon from "public/icons/share/bxl-telegram.svg"
import { Locale } from "@/app/[lang]/HomePage";
import { usePathname } from "next/navigation";

interface SocialShareProps {
    lang: Locale
    title: string;
    blog?: boolean
    styles: {
        main: string;
        first?: string;
        second?: string;
        last?: string;
        iconSize?: number;
    };
}

interface SocialShareLinkProps {
    url: string;
    title: string;
    alt: string;
    dataAction?: string;
    style?: string;
    imageIcon: any;
    width?: number;
    height?: number
}

const SocialShareLink = ({ url, title, alt, dataAction, style, width = 24, height = 24, imageIcon }: SocialShareLinkProps) => {
    return (
        <li className={style}>
            <Link href={url} target="_blank" title={title} data-action={dataAction}>
                <Image src={imageIcon} alt={alt} width={width} height={height} />
            </Link>
        </li>
    )
}

const SocialShare = ({ lang, title, blog, styles = { main: "", first: "", second: "", last: "", iconSize: 24 } }: SocialShareProps) => {
    const pathname = usePathname()
    const url = `https://www.butcheress.me${pathname}`
    const textRecipe = lang === "en" ? "Check%20out%20this%20delicious%20recipe%21" : "Probiere%20dieses%20köstliche%20Rezept%20aus%21"
    const textBlog = lang === "en" ? "Check%20out%20this%20great%20blog%20post%21" : "Schau%20dir%20diesen%20tollen%20Blog%20Beitrag%20an%21"

    const text = blog ? textBlog : textRecipe
    return (
        <ul className={styles.main}>
            {!blog ? <SocialShareLink
                url={"/rezepte/pancake/pdf"}
                title={lang === "en" ? "Print it" : "Drucke es aus"}
                alt={"Share PDF"}
                imageIcon={PrinterIcon}
                width={styles.iconSize}
                height={styles.iconSize}
            /> : ""}
            <SocialShareLink
                url={`mailto:?subject=${title}&body=${text} ${url}`}
                title={lang === "en" ? "Mail it" : "Per Email teilen"}
                alt={"Share by email"}
                imageIcon={MailIcon}
                style={styles.first}
                width={styles.iconSize}
                height={styles.iconSize}
            />
            <SocialShareLink
                url={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                title={lang === "en" ? "Share on Facebook" : "Auf Facebook teilen"}
                alt={"Share on Facebook"}
                style={styles.second}
                imageIcon={FacebookIcon}
                width={styles.iconSize}
                height={styles.iconSize}
            />
            <SocialShareLink
                url={`https://twitter.com/intent/tweet?text=${text} ${url}`}
                title={lang === "en" ? "Share on Twitter" : "Auf Twitter teilen"}
                alt={"Share on Twitter"}
                imageIcon={TwitterIcon}
                style={styles.first}
                width={styles.iconSize}
                height={styles.iconSize}
            />
            <SocialShareLink
                url={`https://api.whatsapp.com/send?text=${text} ${url}`}
                title={lang === "en" ? "Share on Whatsapp" : "Auf Whatsapp teilen"}
                dataAction={"share/whatsapp/share"}
                alt={"Share on Whatsapp"}
                style={styles.second}
                imageIcon={WhatsappIcon}
                width={styles.iconSize}
                height={styles.iconSize}
            />
            <SocialShareLink
                url={`https://t.me/share/url?url=${url}&text=${text}`}
                title={lang === "en" ? "Share on Telegram" : "Auf Telegram teilen"}
                alt={"Share on Telegram"}
                imageIcon={TelegramIcon}
                style={styles.last}
                width={styles.iconSize}
                height={styles.iconSize}
            />
        </ul>
    )
}

export default SocialShare