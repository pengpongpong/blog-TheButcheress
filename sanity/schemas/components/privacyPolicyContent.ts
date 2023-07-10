import { defineType, defineField } from "sanity";

export default defineType({
    name: "privacyPolicyContent",
    title: "Impressum Content",
    type: "object",
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
                defineField({
                    name: "textContent",
                    title: "Text",
                    type: "object",
                    fields: [
                        defineField({
                            name: "contentDE",
                            title: "Content DE",
                            type: "text"
                        }),
                        defineField({
                            name: "contentEN",
                            title: "Content EN",
                            type: "text"
                        }),
                    ]
                })
            ]
        })
    ]
})