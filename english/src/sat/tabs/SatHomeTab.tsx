// =============================================================================
// SAT — Home / overview tab.
// -----------------------------------------------------------------------------
// Explains the Digital SAT (two sections — Reading & Writing and Math, two
// adaptive modules each), the 200–800 per-section / 400–1600 total scale, and
// the per-module timing. Quick-start cards jump into a study tab via onGo. A
// short Mongolian subtitle frames the page for learners.
// =============================================================================
import React from 'react';
import {
  BookOpen, Sigma, BookA, ClipboardList, GraduationCap, Award, Clock,
  Layers, ArrowRight,
} from 'lucide-react';
import { useTheme } from '../../../../frontend/src/lib/theme';
import { SatTabKey } from '../SatApp';

const SECTIONS: {
  icon: React.ElementType;
  name: string;
  mn: string;
  detail: string;
  modules: string;
}[] = [
  {
    icon: BookOpen,
    name: 'Reading & Writing',
    mn: 'Унших ба Бичих',
    detail: '54 асуулт · 4 ноорхой домэйн · богино эх бичвэртэй',
    modules: '2 модуль · 32 минут / модуль · 27 асуулт / модуль',
  },
  {
    icon: Sigma,
    name: 'Math',
    mn: 'Математик',
    detail: '44 асуулт · сонголттой + нөхөх (grid-in) · тооны машин зөвшөөрнө',
    modules: '2 модуль · 35 минут / модуль · 22 асуулт / модуль',
  },
];

const QUICK: { tab: SatTabKey; icon: React.ElementType; title: string; mn: string }[] = [
  { tab: 'rw', icon: BookOpen, title: 'Reading & Writing', mn: 'Дөрвөн домэйнаар дасгал хийх' },
  { tab: 'math', icon: Sigma, title: 'Math', mn: 'Алгебр, геометр, өгөгдөл шинжлэх' },
  { tab: 'vocab', icon: BookA, title: 'Vocabulary', mn: 'SAT үгийн флэшкарт сурах' },
  { tab: 'tests', icon: ClipboardList, title: 'Practice Tests', mn: 'Бүрэн дасгал шалгалт өгөх' },
];

