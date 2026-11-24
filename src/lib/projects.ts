import { getCollection } from "astro:content";

export async function getProjects() {
  const all = await getCollection("projects", ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const sizeRange = (plans: { size: number }[]) => {
  const s = plans.map((p) => p.size).sort((a, b) => a - b);
  return s.length ? { min: s[0], max: s[s.length - 1] } : null;
};
