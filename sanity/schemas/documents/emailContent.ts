import { defineType, defineField } from "sanity";
import { isUniqueAcrossAllDocuments } from "../components/isUniqueSlug";

export default defineType({
    name: "emailContent",
    title: "Email",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titel",
            type: "string"
        }),
        defineField({
            name: "slug",
            title: "Url",
            type: "slug",
            options: {
                source: "title",
                isUnique: isUniqueAcrossAllDocuments
            }
        }),
        defineField({
            name: "image",
            type: "image",
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: "body",
            title: "Block Editor Email",
            type: "blockContentEmail"
        })
    ]
})