export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'callout'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'widget'; id: string };

export interface EducationCard {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export interface EducationSection {
  id: string;
  name: string;
  sub: string;
  cards: EducationCard[];
}

export interface GlossaryItem { term: string; def: string; }
export interface ContentData { sections: EducationSection[]; glossary: GlossaryItem[]; }

export interface QuizQuestion {
  q: string;
  choices: string[];
  answer: number;
  why: string;
  card: string;
}
export type QuizData = Partial<Record<'basics' | 'markets' | 'events' | 'craft', QuizQuestion[]>>;

export type Direction = 'up' | 'down' | 'mixed';
export interface MapNode { d: Direction; t: string; }
export interface MarketReaction { d: Direction; a: string; n: string; }
export interface EventScenario {
  ev: string;
  nodes: Record<string, MapNode>;
  mkts: Record<string, MarketReaction>;
  why: string;
  exp: string;
  nuance: string;
  /* geo shocks hit the dollar directly (safe-haven), not via the rate path */
  directUsd?: boolean;
}
export interface ImpactEvent {
  id: string;
  name: string;
  sub: string;
  meta: string;
  hotLabel: string;
  coolLabel: string;
  hot: EventScenario;
  cool: EventScenario;
}
export interface ImpactData {
  events: ImpactEvent[];
  nodeInfo: Record<string, { title: string; body: string }>;
  cheatSheet: { head: string[]; rows: string[][] };
  reactionGame: { roundLength: number; markets: string[]; description: string };
  positionSizeCalculator: {
    instruments: Record<string, { perPoint: number; caption: string }>;
    defaults: { account: number; riskPct: number; instrument: string; stopPoints: number };
    formula: string;
  };
  sessionClock: {
    timezone: string;
    sessions: Array<{ id: string; label: string; startMinutes: number; endMinutes: number }>;
    note: string;
  };
}

let contentRequest: Promise<ContentData> | undefined;
let quizzesRequest: Promise<QuizData> | undefined;
let impactRequest: Promise<ImpactData> | undefined;

function request<T>(path: string): Promise<T> {
  return fetch(path).then((response) => {
    if (!response.ok) throw new Error(`Unable to load ${path}`);
    return response.json() as Promise<T>;
  });
}

export function fetchEducationContent() {
  contentRequest ??= request<ContentData>('/education/content.json');
  return contentRequest;
}

export function fetchEducationQuizzes() {
  quizzesRequest ??= request<QuizData>('/education/quizzes.json');
  return quizzesRequest;
}

export function fetchEducationImpact() {
  impactRequest ??= request<ImpactData>('/education/impact.json');
  return impactRequest;
}
