"use client"
import React, { ReactNode } from 'react'
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { PortableTextBlock } from "sanity"

import { HighlightDecorator, LinkDecorator } from "@/sanity/decorators/decorators"
import { urlFor } from "@/sanity/lib/sanity-utils"

import { toHTML } from '@portabletext/to-html'

const portableComponents = {
    types: {
        image: ({ value }: { value: any }) => <Image className="my-12" style={{ width: "auto", height: "auto" }} width={900} height={600} loading="lazy" src={urlFor(value).size(2560, 1440).auto("format").url()} alt={""} />
    },
    block: {
        h2: ({ children }: { children?: ReactNode }) => <h2 className="my-12 text-5xl lg:text-7xl text-center">{children}</h2>,
        h3: ({ children }: { children?: ReactNode }) => <h3 className="my-12 text-4xl lg:text-5xl">{children}</h3>,
        h4: ({ children }: { children?: ReactNode }) => <h4 className="mt-12 mb-4 text-3xl lg:text-3xl">{children}</h4>,
        h5: ({ children }: { children?: ReactNode }) => <h5 className="my-8 text-2xl">{children}</h5>,
        normal: ({ children }: { children?: ReactNode }) => <p className="my-6 text-xl">{children}</p>,
        blockquote: ({ children }: { children?: ReactNode }) => <blockquote className="p-12 m-4 lg:m-8 my-8 lg:my-12 bg-no-repeat bg-[url('/icons/studio/bxs-quote-left.svg')] text-xl">{children}</blockquote>,
    },
    marks: {
        highlight: HighlightDecorator,
        link: LinkDecorator,
        recipeLink: LinkDecorator,
    },
    list: {
        bullet: ({ children }: { children?: ReactNode }) => <ul className="my-8 mx-6 list-disc text-xl">{children}</ul>,
        number: ({ children }: { children?: ReactNode }) => <ol className="my-8 mx-6 list-decimal text-xl">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: { children?: ReactNode }) => <li className="my-2" > {children}</ li>,
        number: ({ children }: { children?: ReactNode }) => <li className="my-2">{children}</li>,
    },
}

const Blog = ({ body }: { body: PortableTextBlock }) => {

    const htmlData = toHTML(body, {
        components: {},
    })

    const onSubmit = () => {
        fetch("/de/dashboard/api", { method: "POST", body: JSON.stringify(htmlData) })
    }

    return (
        <article className="max-w-3xl mx-auto font-text">
            <button onClick={onSubmit}>call email</button>
            <PortableText
                value={body}
                components={portableComponents}
            />
        </article>
    )
}

export default Blog