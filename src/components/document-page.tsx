import { Outline, PageHeader } from "@/components/archive-ui";
import { ArchiveMarkdown } from "@/components/markdown";
import { documentBody, documentOutline } from "@/lib/documents";

export function DocumentPage({ code, title, description, markdown }: {
  code: string;
  title: string;
  description: string;
  markdown: string;
}) {
  return (
    <>
      <PageHeader code={code} title={title} description={description} />
      <div className="site-container page-content document-grid">
        <Outline entries={documentOutline(markdown)} />
        <article className="document-content"><ArchiveMarkdown>{documentBody(markdown)}</ArchiveMarkdown></article>
      </div>
    </>
  );
}
