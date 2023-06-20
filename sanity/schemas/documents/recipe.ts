import { defineField, defineType } from "sanity";
import { isUniqueAcrossAllDocuments } from "../components/isUniqueSlug";

export default defineType({
  name: "recipe",
  title: "Rezepte",
  type: "document",
  fields: [
    defineField({
      name: "titleDE",
      title: "Title DE",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleEN",
      title: "Title EN",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Url",
      type: "slug",
      options: {
        source: "titleDE",
        maxLength: 96,
        isUnique: isUniqueAcrossAllDocuments,
      },
      validation: Rule => Rule.required()
    }),
    // defineField({
    //   name: "category",
    //   title: "Main Tag",
    //   type: "reference",
    //   to: [{ type: "tags" }],
    //   validation: Rule => Rule.required(),
    // }),
    defineField({
      name: "pdf",
      title: "PDF hochladen",
      type: "object",
      fields: [
        defineField({
          name: "pdfDE",
          type: "file",
          title: "PDF DE",
          fields: [
            {
              name: "title",
              title: "Titel",
              type: "string"
            }
          ]
        }),
        defineField({
          name: 'pdfEN',
          type: 'file',
          title: 'PDF EN',
          fields: [
            {
              name: "title",
              title: "Titel",
              type: "string"
            }
          ]
        }),
      ]
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        { type: "reference", to: { type: "tags" } }
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
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
      title: "Rezept Bild",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "prepTime",
      title: "Vorbereitungszeit",
      type: "object",
      fields: [
        defineField({
          name: "hours",
          title: "Stunden",
          type: "number",
        }),
        defineField({
          name: "minutes",
          title: "Minuten",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "totalTime",
      title: "Gesamtzeit",
      type: "object",
      fields: [
        defineField({
          name: "hours",
          title: "Stunden",
          type: "number",
        }),
        defineField({
          name: "minutes",
          title: "Minuten",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "servings",
      title: "Portionen",
      type: "number",
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [
        {
          type: "ingredients",
        },
      ],
    }),
    defineField({
      name: "instructions",
      title: "Anleitung",
      type: "array",
      of: [
        {
          type: "instruction",
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlich am",
      type: "datetime",
    }),
  ],

  preview: {
    select: {
      title: "titleDE",
      author: "author.name",
      media: "image",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
