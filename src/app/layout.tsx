import type { Metadata } from "next";
import Link from "next/link";
import { updatedAt } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "岁家档案｜明日方舟剧情索引", template: "%s｜岁家档案" },
  description: "从《洪炉示岁》到《辞岁行》：明日方舟岁家十二人、世界内年表、作品与证据索引，以及左乐人物专题。",
};

const navigation = [
  { href: "/timeline", label: "时间线" },
  { href: "/stories", label: "作品" },
  { href: "/characters", label: "人物" },
  { href: "/relationships", label: "关系" },
  { href: "/questions", label: "悬案" },
  { href: "/writing/zuo-le", label: "左乐专题" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <a className="skip-link" href="#main-content">跳到正文</a>
        <header className="site-header">
          <div className="site-container header-inner">
            <Link href="/" className="wordmark">
              <span className="wordmark-stamp" aria-hidden="true">岁</span>
              <span><strong>岁家档案</strong><small>SUI ARCHIVE</small></span>
            </Link>
            <nav aria-label="主导航" className="site-nav">
              {navigation.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
            </nav>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="site-footer">
          <div className="site-container footer-inner">
            <div>
              <p className="footer-title">岁家档案 <span>SUI ARCHIVE</span></p>
              <p>《明日方舟》非官方同人资料索引 · 资料截至 <time dateTime={updatedAt}>{updatedAt}</time> · 含剧透</p>
            </div>
            <nav aria-label="资料入口">
              <Link href="/archive">全档案</Link>
              <Link href="/guide">逐节点指南</Link>
              <Link href="/archive#sources">来源索引</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
