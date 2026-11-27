import Link from "next/link";
import type { ReactNode } from "react";
import {
  characterHref, findCharacter, findEvidence, findPerson, numberLabel, relationLabels, workHref,
  type Character, type Evidence, type Work,
} from "@/lib/data";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span aria-hidden="true" />{children}</p>;
}

export function PageHeader({ code, title, description, back }: {
  code: string;
  title: string;
  description: string;
  back?: { href: string; label: string };
}) {
  return (
    <header className="page-header">
      <div className="site-container">
        {back && <Link className="back-link" href={back.href}>← {back.label}</Link>}
        <Eyebrow>{code}</Eyebrow>
        <h1>{title}</h1>
        <p className="page-intro">{description}</p>
      </div>
    </header>
  );
}

export function SectionHeading({ id, index, title, description }: {
  id: string;
  index?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="section-heading">
      {index && <Eyebrow>{index}</Eyebrow>}
      <h2 id={id}>{title}</h2>
      {description && <p className="muted">{description}</p>}
    </header>
  );
}

export function EvidenceBadge({ level }: { level: Evidence }) {
  return <span className={`evidence evidence-${level.id}`} title={level.description}>{level.label}</span>;
}

export function EvidenceLegend({ levels }: { levels: Evidence[] }) {
  return (
    <ul className="legend">
      {levels.map((level) => <li key={level.id}><EvidenceBadge level={level} /><span>{level.description}</span></li>)}
    </ul>
  );
}

export function TaggedEvidence({ id }: { id: string }) {
  const level = findEvidence(id);
  if (!level) throw new Error(`Unknown evidence level: ${id}`);
  return <EvidenceBadge level={level} />;
}

export function PersonLinks({ ids }: { ids: string[] }) {
  return (
    <ul className="chips">
      {ids.map((id) => {
        const person = findPerson(id);
        if (!person) throw new Error(`Unknown archive character: ${id}`);
        return <li key={id}><Link href={characterHref(id)}>{person.name}</Link></li>;
      })}
    </ul>
  );
}

export function WorkList({ items }: { items: Work[] }) {
  return (
    <ol className="work-list">
      {items.map((work) => (
        <li key={work.id}>
          <Link className="work-row" href={workHref(work.id)}>
            <span className="work-index">{numberLabel(work.releaseOrder)}</span>
            <span className="min-w-0"><strong>{work.title}</strong><span className="work-type">{work.type}</span></span>
            <span className="work-summary">{work.summary}</span>
            <span className="row-arrow" aria-hidden="true">↗</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Link className="character-card" href={characterHref(character.id)}>
      <span className="character-index">{numberLabel(character.order)} / 12</span>
      <strong>{character.name}</strong>
      <span className="character-domain">{character.domain.join(" · ")}</span>
      <span className="row-arrow" aria-hidden="true">↗</span>
      {character.focus && <span className="focus-tag">专题</span>}
    </Link>
  );
}

export function RelationCard({ relation }: {
  relation: { source: string; target: string; type: string; label: string };
}) {
  const from = findCharacter(relation.source);
  const to = findCharacter(relation.target);
  const kind = relationLabels[relation.type];
  if (!from || !to || !kind) throw new Error(`Invalid relationship: ${relation.source}/${relation.target}/${relation.type}`);
  return (
    <article className="panel relation-card">
      <span className="edition-label">{kind}</span>
      <h3><Link href={characterHref(from.id)}>{from.name}</Link><span aria-hidden="true">↔</span><Link href={characterHref(to.id)}>{to.name}</Link></h3>
      <p>{relation.label}</p>
    </article>
  );
}

export function Outline({ entries }: { entries: { href: string; label: string }[] }) {
  return (
    <nav className="panel outline" aria-label="本页目录">
      <p className="edition-label">本页目录</p>
      <ol>{entries.map(({ href, label }) => <li key={href}><Link href={href}>{label}</Link></li>)}</ol>
    </nav>
  );
}
