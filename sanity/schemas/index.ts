import { type SchemaTypeDefinition } from "sanity";

import category from "./category";
import page from "./page";
import post from "./post";
import salaryRange from "./salaryRange";
import tag from "./tag";
import company from './company';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [company, post, category, tag, page, salaryRange],
};
