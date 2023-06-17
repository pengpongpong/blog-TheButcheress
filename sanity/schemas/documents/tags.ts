import { defineField, defineType } from "sanity";
import { isUniqueAcrossAllDocuments } from "../components/isUniqueSlug";

export default defineType({
  name: "tags",
  title: "Tags",
  type: "document",
  fields: [
    defineField({
      name: "titleDE",
      title: "Titel DE",
      type: "string",
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
        isUnique: isUniqueAcrossAllDocuments
      },
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "object",
      fields: [
        {
          name: "descriptionDE",
          title: "Beschreibung DE",
          type: "text"
        },
        {
          name: "descriptionEN",
          title: "Beschreibung EN",
          type: "text"
        },
      ]
    })
  ],
});
