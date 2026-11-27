import type { Metadata } from "next";
import { DocumentPage } from "@/components/document-page";
import { readDocument } from "@/lib/documents";

export const metadata: Metadata = { title: "左乐人物线与续写指南" };

export default async function ZuoLeWritingPage() {
  return <DocumentPage code="FILE / 03" title="左乐人物线与续写指南" description="以《辞岁行》为界，分开阅读剧情事实、人物推断与非官方创作方向。" markdown={await readDocument("zuo-le-story-bible")} />;
}
