import { getCollection, type CollectionEntry } from "astro:content";
import { merge, type Lang } from "./i18n";

export type Project = {
  id: string;
  data: CollectionEntry<"projects">["data"];
  /** Entry whose Markdown body is rendered (the translation when it has a body). */
  entry: CollectionEntry<"projects"> | CollectionEntry<"projects_en">;
};

/**
 * Projects in the given language. The English file (src/content/projects/<id>.en.md) only needs the
 * translated fields; everything else (images, sizes, status, order…) comes from the Bangla file.
 */
export async function getProjects(lang: Lang = "bn"): Promise<Project[]> {
  const all = await getCollection("projects", ({ data }) => !data.draft);
  const tr = lang === "en" ? new Map((await getCollection("projects_en")).map((e) => [e.id, e])) : new Map();
  return all
    .sort((a, b) => a.data.order - b.data.order)
    .map((p) => {
      const t = tr.get(p.id);
      if (!t) return { id: p.id, data: p.data, entry: p };
      // structural fields always come from the Bangla file, so a stale translation can't break the page
      const { order, status, featured, draft, floors, cover, map_query, name_en, ...text } = t.data as Record<string, unknown>;
      return { id: p.id, data: merge(p.data, text), entry: t.body?.trim() ? t : p };
    });
}

export const sizeRange = (plans: { size: number }[]) => {
  const s = plans.map((p) => p.size).sort((a, b) => a - b);
  return s.length ? { min: s[0], max: s[s.length - 1] } : null;
};
