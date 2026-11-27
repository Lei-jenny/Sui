"use client";

import Link from "next/link";
import { useState } from "react";
import { EvidenceBadge } from "@/components/archive-ui";
import { characterHref, workHref, type Evidence, type TimelineEvent } from "@/lib/data";

type Entry = TimelineEvent & { workTitle?: string };
type Person = { id: string; name: string };

export function TimelineBrowser({ entries, evidenceLevels, people, limit }: {
  entries: Entry[];
  evidenceLevels: Evidence[];
  people: Person[];
  limit?: number;
}) {
  const [evidence, setEvidence] = useState("");
  const [person, setPerson] = useState("");
  const [expanded, setExpanded] = useState(false);
  const matching = entries.filter((entry) =>
    (!evidence || entry.evidence === evidence) && (!person || entry.characters.includes(person)),
  );
  const visible = expanded ? matching : matching.slice(0, limit);
  const names = new Map(people.map(({ id, name }) => [id, name]));

  return (
    <div className="timeline-browser">
      <div className="timeline-toolbar">
        <fieldset className="evidence-filter">
          <legend className="sr-only">按证据筛选</legend>
          {[{ id: "", label: "全部证据" }, ...evidenceLevels].map(({ id, label }) => (
            <button key={id} type="button" aria-pressed={evidence === id} onClick={() => setEvidence(id)}>{label}</button>
          ))}
        </fieldset>
        <label className="person-filter">
          <span className="sr-only">按人物筛选</span>
          <select value={person} onChange={(event) => setPerson(event.target.value)}>
            <option value="">全部人物</option>
            {people.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>
        </label>
      </div>
      <p className="results-count" role="status">共 {matching.length} 条记录{visible.length < matching.length && `，当前显示 ${visible.length} 条`}</p>
      {visible.length ? (
        <ol className="timeline-list">
          {visible.map((entry) => {
            const level = evidenceLevels.find(({ id }) => id === entry.evidence);
            if (!level) throw new Error(`Unknown evidence level for timeline event: ${entry.id}`);
            return (
              <li key={entry.id} className="timeline-event" id={entry.id}>
                <p className="event-period">{entry.period}</p>
                <article className="event-card">
                  <div className="event-title"><h3>{entry.title}</h3><EvidenceBadge level={level} /></div>
                  <p>{entry.summary}</p>
                  {(entry.workId || entry.characters.length > 0) && (
                    <div className="event-links">
                      {entry.workId && <Link className="event-work" href={workHref(entry.workId)}>《{entry.workTitle}》<span aria-hidden="true"> ↗</span></Link>}
                      {entry.characters.length > 0 && (
                        <ul className="chips" aria-label="相关人物">
                          {entry.characters.map((id) => <li key={id}><Link href={characterHref(id)}>{names.get(id)}</Link></li>)}
                        </ul>
                      )}
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="panel empty-state">
          <p>没有符合当前筛选条件的记录。</p>
          <button type="button" className="text-link" onClick={() => { setEvidence(""); setPerson(""); }}>清除筛选</button>
        </div>
      )}
      {limit !== undefined && matching.length > limit && (
        <button type="button" className="more-button" onClick={() => setExpanded(!expanded)}>
          {expanded ? "收起时间线" : `展开全部 ${matching.length} 条记录`} <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
        </button>
      )}
    </div>
  );
}
