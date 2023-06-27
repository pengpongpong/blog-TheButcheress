"use client"
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { PortableTextBlock } from "sanity"
import Image from "next/image"

import { urlFor } from "@/sanity/lib/sanity-utils"

import htm from 'htm'
import vhtml from 'vhtml'

import { toHTML } from '@portabletext/to-html'
import { SanityImageAssetDocument } from "@sanity/client";
import { LinkExternBlogDecorator, LinkInternBlogDecorator, getHref } from "@/sanity/decorators/decorators"
import { PortableText } from "@portabletext/react"
import { checkEmail } from "../footer/Newsletter"
import Loading from "../loading/Loading"

interface LinkInterface {
    tags?: { _ref: string, _type: 'reference' },
    recipe?: { _ref: string, _type: 'reference' },
    href?: string,
    _type: 'recipeLink',
    _key: string
}

interface Emails {
    _id: string;
    email: string;
    active: "active";
    _v: number
}

// components for live view
const portableComponents = {
    types: {
        image: ({ value }: { value: any }) => <Image width={750} height={500} loading="lazy" src={urlFor(value).size(750, 500).auto("format").url()} alt={""} />
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
    list: {
        bullet: ({ children }: { children?: ReactNode }) => <ul className="bulletList" >{children}</ul>,
        number: ({ children }: { children?: ReactNode }) => <ol className="numberList" >{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: { children?: ReactNode }) => <li className="bulletItem" >{children}</li>,
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
    const [emails, setEmails] = useState<Array<Emails>>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)

    // Email Content
    const htmlData = toHTML(body, {
        components: {
            types: {
                image: (value: { value: SanityImageAssetDocument }) => html`<img src="${urlFor(value.value).size(600, 400).auto("format").url()}" alt="" />` as string,
            },
            block: {
                h1: (value) => "<h1 class='h1'>".concat(value.children!, "</h1>"),
                h2: (value) => "<h2 class='h2'>".concat(value.children!, "</h2>"),
                h3: (value) => "<h3 class='h3'>".concat(value.children!, "</h3>"),
                h4: (value) => "<h4 class='h4'>".concat(value.children!, "</h4>"),
                normal: (value) => "<p class='text'>".concat(value.children!, "</p>"),
                blockquote: (value) => "<blockquote class='quote'>".concat(value.children!, "</blockquote>"),
                noParent: (value) => html`${value.children}` as string,
            },
            marks: {
                link: ({ value, text }) => LinkExternEmailDecorator(value, text),
                recipeLink: ({ value, text }) => LinkInternEmailDecorator(value, text),
                strong: ({ children }) => html`<span class="strong">${children}</span>` as string,
                em: ({ text }) => html`<span class="em">${text}</span>` as string,
                underline: ({ text }) => html`<span class="underline">${text}</span>` as string,
                "strike-through": ({ text }) => html`<span class="strike">${text}</span>` as string,
            },
            list: {
                bullet: (value) => "<ul class='bulletList'>".concat(value.children!, "</ul>"),
                number: (value) => "<ol class='numberList'>".concat(value.children!, "</ol>"),

            },
            listItem: {
                bullet: ({ children }) => html`<li class="bulletItem">${children}</li>` as string,
                number: ({ children }) => html`<li class="numberItem">${children}</li>` as string,
            },
            hardBreak: false
        },
    })

    // styles for html
    const style = `
    <style>
        html {
            background-color: #FBF7F0;
            font-family: Josefin Slab;
            white-space: pre-line;
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
        .strong {
            font-weight: bold;
        }
        .em {
            font-style: italic;
        }
        .strike {
            text-decoration: line-through;
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
        .bulletList {
            list-style-type: circle;
            list-style-position: inside;
            font-size: 1.5rem;
        }
        .numberList {
            list-style-type: upper-roman;
            list-style-position: inside;
            font-size: 1.5rem;
        }
        .underline {
            text-decoration: underline
        }
        img {
            margin: 2rem 0;
        }
        .footer {
            font-size: 1rem;
            text-align: center;
        }
    </style>
    `

    // send email and submit data to API
    const onSubmit = () => {
        const email = inputRef?.current?.value ?? ""
        if (!emails && !email) return setError("No email found!") // if no email or input email then return error
        if (email && !checkEmail.test(email!)) return setError("Invalid email!") // if wrong email format then return error

        const data = {
            subject: title,
            emails: emails ?? [{ email: inputRef?.current?.value }],
            body: htmlData,
            style: style
            // attachments: attachments,
        }

        setLoading(true)
        fetch("/de/dashboard/api", { method: "POST", body: JSON.stringify(data) })
            .then(res => res.json())
            .then(response => {
                setError("")
                setMessage(response.message)
                setLoading(false)
            })
    }


    // get recipients
    const getEmails = () => {
        setLoading(true)
        fetch("/de/dashboard/api", { method: "GET" })
            .then(res => res.json())
            .then(response => {
                if (response.message === "Error") {
                    setError(response.error)
                    setLoading(false)
                } else {
                    setEmails(response.emails)
                    setLoading(false)
                }
            })
    }


    return (
        <main className="max-w-4xl mx-auto flex flex-col gap-4 justify-center items-center font-text">
            <input type="text" className="input input-bordered w-2/5" placeholder="Enter email" ref={inputRef} />
            <div className="mb-4 flex gap-4">
                <button className="btn btn-primary" onClick={getEmails}>Emails holen</button>
                <button className="btn btn-primary" onClick={onSubmit}>Email senden</button>
            </div>
            {loading ? <Loading /> : ""}
            {message ? <span className="m-4 font-bold">{message}</span> : ""}
            {error ? <span className="m-4 font-bold text-error">{error}</span> : ""}
            {emails ? <span className="m-4 font-bold text-info">Email-Count: {emails.length}</span> : ""}
            <div dangerouslySetInnerHTML={{ __html: style }}></div>
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

