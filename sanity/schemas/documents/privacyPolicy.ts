import { defineType, defineField } from "sanity";

export default defineType({
    name: "privacyPolicy",
    title: "Datenschutz",
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
            name: "content",
            title: "Content",
            type: "array",
            of: [
                { type: "privacyPolicyContent" }
            ]
        })
    ]
})