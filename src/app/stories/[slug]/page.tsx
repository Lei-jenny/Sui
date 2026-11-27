import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, PersonLinks, SectionHeading, TaggedEvidence } from "@/components/archive-ui";
import { ArchiveMarkdown } from "@/components/markdown";
import { documentSection, readDocument } from "@/lib/documents";
import { documents, findWork, numberLabel, sources, workHref, works } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = findWork((await params).slug);
  if (!work) notFound();
  return { title: `《${work.title}》`, description: work.summary };
}

export default async function StoryPage({ params }: Props) {
  const work = findWork((await params).slug);
  if (!work) notFound();
  const overview = await readDocument("sui-dossier");
  const story = work.role === "supplementary"
    ? documentSection(overview, `《${work.title}》`, true)
    : documentSection(overview, `story-${work.id}`);
  const hasGuide = documents.some((doc) => doc.coversWorkIds?.includes(work.id));
  const guide = hasGuide ? documentSection(await readDocument("sui-prequel-guide"), work.id) : null;
  const citations = work.sourceIds.map((id) => {
    const source = sources.find((item) => item.id === id);
    if (!source) throw new Error(`Unknown source for ${work.id}: ${id}`);
    return source;
  });
  const previous = works[work.releaseOrder - 2];
  const next = works[work.releaseOrder];

  return (
    <>
      <PageHeader code={`WORK / ${numberLabel(work.releaseOrder)} · ${work.type}`} title={`《${work.title}》`} description={work.summary} back={{ href: "/stories", label: "作品索引" }} />
      <div className="site-container page-content main-grid">
        <div>
          <section aria-labelledby="story">
            <SectionHeading id="story" title="剧情档案" />
            {work.canonWarning && <p className="page-note"><strong>正史边界：</strong>{work.canonWarning}</p>}
            <ArchiveMarkdown>{story}</ArchiveMarkdown>
          </section>
          {guide && (
            <section id="nodes" className="stack-section" aria-labelledby="nodes-heading">
              <SectionHeading id="nodes-heading" title="逐节点剧情" description="按原资料保存行动前、行动后和无独立剧情页的关卡记录。" />
              <ArchiveMarkdown>{guide}</ArchiveMarkdown>
              <Link className="text-link section-link" href={`/guide#${work.id}`}>在完整指南中查看 ↗</Link>
            </section>
          )}
        </div>
        <aside className="home-aside" aria-label="作品资料">
          {!!work.characters?.length && <div className="panel sidebar-panel"><h2>相关人物</h2><PersonLinks ids={work.characters} /></div>}
          {(!!work.revelations?.length || !!work.identityNotes?.length) && (
            <div className="panel sidebar-panel">
              <h2>关键信息</h2>
              {!!work.revelations?.length && <ul className="detail-list">{work.revelations.map((item) => <li key={item}>{item}</li>)}</ul>}
              {work.identityNotes?.map(({ claim, evidence }) => <p className="identity-note" key={claim}><TaggedEvidence id={evidence} /> {claim}</p>)}
            </div>
          )}
          {!!work.endings?.length && (
            <div className="panel sidebar-panel">
              <h2>互斥结局</h2>
              <ul className="detail-list">{work.endings.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          )}
          <div className="panel sidebar-panel">
            <h2>原始来源</h2>
            <ul className="sidebar-links">{citations.map((item) => <li key={item.id}><a href={item.url} rel="noreferrer">{item.title} <span aria-hidden="true">↗</span></a></li>)}</ul>
          </div>
        </aside>
        <nav className="wide-row adjacent" aria-label="前后作品">
          {previous && <Link href={workHref(previous.id)}>← {previous.title}</Link>}
          {next && <Link href={workHref(next.id)} className="adjacent-next">{next.title} →</Link>}
        </nav>
      </div>
    </>
  );
}
