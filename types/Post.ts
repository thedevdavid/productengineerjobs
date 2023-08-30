import type { PortableTextBlock, SanityDocument } from "sanity";

import { countriesAndRegions } from "@/lib/countries-and-regions";
import { Company } from './Company';

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
  company: Company;
  location: (typeof countriesAndRegions)[number]["value"];
  type: "remote" | "hybrid" | "onsite";
  contract: "full-time" | "part-time" | "contract" | "internship";
  applyUrl: string;
  salaryRange: {
    salaryRangeHourly?: SalaryRange;
    salaryRangeYearly?: SalaryRange;
    salaryRangeProject?: SalaryRange;
  };
  content: PortableTextBlock[];
  tags: Tag[];
}
