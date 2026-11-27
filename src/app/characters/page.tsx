import type { Metadata } from "next";
import Link from "next/link";
import { CharacterCard, PageHeader, SectionHeading } from "@/components/archive-ui";
import { characterHref, characters, supportingCharacters } from "@/lib/data";

export const metadata: Metadata = { title: "人物索引" };

export default function CharactersPage() {
  return (
    <>
      <PageHeader code="03 / PERSONNEL" title="人物索引" description="十二位岁家成员按排行归档。档案收录称呼、领域与《辞岁行》后的状态。" />
      <div className="site-container page-content">
        <ul className="character-grid">
          {characters.map((character) => <li key={character.id}><CharacterCard character={character} /></li>)}
        </ul>
        <section className="stack-section" aria-labelledby="supporting">
          <SectionHeading id="supporting" title="相关人物" />
          {supportingCharacters.map((person) => (
            <article key={person.id} className="panel sidebar-panel">
              <h3><Link className="text-link" href={characterHref(person.id)}>{person.name} ↗</Link></h3>
              <p>{person.arcSummary}</p>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
