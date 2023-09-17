import type { PortableTextBlock, SanityDocument } from "sanity";

import { countriesAndRegions } from "@/lib/countries-and-regions";

import { Company } from "./Company";

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
  color: string;
  slug: {
    current: string;
    _type: "slug";
  };
}

export interface Benefit extends SanityDocument {
  _type: "benefit";
  title: string;
  color: string;
  slug: {
    current: string;
    _type: "slug";
  };
}

export type SalaryRange = {
  min: number;
  max: number;
};

export interface Job extends SanityDocument {
  _type: "job";
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
  salaryType: "hourly" | "yearly" | "project";
  salaryRange: {
    salaryRangeHourly?: SalaryRange;
    salaryRangeYearly?: SalaryRange;
    salaryRangeProject?: SalaryRange;
  };
  content: PortableTextBlock[];
  tags: Tag[];
  benefits: Benefit[];
}
