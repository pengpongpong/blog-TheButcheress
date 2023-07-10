import { defineType, defineField } from "sanity";

export default defineType({
    name: "impressumContent",
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
                            type: "string"
                        }),
                        defineField({
                            name: "contentEN",
                            title: "Content EN",
                            type: "string"
                        }),
                        defineField({
                            name: "link",
                            title: "Url",
                            type: "string"
                        })
                    ]
                })
            ]
        })
    ]
})