import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "react";
import { archiveHref } from "@/lib/documents";

function ArchiveHeading({
  as: Heading,
  children,
}: ComponentProps<"h2"> & { as: "h2" | "h3" | "h4" }) {
  const match = typeof children === "string" ? /^(.*?) \{#([\w-]+)\}$/.exec(children) : null;
  return <Heading id={match?.[2]}>{match ? match[1] : children}</Heading>;
}

export function ArchiveMarkdown({ children }: { children: string }) {
  return (
    <div className="archive-prose">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <ArchiveHeading as="h2">{children}</ArchiveHeading>,
          h3: ({ children }) => <ArchiveHeading as="h3">{children}</ArchiveHeading>,
          h4: ({ children }) => <ArchiveHeading as="h4">{children}</ArchiveHeading>,
          table: ({ children }) => (
            <div className="table-scroll" tabIndex={0} role="region" aria-label="档案表格，可横向滚动">
              <table>{children}</table>
            </div>
          ),
          a: ({ href, children }) => {
            if (!href) return <>{children}</>;
            const target = archiveHref(href);
            return target.startsWith("/") || target.startsWith("#")
              ? <Link href={target}>{children}</Link>
              : <a href={target} rel="noreferrer">{children}</a>;
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
