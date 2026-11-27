import type { Metadata } from "next";
import { DocumentPage } from "@/components/document-page";
import { readDocument } from "@/lib/documents";

export const metadata: Metadata = { title: "前文逐节点剧情指南" };

export default async function GuidePage() {
  return <DocumentPage code="FILE / 02" title="前文逐节点剧情指南" description="从《洪炉示岁》到《相见欢》，逐页梳理前六部作品。" markdown={await readDocument("sui-prequel-guide")} />;
}
