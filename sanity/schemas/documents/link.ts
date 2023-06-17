import { defineField, defineType } from "sanity";
import { isUniqueAcrossAllDocuments } from "../components/isUniqueSlug";

export default defineType({
    name: "link",
    title: "Link",
    type: "document",
    fields: [
        defineField({
            name: "titleDE",
            title: "Titel DE",
            type: "string",
        }),
        defineField({
            name: "titleEN",
            title: "Titel EN",
            type: "string"
        }),
        defineField({
            name: "slug",
            title: "Url",
            type: "slug",
            options: {
                source: "titleDE",
                isUnique: isUniqueAcrossAllDocuments
            },
        }),
    ]
})