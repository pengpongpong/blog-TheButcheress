"use client"
import Link from "next/link";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { client } from "../lib/sanity-utils";
import { groq } from "next-sanity";

type DecoratorProps = {
  children: ReactNode;
};

export const HighlightDecorator: FunctionComponent<DecoratorProps> = ({
  children,
}) => <span className="bg-primary font-text text-xl rounded-xl">{children}</span>;

const getHref = async (id: string) => {
  return await client.fetch(groq`*[_id == $id][0]{"url": slug.current}`, { id: id })
}

//!fix any
export const LinkDecorator: FunctionComponent<any> = ({ children, value }: any) => {
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    if ("recipe" in value) {
      getHref(value.recipe._ref).then(res => setUrl(`/rezepte/${res.url}`))
    } else if ("tags" in value) {
      getHref(value.tags._ref).then(res => setUrl(`/rezepte/${res.url}`))
    } else if ("href" in value && (url !== value?.href)) {
      setUrl(value?.href)
    }
  }, [])



  return <Link className="underline" href={`${url}` ?? ""}>{children}</Link>
}