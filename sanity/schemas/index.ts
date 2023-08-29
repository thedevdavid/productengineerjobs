import { type SchemaTypeDefinition } from "sanity";

import category from "./category";
import page from "./page";
import post from "./post";
import salaryRange from "./salaryRange";
import tag from "./tag";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, tag, post, page, salaryRange],
};
