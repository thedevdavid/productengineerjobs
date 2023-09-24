import { defineField, defineType } from "sanity";

export default defineType({
  name: "salaryRangeOptions",
  title: "Salary Range Options",
  type: "object",
  fields: [
    defineField({
      name: "min",
      title: "Min",
      type: "number",
    }),
    defineField({
      name: "max",
      title: "Max",
      type: "number",
    }),
  ],
});
