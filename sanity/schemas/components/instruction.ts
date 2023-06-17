import { defineField, defineType } from "sanity";

export default defineType({
  name: "instruction",
  title: "Anleitung",
  type: "object",
  fields: [
    defineField({
      name: "titleDE",
      title: "Titel DE",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "titleEN",
      title: "Titel EN",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "contentDE",
      title: "Schritt DE",
      type: "text",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "contentEN",
      title: "Schritt EN",
      type: "text",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "title",
          title: "Titel alt",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "tipp",
      title: "Tipp",
      type: "array",
      of: [
        {
          name: "tippContent",
          title: "Tipp",
          type: "object",
          fields: [
            {
              name: "titleDE",
              title: "Titel DE",
              type: "string",
              validation: Rule => Rule.required()
            },
            {
              name: "titleEN",
              title: "Titel EN",
              type: "string",
              validation: Rule => Rule.required()
            },
            {
              name: "contentDE",
              title: "Tipp DE",
              type: "text",
              validation: Rule => Rule.required()
            },
            {
              name: "contentEN",
              title: "Tipp EN",
              type: "text",
              validation: Rule => Rule.required()
            },
          ],
        },
      ],
    }),
  ],
});
