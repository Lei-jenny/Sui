import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceLegend, PageHeader, SectionHeading } from "@/components/archive-ui";
import { TimelineBrowser } from "@/components/timeline-browser";
import { evidenceLevels, timelineEntries, timelinePeople } from "@/lib/data";

export const metadata: Metadata = { title: "世界内时间线" };

export default function TimelinePage() {
  return (
    <>
      <PageHeader code="01 / CHRONOLOGY" title="世界内时间线" description="从岁被击败到《辞岁行》尾声。按事件发生顺序排列，早于发布的回忆也放回其历史位置。" />
      <div className="site-container main-grid page-content">
        <section aria-labelledby="all-events">
          <SectionHeading id="all-events" title="全部事件" description="证据和人物条件可同时使用。" />
          <TimelineBrowser entries={timelineEntries} evidenceLevels={evidenceLevels} people={timelinePeople} />
        </section>
        <aside className="panel sidebar-panel">
          <h2>证据说明</h2>
          <EvidenceLegend levels={evidenceLevels} />
          <Link className="text-link" href="/questions">查看未解问题 ↗</Link>
        </aside>
      </div>
    </>
  );
}
