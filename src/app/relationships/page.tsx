import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, RelationCard, SectionHeading } from "@/components/archive-ui";
import { relationships, supportingCharacters } from "@/lib/data";

export const metadata: Metadata = { title: "人物关系" };

export default function RelationshipsPage() {
  const zuoLe = supportingCharacters.find((person) => person.id === "zuo-le");
  if (!zuoLe) throw new Error("Missing supporting character: zuo-le");
  return (
    <>
      <PageHeader code="04 / RELATIONSHIPS" title="人物关系" description="收录资料中重点梳理的关系线，不代表全部人物之间的联系。" />
      <div className="site-container page-content">
        <section aria-labelledby="family">
          <SectionHeading id="family" title="岁家手足" />
          <div className="relation-grid">{relationships.map((relation) => <RelationCard key={relation.id} relation={relation} />)}</div>
        </section>
        <section className="stack-section" aria-labelledby="zuo-network">
          <SectionHeading id="zuo-network" title="左乐的关系网络" />
          <dl className="panel sidebar-panel fact-list">
            {zuoLe.relationships.map(({ target, type }) => <div key={target}><dt>{target}</dt><dd>{type}</dd></div>)}
          </dl>
          <Link className="text-link section-link" href="/writing/zuo-le#relationships">阅读完整关系分析 ↗</Link>
        </section>
      </div>
    </>
  );
}
