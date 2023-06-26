"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { PortableTextBlock, PortableTextInput } from "sanity"
import Image from "next/image"

import { urlFor } from "@/sanity/lib/sanity-utils"

import htm from 'htm'
import vhtml from 'vhtml'

import { toHTML } from '@portabletext/to-html'
import { SanityImageAssetDocument } from "@sanity/client";
import { LinkExternBlogDecorator, LinkInternBlogDecorator, getHref } from "@/sanity/decorators/decorators"
import { PortableText } from "@portabletext/react"

interface Attachments {
    filename: string;
    path: string;
    cid: string
}
interface LinkInterface {
    tags?: { _ref: string, _type: 'reference' },
    recipe?: { _ref: string, _type: 'reference' },
    href?: string,
    _type: 'recipeLink',
    _key: string
}

// components for live view
const portableComponents = {
    types: {
        image: ({ value }: { value: any }) => <Image style={{ width: "auto", height: "auto" }} width={600} height={400} loading="lazy" src={urlFor(value).size(600, 400).auto("format").url()} alt={""} />
    },
    block: {
        h1: ({ children }: { children?: ReactNode }) => <h2 className="h1">{children}</h2>,
        h2: ({ children }: { children?: ReactNode }) => <h3 className="h2">{children}</h3>,
        h3: ({ children }: { children?: ReactNode }) => <h4 className="h3">{children}</h4>,
        h4: ({ children }: { children?: ReactNode }) => <h5 className="h4">{children}</h5>,
        normal: ({ children }: { children?: ReactNode }) => <p className="text">{children}</p>,
        blockquote: ({ children }: { children?: ReactNode }) => <blockquote className="quote">
            {children}
        </blockquote>,
        linebreak: () => <br />,
        "noParent": ({ children }: { children?: ReactNode }) => <>{children}</>,
    },
    marks: {
        link: LinkExternBlogDecorator,
        recipeLink: LinkInternBlogDecorator,
        strong: ({ children }: { children?: ReactNode }) => <span className="strong">{children}</span>,
        em: ({ children }: { children?: ReactNode }) => <span className="em">{children}</span>,
        underline: ({ children }: { children?: ReactNode }) => <span className="underline">{children}</span>,
        "strike-through": ({ children }: { children?: ReactNode }) => <span className="strike">{children}</span>,
    },
    listItem: {
        bullet: ({ children }: { children?: ReactNode }) => <li className="bulletItem" > {children}</ li>,
        number: ({ children }: { children?: ReactNode }) => <li className="numberItem">{children}</li>,
    },
}

//set html strings from block content
const html = htm.bind(vhtml)

//marks decorator
const LinkInternEmailDecorator = (value: LinkInterface, text: string) => {
    const [url, setUrl] = useState<string>("")
    const domain = process.env.NEXT_PUBLIC_DOMAIN

    //check if recipes or tags
    useEffect(() => {
        if ("recipe" in value) {
            getHref(value.recipe!._ref).then(res => setUrl(`/rezepte/${res.url}`))
        } else if ("tags" in value) {
            getHref(value.tags!._ref).then(res => setUrl(`/kategorie/${res.url}`))
        }
    }, [value])

    return (
        html`<a class="anchor" href="${domain + url}" rel="noopener noreferrer" target="_blank">${text}</a>` as string
    )
}

const LinkExternEmailDecorator = (value: LinkInterface, text: string) => {
    return (
        html`<a class="anchor" href="${value.href || ''}" rel="noopener noreferrer" target="_blank">${text}</a>` as string
    )
}

