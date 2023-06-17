import { defineField, defineType } from "sanity";

export default defineType({
    name: "blogPage",
    title: "Blog Page",
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
                    { title: "Blog", value: "blog" },
                    { title: "Reisen", value: "travel" },
                ]
            }
        }),
    ]
})