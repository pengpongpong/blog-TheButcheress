"use client"
import React, { useEffect, useState } from 'react'
import { PortableTextBlock } from "sanity"

import { urlFor } from "@/sanity/lib/sanity-utils"

import htm from 'htm'
import vhtml from 'vhtml'

import { toHTML } from '@portabletext/to-html'
import { SanityImageAssetDocument } from "@sanity/client";
import { getHref } from "@/sanity/decorators/decorators"

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

//set html strings from block content
const html = htm.bind(vhtml)

//marks decorator
const LinkInternEmailDecorator = (value: LinkInterface, text: string) => {
    const [url, setUrl] = useState<string>("")
    const domain = "https://butcheress.me"

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
    //Email Content
    const htmlData = toHTML(body, {
        components: {
            types: {
                image: (value: { value: SanityImageAssetDocument }) => html`<img src="cid:${urlFor(value.value).size(400, 300).auto("format").url()}" alt="" />` as string,
            },
            block: {
                h1: (value) => html`<h1 class="h1">${value.children}</h1>` as string,
                h2: (value) => html`<h2 class="h2">${value.children}</h2>` as string,
                h3: (value) => html`<h3 class="h3">${value.children}</h3>` as string,
                h4: (value) => html`<h4 class="h4">${value.children}</h4>` as string,
                normal: (value) => html`<p class="text">${value.children}</p>` as string,
                blockquote: (value) => html`<blockquote class="quote">${value.children}</blockquote>` as string,
                "noParent": (value) => html`${value.children}` as string,
            },
            marks: {
                link: ({ value, text }) => LinkExternEmailDecorator(value, text),
                recipeLink: ({ value, text }) => LinkInternEmailDecorator(value, text),
                strong: ({ text }) => html`<strong>${text}</strong>` as string,
                em: ({ text }) => html`<em>${text}</em>` as string,
                underline: ({ text }) => html`<span class="underline">${text}</span>` as string,
                "strike-through": ({ text }) => html`<strike>${text}</strike>` as string,
            },
            listItem: {
                bullet: ({ children }) => html`<li class="bulletItem">${children}</li>` as string,
                number: ({ children }) => html`<li class="numberItem">${children}</li>` as string,
            }
        },
    })

    //Preview
    const htmlDataPreview = toHTML(body, {
        components: {
            types: {
                image: (value: { value: SanityImageAssetDocument }) => html`<img src="${urlFor(value.value).size(400, 300).auto("format").url()}" alt="" />` as string,
            },
            block: {
                h1: (value) => html`<h1 class="h1">${value.children}</h1>` as string,
                h2: (value) => html`<h2 class="h2">${value.children}</h2>` as string,
                h3: (value) => html`<h3 class="h3">${value.children}</h3>` as string,
                h4: (value) => html`<h4 class="h4">${value.children}</h4>` as string,
                normal: (value) => html`<p class="text">${value.children}</p>` as string,
                blockquote: (value) => html`<blockquote class="quote">${value.children}</blockquote>` as string,
                "noParent": (value) => html`${value.children}` as string,
            },
            marks: {
                link: ({ value, text }) => LinkExternEmailDecorator(value, text),
                recipeLink: ({ value, text }) => LinkInternEmailDecorator(value, text),
                strong: ({ text }) => html`<strong>${text}</strong>` as string,
                em: ({ text }) => html`<em>${text}</em>` as string,
                underline: ({ text }) => html`<span class="underline">${text}</span>` as string,
                "strike-through": ({ text }) => html`<strike>${text}</strike>` as string,
            },
            listItem: {
                bullet: ({ children }) => html`<li class="bulletItem">${children}</li>` as string,
                number: ({ children }) => html`<li class="numberItem">${children}</li>` as string,
            }
        },
    })

    //get images for email attachment
    const images = body.filter((obj: PortableTextBlock) => obj._type === "image")

    //format structure for node-mailer
    const attachments: Attachments[] = images.map(obj => {
        const url = urlFor(obj).size(400, 300).auto("format").url()
        return {
            filename: "image.jpg",
            path: url,
            cid: url
        }
    })

    //styles intern for request
    const style = `
    <style>
        .h1 {
            font-size: 8rem;
            font-family: Sacramento;
            color: red;
        }
        .h2 {
            font-size: 6rem;
            font-family: Josefin Slab;
        }
        .h3 {
            font-size: 4rem;
            font-family: Baskerville;
        }
        .h4 {
            font-size: 2rem;
            font-family: Baskerville;
        }
        .text {
            font-size: 1rem;
            font-family: Courier;
        }
        .quote {
            font-style: italic;
        }
        .anchor {
            font-style: italic;
        }
        ul {
            list-style-type: circle;
            font-style: italic;
        }
        .bulletItem {
            color: steelblue;
        }
        ol {
            font-style: italic;
            list-style-type: upper-roman;
        }
        .numberItem {
            color: red;
        }
        .underline {
            text-decoration: underline
        }
    </style>
    `

    //send emails
    const onSubmit = () => {
        const data = {
            subject: title,
            body: htmlData,
            attachments: attachments,
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
            <article className="bg-white p-12" dangerouslySetInnerHTML={{ __html: htmlDataPreview + style }}></article>
        </main >
    )
}

export default EmailPreview

