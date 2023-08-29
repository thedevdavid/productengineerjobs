import { apiVersion, dataset, projectId } from "@/sanity/lib/api";
import { schema } from "@/sanity/schemas";
import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { deskTool } from "sanity/desk";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "ProductEngineerJobs.co";

const plugins = [deskTool()];

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
