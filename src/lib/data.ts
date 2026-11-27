import data from "../../content/site-data.json";

export const {
  characters,
  documents,
  evidenceLevels,
  openQuestions,
  relationships,
  scope,
  sources,
  supportingCharacters,
  updatedAt,
  writingHooks,
} = data;

export const works = [...data.works].sort((a, b) => a.releaseOrder - b.releaseOrder);
export const timeline = [...data.timeline].sort((a, b) => a.sortKey - b.sortKey);

export type Character = (typeof characters)[number];
export type Evidence = (typeof evidenceLevels)[number];
export type TimelineEvent = (typeof timeline)[number];
export type Work = (typeof works)[number];

export const findCharacter = (id: string) => characters.find((item) => item.id === id);
export const findPerson = (id: string) =>
  findCharacter(id) ?? supportingCharacters.find((item) => item.id === id);
export const findWork = (id: string) => works.find((item) => item.id === id);
export const findEvidence = (id: string) => evidenceLevels.find((item) => item.id === id);
export const workHref = (id: string) => `/stories/${id}`;
export const characterHref = (id: string) => `/characters/${id}`;
export const numberLabel = (index: number) => String(index).padStart(2, "0");

export const timelineEntries = timeline.map((entry) => {
  if (!entry.workId) return entry;
  const work = findWork(entry.workId);
  if (!work) throw new Error(`Unknown work for timeline event: ${entry.id}`);
  return { ...entry, workTitle: work.title };
});

export const timelinePeople = characters.map(({ id, name }) => ({ id, name }));

export const relationLabels: Record<string, string> = {
  "siblings-conflict": "理念分歧",
  "intellectual-bond": "知己与代偿",
  "trusted-accountability": "信任与问责",
  "dream-alliance": "梦中协作",
  "protective-distance": "同行与保护",
  "siblings-growth": "手足与成长",
};
