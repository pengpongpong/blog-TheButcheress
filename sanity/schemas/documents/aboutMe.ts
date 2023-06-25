import { defineType, defineField } from "sanity";

export default defineType({
    name: "aboutMe",
    title: "Über mich",
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
            name: "subTitleDE",
            title: "Sub Titel DE",
            type: "string"
        }),
        defineField({
            name: "subTitleEN",
            title: "Sub Titel EN",
            type: "string"
        }),
        defineField({
            name: "image",
            title: "Bild",
            type: "image",
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: "textDE",
            title: "Text DE",
            type: "text"
        }),
        defineField({
            name: "textEN",
            title: "Text EN",
            type: "text"
        }),
    ]
})