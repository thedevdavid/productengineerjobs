import { SubmitDocument } from "iconoir-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon: SubmitDocument,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      validation: (rule) => rule.required(),
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              title: "Alternative text",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
