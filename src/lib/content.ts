export function findBySlug<T extends { slug: string }>(items: readonly T[], slug: string) {
  return items.find((item) => item.slug === slug);
}
