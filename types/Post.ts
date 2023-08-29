import { ValueOf } from "next/dist/shared/lib/constants";
import type { Image, PortableTextBlock, SanityDocument } from "sanity";

import { countriesAndRegions } from "@/lib/countries-and-regions";

export interface Category extends SanityDocument {
  _type: "category";
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
}

export interface Tag extends SanityDocument {
  _type: "tag";
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
}

export type SalaryRange = {
  min: number;
  max: number;
};

export interface Post extends SanityDocument {
  _type: "post";
  title: string;
  isPromoted: boolean;
  isVerified: boolean;
  publishedAt: Date;
  slug: string;
  category: Category;
  company: string;
  location: (typeof countriesAndRegions)[number]["value"];
  type: "remote" | "hybrid" | "onsite";
  contract: "full-time" | "part-time" | "contract" | "internship";
  companyLogo: Image;
  companyTwitter: string;
  applyUrl: string;
  salaryRange: {
    salaryRangeHourly?: SalaryRange;
    salaryRangeYearly?: SalaryRange;
    salaryRangeProject?: SalaryRange;
  };
  content: PortableTextBlock[];
  tags: Tag[];
}