export default function SatHomeTab({ onGo }: { onGo: (tab: SatTabKey) => void }) {
  const uiTheme = useTheme();
  const gold = uiTheme === 'gold';
  const aurora = uiTheme === 'aurora';
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-10">
      <section className={gold || aurora ? "rounded-3xl bg-surface-container p-7 sm:p-9" : "rounded-3xl bg-ink-raise p-7 sm:p-9"}>
        <span className={gold || aurora ? "inline-flex items-center gap-1.5 rounded-full bg-surface-container-high text-on-surface px-3 py-1 text-xs font-bold" : "inline-flex items-center gap-1.5 rounded-full bg-ink-2 text-paper px-3 py-1 text-xs font-bold"}>
          <GraduationCap className="w-4 h-4" /> Digital SAT бэлтгэл
        </span>
        <h1 className={gold || aurora ? "text-3xl sm:text-4xl font-space font-light tracking-tight text-on-surface mt-4" : "text-3xl sm:text-4xl font-serif font-light tracking-tight text-paper mt-4"}>
          Score higher on the Digital SAT
        </h1>
        <p className={gold || aurora ? "text-on-surface-variant text-lg mt-2" : "text-paper-2 text-lg mt-2"}>
          Унших ба Бичих, Математик — хоёр хэсгийг адаптив модулиар дадлагажуулж,
          бодит шалгалтын бүтэцтэй танилцаарай.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => onGo('tests')}
            className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-secondary text-white px-6 py-3 font-bold" : "inline-flex items-center gap-2 rounded-full bg-paper text-ink px-6 py-3 font-bold"}
          >
            <ClipboardList className="w-4 h-4" /> Дасгал шалгалт өгөх
          </button>
          <button
            onClick={() => onGo('rw')}
            className={gold || aurora ? "inline-flex items-center gap-2 rounded-full bg-surface-container-high text-on-surface px-6 py-3 font-bold hover:bg-surface-container" : "inline-flex items-center gap-2 rounded-full bg-ink-2 text-paper px-6 py-3 font-bold hover:bg-ink-raise"}
          >
            Дадлага эхлүүлэх <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section>
        <h2 className={gold || aurora ? "text-xl font-bold text-on-surface mb-4" : "text-xl font-bold text-paper mb-4"}>
          Two sections · Хоёр хэсэг
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <div key={s.name} className={gold || aurora ? "rounded-2xl bg-surface-container p-5 flex gap-4" : "rounded-2xl bg-ink-raise p-5 flex gap-4"}>
              <span className={gold || aurora ? "rounded-2xl bg-surface-container-high text-on-surface p-3 h-fit" : "rounded-2xl bg-ink-2 text-paper p-3 h-fit"}>
                <s.icon className="w-6 h-6" />
              </span>
              <div>
                <h3 className={gold || aurora ? "font-bold text-on-surface" : "font-bold text-paper"}>
                  {s.name} <span className={gold || aurora ? "text-on-surface-variant font-normal" : "text-paper-2 font-normal"}>· {s.mn}</span>
                </h3>
                <p className={gold || aurora ? "text-sm text-on-surface-variant mt-1" : "text-sm text-paper-2 mt-1"}>{s.detail}</p>
                <p className={gold || aurora ? "text-sm text-on-surface-variant mt-1 inline-flex items-center gap-1.5" : "text-sm text-paper-2 mt-1 inline-flex items-center gap-1.5"}>
                  <Layers className={gold || aurora ? "w-4 h-4 text-on-surface" : "w-4 h-4 text-paper"} /> {s.modules}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className={gold || aurora ? "rounded-2xl bg-surface-container p-6" : "rounded-2xl bg-ink-raise p-6"}>
          <h2 className={gold || aurora ? "font-bold text-on-surface flex items-center gap-2" : "font-bold text-paper flex items-center gap-2"}>
            <Award className={gold || aurora ? "w-5 h-5 text-on-surface" : "w-5 h-5 text-paper"} /> Scoring 400–1600
          </h2>
          <p className={gold || aurora ? "text-on-surface-variant text-sm mt-2" : "text-paper-2 text-sm mt-2"}>
            Хэсэг бүр <span className={gold || aurora ? "font-bold text-on-surface" : "font-bold text-paper"}>200–800</span> оноотой.
            Хоёр хэсгийн нийлбэр нь нийт{' '}
            <span className={gold || aurora ? "font-bold text-on-surface" : "font-bold text-paper"}>400–1600</span> оноо болно.
          </p>
          <ul className={gold || aurora ? "mt-3 space-y-1.5 text-sm text-on-surface" : "mt-3 space-y-1.5 text-sm text-paper"}>
            <li><span className={gold || aurora ? "font-bold text-on-surface" : "font-bold text-paper"}>1400+</span> — маш өндөр, шилдэг сургуульд</li>
            <li><span className={gold || aurora ? "font-bold text-on-surface" : "font-bold text-paper"}>1200</span> — дунджаас дээгүүр</li>
            <li><span className={gold || aurora ? "font-bold text-on-surface" : "font-bold text-paper"}>1050</span> — улсын дундаж орчим</li>
            <li><span className={gold || aurora ? "font-bold text-on-surface" : "font-bold text-paper"}>400</span> — доод хязгаар</li>
          </ul>
        </div>
        <div className={gold || aurora ? "rounded-2xl bg-surface-container p-6" : "rounded-2xl bg-ink-raise p-6"}>
          <h2 className={gold || aurora ? "font-bold text-on-surface flex items-center gap-2" : "font-bold text-paper flex items-center gap-2"}>
            <Clock className={gold || aurora ? "w-5 h-5 text-on-surface" : "w-5 h-5 text-paper"} /> Timing & adaptivity
          </h2>
          <p className={gold || aurora ? "text-on-surface-variant text-sm mt-2" : "text-paper-2 text-sm mt-2"}>
            Тоон SAT нь адаптив: эхний модулийн гүйцэтгэлээс хоёр дахь модулийн
            хүндрэл шийдэгдэнэ. Нийт ~2 цаг 14 минут.
          </p>
          <ul className={gold || aurora ? "mt-3 space-y-2 text-sm text-on-surface" : "mt-3 space-y-2 text-sm text-paper"}>
            <li>
              <span className="font-bold">Reading & Writing</span> — модуль тутамд 32 минут.
            </li>
            <li>
              <span className="font-bold">Math</span> — модуль тутамд 35 минут.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className={gold || aurora ? "text-xl font-bold text-on-surface mb-4" : "text-xl font-bold text-paper mb-4"}>Quick start · Хурдан эхлэх</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK.map((q) => (
            <button
              key={q.tab}
              onClick={() => onGo(q.tab)}
              className={gold || aurora ? "group text-left rounded-2xl bg-surface-container hover:bg-surface-container-high p-5 transition-colors" : "group text-left rounded-2xl bg-ink-raise hover:bg-ink-2 p-5 transition-colors"}
            >
              <span className={gold || aurora ? "rounded-2xl bg-surface-container-high text-on-surface p-2.5 inline-flex" : "rounded-2xl bg-ink-2 text-paper p-2.5 inline-flex"}>
                <q.icon className="w-5 h-5" />
              </span>
              <h3 className={gold || aurora ? "font-bold text-on-surface mt-3" : "font-bold text-paper mt-3"}>{q.title}</h3>
              <p className={gold || aurora ? "text-sm text-on-surface-variant mt-1" : "text-sm text-paper-2 mt-1"}>{q.mn}</p>
              <span className={gold || aurora ? "mt-3 inline-flex items-center gap-1 text-on-surface text-sm font-semibold" : "mt-3 inline-flex items-center gap-1 text-paper text-sm font-semibold"}>
                Эхлэх <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
