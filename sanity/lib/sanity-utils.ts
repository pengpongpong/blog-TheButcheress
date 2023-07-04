import { createClient } from '@sanity/client'
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Lang, navQuery } from "./sanity-query";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export const client = createClient({
    projectId: `${projectId}`,
    dataset: `${dataset}`,
    apiVersion: `${apiVersion}`,
    useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => {
    return builder.image(source);
}

//get data @navbar
export const getNavData = async (lang: Lang) => {
    return await client.fetch(navQuery(lang))
}
