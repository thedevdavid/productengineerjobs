import { PortableTextBlock, SanityDocument } from "sanity";

export interface Page extends SanityDocument {
  _type: "page";
  title: string;
  slug: string;
  content: PortableTextBlock[];
}
