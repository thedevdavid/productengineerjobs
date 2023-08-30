import { EditPencil } from "iconoir-react";
import { defineField, defineType } from "sanity";

import { countriesAndRegions } from "@/lib/countries-and-regions";

export default defineType({
  name: "post",
  title: "Posts",
  icon: EditPencil,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isPromoted",
      title: "Promoted",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isVerified",
      title: "Verified",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "reference",
      to: { type: "company" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: [...countriesAndRegions],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Remote", value: "remote" },
          { title: "Hybrid", value: "hybrid" },
          { title: "Onsite", value: "onsite" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contract",
      title: "Contract",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Contract", value: "contract" },
          { title: "Internship", value: "internship" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "applyUrl",
      title: "Apply URL",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "salaryRange",
      title: "Salary Range",
      type: "object",
      fieldsets: [{ name: "salary", title: "Salary Range" }],
      fields: [
        defineField({
          name: "salaryRangeHourly",
          title: "Hourly",
          type: "salaryRangeOptions",
        }),
        defineField({
          name: "salaryRangeYearly",
          title: "Yearly",
          type: "salaryRangeOptions",
        }),
        defineField({
          name: "salaryRangeProject",
          title: "Project",
          type: "salaryRangeOptions",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => `${doc.title}-${doc.publishedAt}`,
        maxLength: 120,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
    },
    prepare(selection: any) {
      const { category } = selection;
      return {
        ...selection,
        subtitle: `in ${category}`,
      };
    },
  },
});
