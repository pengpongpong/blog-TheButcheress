import { defineType, defineField } from "sanity";
import { isUniqueAcrossAllDocuments } from "../components/isUniqueSlug";

export default defineType({
    name: "blog",
    title: "Blog",
    type: "document",
    fields: [
        defineField({
            name: "titleDE",
            title: "Titel DE",
            type: "string"
        }),
        defineField({
            name: "titleEN",
            title: "Titel EN",
            type: "string"
        }),
        defineField({
            name: "category",
            title: "Kategorie",
            type: "string",
            options: {
                list: [
                    {title: "Blog", value: "blog"},
                    {title: "Reisen", value: "travel"},
                ]
            }
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: [
                { type: "author" }
            ]
        }),
        defineField({
            name: "slug",
            title: "Url",
            type: "slug",
            options: {
                source: "titleDE",
                isUnique: isUniqueAcrossAllDocuments
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Beschreibung",
            type: "object",
            fields: [
                defineField({
                    name: "descriptionDE",
                    title: "Beschreibung DE",
                    type: "text"
                }),
                defineField({
                    name: "descriptionEN",
                    title: "Beschreibung EN",
                    type: "text"
                }),
            ]
        }),
        defineField({
            name: "image",
            title: "Bild",
            type: "image",
            options: {
                hotspot: true
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
                { type: "reference", to: { type: "tags" } }
            ]
        }),
        defineField({
            name: "publishedAt",
            title: "Veröffentlich am",
            type: "datetime",
        }),
        defineField({
            name: "bodyDE",
            title: "Block Editor DE",
            type: "blockContent",
        }),
        defineField({
            name: "bodyEN",
            title: "Block Editor EN",
            type: "blockContent",
        }),
    ],

    preview: {
        select: {
            title: "titleDE",
            author: "author.name",
            media: "image"
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        }
    }
})