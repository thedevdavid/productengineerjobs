import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { deskTool } from "sanity/desk";

import { apiVersion, dataset, projectId } from "./lib/sanity.api";
import { schema } from "./schemas";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "ProductEngineerJobs.co";

const plugins = [deskTool(), colorInput()];

isDev && plugins.push(visionTool({ defaultApiVersion: apiVersion }));

const config = defineConfig({
  name: "default",
  title,
  projectId: projectId || "",
  dataset: dataset || "",
  basePath: "/studio",
  schema,
  plugins,
});

export default config;
