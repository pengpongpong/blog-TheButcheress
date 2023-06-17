import { defineField, defineType } from "sanity";
import { isUniqueAcrossAllDocuments } from "../components/isUniqueSlug";


export default defineType({
    name: "navigation",
    title: "Navigation",
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
            name: "slug",
            title: "Url",
            type: "slug",
            options: {
                source: "titleDE",
            },
        }),
        defineField({
            name: "order",
            title: "Reihenfolge",
            type: "number",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "submenus",
            title: "Submenus",
            type: "array",
            of: [
                defineField({
                    name: "submenu",
                    title: "Submenu",
                    type: "reference",
                    to: { type: "navigationSubmenu" }
                }),
                defineField({
                    name: "link",
                    title: "Link",
                    type: "reference",
                    to: { type: "link" }
                }),
            ]
        }),
    ]
})