import React, { FunctionComponent } from "react";
import { defineType, defineArrayMember } from "sanity";

interface InternalLinkRule {
  _key: string;
  _type: string;
  tags?: {
    _ref: string;
    _type: string;
  },
  recipe?: {
    _type: string;
    _ref: string;
  }
}

const RecipeIcon: FunctionComponent = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#000000' width='24' height='24'><path d="M21 10H3a1 1 0 0 0-1 1 10 10 0 0 0 5 8.66V21a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.34A10 10 0 0 0 22 11a1 1 0 0 0-1-1zm-5.45 8.16a1 1 0 0 0-.55.9V20H9v-.94a1 1 0 0 0-.55-.9A8 8 0 0 1 4.06 12h15.88a8 8 0 0 1-4.39 6.16zM9 9V7.93a4.53 4.53 0 0 0-1.28-3.15A2.49 2.49 0 0 1 7 3V2H5v1a4.53 4.53 0 0 0 1.28 3.17A2.49 2.49 0 0 1 7 7.93V9zm4 0V7.93a4.53 4.53 0 0 0-1.28-3.15A2.49 2.49 0 0 1 11 3V2H9v1a4.53 4.53 0 0 0 1.28 3.15A2.49 2.49 0 0 1 11 7.93V9zm4 0V7.93a4.53 4.53 0 0 0-1.28-3.15A2.49 2.49 0 0 1 15 3V2h-2v1a4.53 4.53 0 0 0 1.28 3.15A2.49 2.49 0 0 1 15 7.93V9z"></path></svg>
);

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Headline 1", value: "h2" },
        { title: "Headline 2", value: "h3" },
        { title: "Headline 3", value: "h4" },
        { title: "Headline 4", value: "h5" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          {
            title: "Url extern",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
          {
            name: "recipeLink",
            type: "object",
            title: "Rezept Link",
            icon: RecipeIcon,
            fields: [
              {
                name: "recipe",
                type: "reference",
                to: [
                  { type: "recipe" },
                ],
              },
              {
                name: "tags",
                type: "reference",
                to: [
                  { type: "tags" },
                ],
              },
            ],
            validation: (Rule) =>
              Rule.custom((fields: InternalLinkRule) => {
                const recipe = fields.recipe;
                const tags = fields.tags;
                if ((recipe && tags) || (!recipe && !tags)) {
                  return "Must select exactly one of 'recipe' or 'tags'.";
                }
                return true;
              }),
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
