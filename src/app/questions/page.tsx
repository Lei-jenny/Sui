import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceLegend, PageHeader, SectionHeading, TaggedEvidence } from "@/components/archive-ui";
import { evidenceLevels, numberLabel, openQuestions } from "@/lib/data";

export const metadata: Metadata = { title: "未解问题" };

export default function QuestionsPage() {
  return (
    <>
      <PageHeader code="05 / OPEN QUESTIONS" title="未解问题" description="这些线索仍有空白。将剧情留白保留为留白，不把合理解释当作定论。" />
      <div className="site-container page-content main-grid">
        <section aria-labelledby="question-list">
          <SectionHeading id="question-list" title="待核实的线索" />
          <ol className="stack-list">
            {openQuestions.map(({ id, question, status }, index) => (
              <li key={id} id={id} className="panel question-card">
                <span className="work-index">{numberLabel(index + 1)}</span>
                <h3>{question}</h3>
                <TaggedEvidence id={status} />
              </li>
            ))}
          </ol>
        </section>
        <aside className="panel sidebar-panel">
          <h2>证据怎么读</h2>
          <EvidenceLegend levels={evidenceLevels} />
          <Link className="text-link" href="/archive#open-questions">查看全档案中的说明 ↗</Link>
        </aside>
      </div>
    </>
  );
}
