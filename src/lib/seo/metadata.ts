import type { Metadata } from "next";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  publishedTime,
  modifiedTime,
}: SeoInput): Metadata {
  const type = publishedTime ? "article" : "website";

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
