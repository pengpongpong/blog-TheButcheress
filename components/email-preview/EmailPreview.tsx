"use client"
import React from 'react'
import { PortableText } from "@portabletext/react"
import { PortableTextBlock } from "sanity"

import { HighlightDecorator, LinkDecorator } from "@/sanity/decorators/decorators"
import { urlFor } from "@/sanity/lib/sanity-utils"

import htm from 'htm'
import vhtml from 'vhtml'

import { toHTML } from '@portabletext/to-html'
import { SanityImageAssetDocument } from "@sanity/client";

const html = htm.bind(vhtml)



const EmailPreview = ({ body }: { body: PortableTextBlock[] }) => {
    const htmlData = toHTML(body, {
        components: {
            types: {
                image: (value: { value: SanityImageAssetDocument }): any => html`<img src="cid:${urlFor(value.value).size(400, 300).auto("format").url()}" alt="" />`
            }
        },
    })

    const images = body.filter((obj: PortableTextBlock) => obj._type === "image")

    interface Attachments {
        filename: string;
        path: string;
        cid: string
    }

    const attachments: Attachments[] = images.map(obj => {
        const url = urlFor(obj).size(400, 300).auto("format").url()
        return {
            filename: "image.jpg",
            path: url,
            cid: url
        }
    })

    const data = {
        body: htmlData,
        attachments: attachments
    }
    const onSubmit = () => {
        fetch("/de/dashboard/api", { method: "POST", body: JSON.stringify(data) })
    }

    return (
        <article className="max-w-3xl mx-auto font-text">
            <button onClick={onSubmit}>call email</button>
            {/* <PortableText
                value={body}
                components={portableComponents}
            /> */}
        </article>
    )
}

export default EmailPreview

