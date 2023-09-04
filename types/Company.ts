import type { Image, SanityDocument } from "sanity";

export interface Company extends SanityDocument {
  _type: "company";
  name: string;
  logo: Image;
  twitter: string;
  contactEmail: string;
  slug: {
    current: string;
    _type: "slug";
  };
}
