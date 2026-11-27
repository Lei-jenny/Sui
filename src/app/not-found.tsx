import Link from "next/link";
import { PageHeader } from "@/components/archive-ui";

export default function NotFound() {
  return (
    <>
      <PageHeader code="ARCHIVE / 404" title="未找到档案" description="此地址没有对应的档案。你可以从首页或作品索引重新查找。" />
      <div className="site-container page-content adjacent"><Link href="/">← 返回首页</Link><Link href="/stories">浏览作品索引 ↗</Link></div>
    </>
  );
}
