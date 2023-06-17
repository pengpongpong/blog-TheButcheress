import { defineType, defineField } from "sanity";

export default defineType({
    name: "home",
    title: "Home",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titel",
            type: "string"
        }),
        defineField({
            name: "imageSlider",
            title: "Bild Diashow",
            type: "array",
            of: [
                defineField({
                    name: "imageSlide",
                    title: "Bild",
                    type: "image",
                    options: {
                        hotspot: true
                    }
                })
            ]
        }),
        defineField({
            name: "introduction",
            title: "Einführung",
            type: "object",
            fields: [
                defineField({
                    name: "title",
                    title: "Titel",
                    type: "object",
                    fields: [
                        {
                            name: "titleDE",
                            title: "Titel DE",
                            type: "string"
                        },
                        {
                            name: "titleEN",
                            title: "Titel EN",
                            type: "string"
                        }
                    ]
                }),
                defineField({
                    name: "content",
                    title: "Inhalt",
                    type: "object",
                    fields: [
                        {
                            name: "contentDE",
                            title: "Inhalt DE",
                            type: "text"
                        },
                        {
                            name: "contentEN",
                            title: "Inhalt EN",
                            type: "text"
                        },
                    ]
                })
            ]
        }),
        defineField({
            name: "recipe",
            title: "Rezepte",
            type: "object",
            fields: [
                defineField({
                    name: "title",
                    title: "Titel",
                    type: "object",
                    fields: [
                        {
                            name: "titleDE",
                            title: "Titel DE",
                            type: "string"
                        },
                        {
                            name: "titleEN",
                            title: "Titel EN",
                            type: "string"
                        },
                    ]
                }),
                defineField({
                    name: "content",
                    title: "Inhalt",
                    type: "object",
                    fields: [
                        {
                            name: "contentDE",
                            title: "Inhalt DE",
                            type: "text"
                        },
                        {
                            name: "contentEN",
                            title: "Inhalt EN",
                            type: "text"
                        },
                    ]
                }),
                defineField({
                    name: "image",
                    title: "Bilder",
                    type: "object",
                    fields: [
                        defineField({
                            name: "leftImage",
                            title: "Linkes Bild",
                            type: "image",
                            options: {
                                hotspot: true
                            }
                        }),
                        defineField({
                            name: "middleImage",
                            title: "Mittleres Bild",
                            type: "image",
                            options: {
                                hotspot: true
                            }
                        }),
                        defineField({
                            name: "rightImage",
                            title: "Rechtes Bild",
                            type: "image",
                            options: {
                                hotspot: true
                            }
                        }),
                    ]
                })
            ]
        }), defineField({
            name: "travel",
            title: "Reisen",
            type: "object",
            fields: [
                defineField({
                    name: "title",
                    title: "Titel",
                    type: "object",
                    fields: [
                        {
                            name: "titleDE",
                            title: "Titel DE",
                            type: "string"
                        },
                        {
                            name: "titleEN",
                            title: "Titel EN",
                            type: "string"
                        },
                    ]
                }),
                defineField({
                    name: "content",
                    title: "Inhalt",
                    type: "object",
                    fields: [
                        {
                            name: "contentDE",
                            title: "Inhalt DE",
                            type: "text"
                        },
                        {
                            name: "contentEN",
                            title: "Inhalt EN",
                            type: "text"
                        },
                    ]
                }),
                defineField({
                    name: "image",
                    title: "Bild",
                    type: "image",
                    options: {
                        hotspot: true
                    }
                })
            ]
        }),
    ]
})