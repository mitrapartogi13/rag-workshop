/**
 * Tiny class-name joiner. Filters out falsy values so we can write
 * conditional classes inline without pulling in a dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Turn a heading string into a URL-safe anchor slug.
 * Used so the "On this page" table of contents can link to each section.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
