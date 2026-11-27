import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, WorkList } from "@/components/archive-ui";
import { works } from "@/lib/data";

export const metadata: Metadata = { title: "作品索引" };

export default function StoriesPage() {
  return (
    <>
      <PageHeader code="02 / RELEASE ORDER" title="作品索引" description="按发布顺序阅读岁家主干及补充作品。单篇档案收录剧透、叙事边界和可核对来源。" />
      <div className="site-container page-content">
        <p className="page-note">想逐关回看前六部？<Link className="text-link" href="/guide">打开逐节点指南 ↗</Link></p>
        <WorkList items={works} />
      </div>
    </>
  );
}
