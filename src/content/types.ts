export type Section = {
  heading: string;
  paragraphs: string[];
};

export type RelatedLink = {
  href: string;
  label: string;
};

export type Entry = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  updatedAt: string;
  keywords: string[];
  sections: Section[];
  related?: RelatedLink[];
};

export type City = Entry & {
  name: string;
  region: string;
  venues: string[];
};

export type Post = Entry & {
  publishedAt: string;
};

export type CaseStudy = Entry & {
  result: string;
  industry: string;
};
