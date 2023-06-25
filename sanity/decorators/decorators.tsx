"use client"
import Link from "next/link";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { client } from "../lib/sanity-utils";
import { groq } from "next-sanity";

type DecoratorProps = {
  children: ReactNode;
};

export const getHref = async (id: string) => {
  return await client.fetch(groq`*[_id == $id][0]{"url": slug.current}`, { id: id })
}

//!fix any
export const LinkInternBlogDecorator: FunctionComponent<any> = ({ children, value }: any) => {
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    if ("recipe" in value) {
      getHref(value.recipe._ref).then(res => setUrl(`/rezepte/${res.url}`))
    } else if ("tags" in value) {
      getHref(value.tags._ref).then(res => setUrl(`/kategorie/${res.url}`))
    }
  }, [value])

  return <Link className="underline" target="_blank" href={`${url}` ?? ""}>{children}</Link>
}

export const LinkExternBlogDecorator: FunctionComponent<any> = ({ children, value }: any) => {
  return <Link className="underline" rel="noopener noreferrer" target="_blank" href={`${value?.href}` ?? ""}>{children}</Link>
}
