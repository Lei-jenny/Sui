import type { Metadata } from "next";
import { DocumentPage } from "@/components/document-page";
import { readDocument } from "@/lib/documents";

export const metadata: Metadata = { title: "岁家全档案" };

export default async function ArchivePage() {
  return <DocumentPage code="FILE / 01" title="岁家全档案" description="资料总览、八部作品的主线整理、人物专题与来源索引。" markdown={await readDocument("sui-dossier")} />;
}
