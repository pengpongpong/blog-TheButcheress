import { defineField, defineType } from "sanity";

export default defineType({
    name: "navigationSubmenu",
    title: "Submenu für Navigation",
    type: "document",
    fields: [
        defineField({
            name: "titleDE",
            title: "Titel DE",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "titleEN",
            title: "Titel EN",
            type: "string",
            validation: (Rule) => Rule.required(),
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
                    to: { type: "tags" }
                }),
            ]
        }),
    ]
})