import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, RelationCard, SectionHeading, TaggedEvidence, WorkList } from "@/components/archive-ui";
import { ArchiveMarkdown } from "@/components/markdown";
import { documentSection, readDocument } from "@/lib/documents";
import {
  characters, findPerson, numberLabel, relationships, supportingCharacters, timeline, workHref, works,
} from "@/lib/data";

type Props = { params: Promise<{ id: string }> };
const back = { href: "/characters", label: "人物索引" };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...characters, ...supportingCharacters].map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = findPerson((await params).id);
  if (!person) notFound();
  return { title: person.name, description: "order" in person ? person.statusAfterFinale : person.arcSummary };
}

export default async function CharacterPage({ params }: Props) {
  const person = findPerson((await params).id);
  if (!person) notFound();

  if (!("order" in person)) {
    return (
      <>
        <PageHeader code={`PERSONNEL / ${person.faction}`} title={person.name} description={person.arcSummary} back={back} />
        <div className="site-container page-content main-grid">
          <section aria-labelledby="character-arc">
            <SectionHeading id="character-arc" title="人物弧" />
            <ol className="stack-list">{person.arcStages.map((stage) => (
              <li className="panel sidebar-panel" key={stage.workId}>
                <h3>{stage.label}</h3>
                <p>{stage.summary}</p>
                <Link className="text-link" href={workHref(stage.workId)}>阅读对应作品 ↗</Link>
              </li>
            ))}</ol>
          </section>
          <aside className="panel sidebar-panel">
            <h2>{person.role}</h2>
            <p>{person.currentStatus}</p>
            <Link className="text-link" href="/writing/zuo-le">左乐专题与续写指南 ↗</Link>
          </aside>
        </div>
      </>
    );
  }

  const featured = person.focus
    ? documentSection(await readDocument("sui-dossier"), `character-${person.id}`)
    : null;
  const events = timeline.filter((event) => event.characters.includes(person.id));
  const relatedWorks = works.filter((work) => work.characters?.includes(person.id));
  const edges = relationships.filter((edge) => edge.source === person.id || edge.target === person.id);

  return (
    <>
      <PageHeader code={`PERSONNEL / ${numberLabel(person.order)} OF 12`} title={person.name} description={person.domain.join(" · ")} back={back} />
      <div className="site-container page-content main-grid">
        <div>
          {featured && (
            <section aria-labelledby="feature">
              <SectionHeading id="feature" title="人物专题" />
              <ArchiveMarkdown>{featured}</ArchiveMarkdown>
            </section>
          )}
          {relatedWorks.length > 0 && (
            <section className={featured ? "stack-section" : undefined} aria-labelledby="appearances">
              <SectionHeading id="appearances" title="相关作品" />
              <WorkList items={relatedWorks} />
            </section>
          )}
          {edges.length > 0 && (
            <section className="stack-section" aria-labelledby="relations">
              <SectionHeading id="relations" title="人物关系" />
              <div className="relation-grid">{edges.map((relation) => <RelationCard key={relation.id} relation={relation} />)}</div>
            </section>
          )}
        </div>
        <aside className="home-aside" aria-label="人物档案摘要">
          <section className="panel sidebar-panel">
            <h2>身份与现状</h2>
            <dl className="fact-list">
              <dt>排行</dt><dd>{person.order}</dd>
              {person.aliases.length > 0 && <><dt>别名</dt><dd>{person.aliases.join("、")}</dd></>}
              <dt>领域</dt><dd>{person.domain.join("、")}</dd>
              <dt>可玩干员</dt><dd>{person.playable ? "是" : "否"}</dd>
              <dt>结局后</dt><dd>{person.statusAfterFinale}</dd>
            </dl>
          </section>
          {events.length > 0 && (
            <section className="panel sidebar-panel">
              <h2>年表记载</h2>
              <ul className="sidebar-links">{events.map((event) => (
                <li key={event.id}><Link href={`/timeline#${event.id}`}>{event.title}<TaggedEvidence id={event.evidence} /></Link></li>
              ))}</ul>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
