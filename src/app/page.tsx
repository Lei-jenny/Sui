import Link from "next/link";
import { EvidenceLegend, Eyebrow, SectionHeading, WorkList } from "@/components/archive-ui";
import { TimelineBrowser } from "@/components/timeline-browser";
import {
  characters, evidenceLevels, numberLabel, scope, timelineEntries, timelinePeople, works,
} from "@/lib/data";

export default function Home() {
  const coreWorks = works.filter(({ role }) => role !== "supplementary");
  return (
    <>
      <section className="hero">
        <div className="site-container hero-inner">
          <div className="hero-copy">
            <Eyebrow>炎国叙事档案 / VOL. 01</Eyebrow>
            <h1>岁家档案<span aria-hidden="true">。</span></h1>
            <p className="hero-subtitle">从《洪炉示岁》到《辞岁行》</p>
            <p className="hero-description">十二位代理人，一部横跨千年的家族史。<br className="desktop-break" />按世界内时间梳理剧情，再回到作品与人物核对线索。</p>
            <div className="hero-actions">
              <Link href="#timeline" className="main-button">浏览时间线 <span aria-hidden="true">↓</span></Link>
              <Link href="/archive" className="ghost-button">阅读全档案 <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="art-code">FIG. 01 / YAN</span>
            <div className="art-seal"><span>歲</span></div>
            <span className="art-caption">十二代理人 · 岁陵卷宗</span>
          </div>
        </div>
      </section>
      <div className="catalog-strip">
        <div className="site-container catalog-inner">
          <div><strong>{numberLabel(characters.length)}</strong><span>岁家成员</span></div>
          <div><strong>{numberLabel(coreWorks.length)}</strong><span>主干作品</span></div>
          <div><strong>{numberLabel(timelineEntries.length)}</strong><span>时间线事件</span></div>
          <p>国服资料截至 <time dateTime={scope.cutoffDate}>{scope.cutoffDate}</time><span>· 全站含剧透</span></p>
        </div>
      </div>
      <div className="site-container main-grid home-main">
        <section id="timeline" aria-labelledby="timeline-heading">
          <SectionHeading id="timeline-heading" index="01 / CHRONOLOGY" title="世界内时间线" description="按事件发生顺序排列，而非活动上线顺序。" />
          <TimelineBrowser entries={timelineEntries} evidenceLevels={evidenceLevels} people={timelinePeople} limit={4} />
        </section>
        <aside className="home-aside" aria-label="证据说明与专题索引">
          <div className="panel sidebar-panel">
            <p className="edition-label">READING KEY</p>
            <h2>证据怎么读</h2>
            <EvidenceLegend levels={evidenceLevels} />
          </div>
          <div className="panel sidebar-panel focus-panel">
            <p className="edition-label">FEATURED FILES</p>
            <h2>专题档案</h2>
            <ul className="sidebar-links">
              <li><Link href="/characters/chongyue">重岳／朔 <span aria-hidden="true">↗</span></Link></li>
              <li><Link href="/characters/wang">望 <span aria-hidden="true">↗</span></Link></li>
              <li><Link href="/writing/zuo-le">左乐人物线 <span aria-hidden="true">↗</span></Link></li>
            </ul>
          </div>
        </aside>
      </div>
      <section className="site-container home-works" aria-labelledby="home-works">
        <SectionHeading id="home-works" index="02 / RELEASE ORDER" title="按作品阅读" description="八部主干作品按发布顺序排列；《镜中集》列为补充阅读。" />
        <WorkList items={works} />
      </section>
    </>
  );
}
