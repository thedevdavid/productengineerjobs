import { dataset, projectId } from "@/sanity/lib/api";
import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};
