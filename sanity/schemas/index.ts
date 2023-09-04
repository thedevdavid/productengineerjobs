import { type SchemaTypeDefinition } from "sanity";

import category from "./category";
import company from "./company";
import job from "./job";
import page from "./page";
import salaryRange from "./salaryRange";
import tag from "./tag";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [company, job, category, tag, page, salaryRange],
};
