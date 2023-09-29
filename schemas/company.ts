import { Handbag } from "iconoir-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "company",
  title: "Companies",
  icon: Handbag,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "PRIVATE Contact Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "twitter",
      title: "Twitter Handle",
      type: "text",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
  ],
});
