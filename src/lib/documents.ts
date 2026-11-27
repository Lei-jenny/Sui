import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import { documents } from "@/lib/data";

type DocumentId = "sui-dossier" | "sui-prequel-guide" | "zuo-le-story-bible";

const routes: Record<string, string> = {
  "01-story-overview.md": "/archive",
  "02-chapter-guide.md": "/guide",
  "03-zuo-le-story-bible.md": "/writing/zuo-le",
};

export const readDocument = cache(async (id: DocumentId) => {
  const entry = documents.find((item) => item.id === id);
  if (!entry) throw new Error(`Unknown archive document: ${id}`);
  return (await readFile(join(process.cwd(), "content", entry.path), "utf8"))
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n");
});

export function archiveHref(href: string) {
  const match = /^(?:\.\/)?([^/#]+\.md)(#.*)?$/.exec(href);
  return match && routes[match[1]] ? `${routes[match[1]]}${match[2] ?? ""}` : href;
}

export function documentBody(markdown: string) {
  return markdown.replace(/^# [^\n]+\n+/, "");
}

export function documentSection(markdown: string, key: string, byTitle = false) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => {
    const heading = /^(#{2,6}) (.*)$/.exec(line);
    return heading && (byTitle ? heading[2] === key : heading[2].endsWith(`{#${key}}`));
  });
  if (start < 0) throw new Error(`Missing archive section: ${key}`);
  const depth = lines[start].indexOf(" ");
  const end = lines.findIndex((line, index) =>
    index > start && new RegExp(`^#{1,${depth}} `).test(line),
  );
  return lines.slice(start + 1, end === -1 ? undefined : end).join("\n").trim();
}

export function documentOutline(markdown: string) {
  return Array.from(markdown.matchAll(/^## (.+) \{#([\w-]+)\}$/gm), ([, label, id]) => ({
    label,
    href: `#${id}`,
  }));
}