const EmailPreview = ({ body, title }: { body: PortableTextBlock[], title: string }) => {
    const [message, setMessage] = useState<string>("")

    // Email Content
    const htmlData = toHTML(body, {
        components: {
            types: {
                image: (value: { value: SanityImageAssetDocument }) => html`<img src="${urlFor(value.value).size(600, 400).auto("format").url()}" alt="" />` as string,
            },
            block: {
                h1: (value) => html`<h1 class="h1">${value.children}</h1>` as string,
                h2: (value) => html`<h2 class="h2">${value.children}</h2>` as string,
                h3: (value) => html`<h3 class="h3">${value.children}</h3>` as string,
                h4: (value) => html`<h4 class="h4">${value.children}</h4>` as string,
                normal: (value) => {
                    return "<p class=\"text\">".concat(value.children!, "</p>")
                },
                blockquote: (value) => html`<blockquote class="quote">${value.children}</blockquote>` as string,
                "noParent": (value) => html`${value.children}` as string,
            },
            marks: {
                link: ({ value, text }) => LinkExternEmailDecorator(value, text),
                recipeLink: ({ value, text }) => LinkInternEmailDecorator(value, text),
                strong: ({ children }) => html`<span class="strong">${children}</span>` as any,
                em: ({ text }) => html`<span class="em">${text}</span>` as string,
                underline: ({ text }) => html`<span class="underline">${text}</span>` as string,
                "strike-through": ({ text }) => html`<span class="strike">${text}</span>` as string,
            },
            listItem: {
                bullet: ({ children }) => html`<li class="bulletItem">${children}</li>` as string,
                number: ({ children }) => html`<li class="numberItem">${children}</li>` as string,
            },
            hardBreak: false
        },
    })

    // get images for email attachment
    // const images = body.filter((obj: PortableTextBlock) => obj._type === "image")

    // format structure for node-mailer
    // const attachments: Attachments[] = images.map(obj => {
    //     const url = urlFor(obj).size(400, 300).auto("format").url()
    //     return {
    //         filename: "image.jpg",
    //         path: url,
    //         cid: url
    //     }
    // })

    // styles for html
    const style = `
    <style>
        html {
            background-color: #FBF7F0;
            // white-space: pre-line;
            font-family: Josefin Slab;
        }
        .h1, .h2, .h3, .h4 {
            margin: 1.5rem 0;
        }
        .text, .quote, .ul, .ol {
            margin: 1rem 0;
        }
        .h1 {
            font-size: 8rem;
            font-family: Sacramento;
        }
        .h2 {
            font-size: 6rem;
        }
        .h3 {
            font-size: 4rem;
        }
        .h4 {
            font-size: 2rem;
        }
        .text {
            font-size: 1.5rem;
        }
        .quote {
            margin: 2rem;
            padding: 2rem;
            font-style: italic;
            font-size: 1.5rem;
            background-image: url("https://res.cloudinary.com/pengpengong/image/upload/v1687803415/TheButcheress_%20Blog/bxs-quote-left_e6gxs1.svg");
            background-repeat: no-repeat;
            background-position: top left;
            background-size: 1rem;
        }
        .anchor {
            font-style: italic;
            font-size: 1.5rem;
        }
        ul {
            list-style-type: circle;
            font-size: 1.5rem;
        }
        ol {
            list-style-type: upper-roman;
            font-size: 1.5rem;
        }
        .underline {
            text-decoration: underline
        }
        img {
            margin: 2rem 0;
        }
        span {
            font-size: 1.5rem;
        }
        .strong {
            font-weight: bold;
        }
        .em {
            font-style: italic;
        }
        .strike {
            text-decoration: line-through;
        }
    </style>
    `

    // send emails and submit data to API
    const onSubmit = () => {
        const data = {
            subject: title,
            body: htmlData,
            // attachments: attachments,
            style: style
        }

        fetch("/de/dashboard/api", { method: "POST", body: JSON.stringify(data) })
            .then(res => res.json())
            .then(response => setMessage(response.message))
    }

    return (
        <main className="max-w-4xl mx-auto flex flex-col justify-center items-center font-text">
            <button className="btn btn-primary mb-8" onClick={onSubmit}>Email senden</button>
            {message ? <span className="m-4 font-bold">{message}</span> : ""}
            <div dangerouslySetInnerHTML={{ __html: style }}></div>
            {/* <div dangerouslySetInnerHTML={{ __html: htmlData }}></div> */}
            <article className="w-[750px] border whitespace-pre-line" >
                <PortableText
                    value={body}
                    components={portableComponents}
                />
            </article>
        </main >
    )
}

export default EmailPreview

