import {slugify} from "@/lib/utils";

// Replaces a literal "/table" marker (typed by an admin inside a content field)
// with a collapsible Table of Contents built from that same content's h2/h3 headings.
// Headings without an id get one assigned so the TOC links can jump to them.
export function injectToc(html: string): string {
  if (!html) return html;
  if (!/\/table/i.test(html)) return html;

  const headingRegex = /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi;
  const headings: { level: string; text: string; id: string }[] = [];
  const usedIds = new Set<string>();

  const withIds = html.replace(headingRegex, (match, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) return match;

    const existingIdMatch = attrs.match(/id=["']([^"']+)["']/i);
    let id = existingIdMatch ? existingIdMatch[1] : slugify(text) || `section-${headings.length + 1}`;
    let unique = id, n = 1;
    while (usedIds.has(unique)) unique = `${id}-${++n}`;
    usedIds.add(unique);
    headings.push({ level, text, id: unique });

    if (existingIdMatch) return match;
    return `<${level}${attrs} id="${unique}">${inner}</${level}>`;
  });

  if (!headings.length) return withIds.replace(/\/table/gi, "");

  const items = headings
    .map((h) => `<li class="toc-${h.level}"><a href="#${h.id}">${h.text}</a></li>`)
    .join("");
  const toc = `<details class="toc"><summary class="tocHeader"><span>Table of Contents</span><span class="tocIcon" aria-hidden="true">+</span></summary><ul class="tocList">${items}</ul></details>`;

  return withIds
    .replace(/<p>\s*\/table\s*<\/p>/gi, toc)
    .replace(/\/table/gi, toc);
}
