import type { Image, SanityDocument } from "sanity";

export interface Company extends SanityDocument {
  _type: "company";
  title: string;
  name: string;
  logo: Image;
  twitter: string;
  slug: {
    current: string;
    _type: "slug";
  };
}