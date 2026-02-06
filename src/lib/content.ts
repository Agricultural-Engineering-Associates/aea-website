import type { Section } from '../types';

export function getSectionContent(
  sections: Section[],
  sectionName: string,
  fallback: string
): string {
  if (!Array.isArray(sections)) return fallback;
  const section = sections.find((s) => s.name === sectionName);
  return section?.content || fallback;
}

export function getSectionImage(
  sections: Section[],
  sectionName: string,
  fallback?: string
): string | undefined {
  if (!Array.isArray(sections)) return fallback;
  const section = sections.find((s) => s.name === sectionName);
  return section?.imageUrl || fallback;
}
