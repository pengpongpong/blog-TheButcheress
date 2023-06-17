import { defineField, defineType } from "sanity";

export default defineType({
  name: "ingredients",
  type: "object",
  title: "Ingredients",
  fields: [
    defineField({
      name: "titleDE",
      type: "string",
      title: "Title DE",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "titleEN",
      type: "string",
      title: "Title EN",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "ingredientsList",
      title: "Zutatenliste",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "titleDE",
              title: "Zutat DE",
              type: "string",
              validation: Rule => Rule.required()
            },
            {
              name: "titleEN",
              title: "Zutat EN",
              type: "string",
              validation: Rule => Rule.required()
            },
            {
              name: "quantityDE",
              title: "MengeDE",
              type: "string",
            },
            {
              name: "quantityEN",
              title: "MengeEN",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
