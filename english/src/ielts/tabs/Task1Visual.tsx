// =============================================================================
// IELTS — Academic Writing Task 1 visual renderer.
// -----------------------------------------------------------------------------
// Task 1 prompts say "the bar chart below" / "the diagram below", so the learner
// must actually SEE the data. This draws the referenced graphic from structured
// data: a grouped SVG bar chart, or a left-to-right process diagram of chips.
// Colours come from the Aurora Atelier tokens (paper = bright, paper-2 = muted)
// so the chart reads clearly on the dark ink-raise card.
// =============================================================================
import React from 'react';
import { ChevronRight } from 'lucide-react';

export type Task1Chart =
  | {
      kind: 'bar';
      /** Unit shown on the y-axis, e.g. "kWh per month". */
      unit: string;
      /** One label per grouped series, e.g. ['2005', '2020']. */
      years: string[];
      /** One entry per category; values align with `years`. */
      series: { name: string; values: number[] }[];
    }
  | {
      kind: 'process';
      /** Ordered stage labels rendered as chips with arrows between them. */
      stages: string[];
    };

// Bright + muted series fills so the two year-groups stay distinct on dark.
const SERIES_FILLS = ['#9b9893', '#ededeb']; // paper-2 (older), paper (newer)
const GRID = '#3a3a3a'; // ink-line-2
const AXIS_TEXT = '#9b9893'; // paper-2

/** Round a max value up to a clean axis ceiling and pick a tick step. */
function niceScale(max: number): { ceil: number; step: number } {
  const rough = max / 5;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const candidates = [1, 2, 2.5, 5, 10].map((m) => m * mag);
  const step = candidates.find((c) => c >= rough) ?? candidates[candidates.length - 1];
  return { ceil: Math.ceil(max / step) * step, step };
}

function BarChart({ unit, years, series }: Extract<Task1Chart, { kind: 'bar' }>) {
  const W = 640;
  const H = 340;
  const M = { top: 16, right: 16, bottom: 52, left: 60 };
  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;

  const maxVal = Math.max(...series.flatMap((s) => s.values), 0);
  const { ceil, step } = niceScale(maxVal);
  const ticks: number[] = [];
  for (let v = 0; v <= ceil; v += step) ticks.push(v);

  const y = (v: number) => M.top + plotH - (v / ceil) * plotH;

  const groupW = plotW / series.length;
  const barCount = years.length;
  const barW = (groupW * 0.62) / barCount;
  const groupPad = (groupW - barW * barCount) / 2;

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Bar chart, ${unit}`}
        className="w-full h-auto"
      >
        {/* y-axis gridlines + labels */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={M.left} x2={W - M.right} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={1} />
            <text
              x={M.left - 8}
              y={y(t)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={12}
              fill={AXIS_TEXT}
            >
              {t.toLocaleString('en-US')}
            </text>
          </g>
        ))}

        {/* bars, grouped per category */}
        {series.map((cat, ci) => {
          const gx = M.left + ci * groupW + groupPad;
          return (
            <g key={cat.name}>
              {cat.values.map((v, yi) => {
                const bx = gx + yi * barW;
                const by = y(v);
                return (
                  <g key={yi}>
                    <rect x={bx} y={by} width={barW - 3} height={M.top + plotH - by} fill={SERIES_FILLS[yi % SERIES_FILLS.length]} rx={2} />
                    <text
                      x={bx + (barW - 3) / 2}
                      y={by - 5}
                      textAnchor="middle"
                      fontSize={11}
                      fill={AXIS_TEXT}
                    >
                      {v.toLocaleString('en-US')}
                    </text>
                  </g>
                );
              })}
              <text
                x={M.left + ci * groupW + groupW / 2}
                y={M.top + plotH + 20}
                textAnchor="middle"
                fontSize={13}
                fill="#ededeb"
              >
                {cat.name}
              </text>
            </g>
          );
        })}

        {/* baseline */}
        <line x1={M.left} x2={W - M.right} y1={y(0)} y2={y(0)} stroke={AXIS_TEXT} strokeWidth={1.5} />
      </svg>

      <figcaption className="mt-2 flex items-center justify-center gap-4 text-xs text-paper-2">
        {years.map((yr, i) => (
          <span key={yr} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: SERIES_FILLS[i % SERIES_FILLS.length] }}
            />
            {yr}
          </span>
        ))}
        <span className="text-paper-3">({unit})</span>
      </figcaption>
    </figure>
  );
}

function ProcessDiagram({ stages }: Extract<Task1Chart, { kind: 'process' }>) {
  return (
    <ol className="flex flex-wrap items-stretch gap-2 m-0 list-none p-0">
      {stages.map((stage, i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-xl bg-ink-2 px-3 py-2 text-sm text-paper">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper text-ink text-xs font-bold">
              {i + 1}
            </span>
            {stage}
          </span>
          {i < stages.length - 1 && <ChevronRight className="w-4 h-4 text-paper-2 shrink-0" />}
        </li>
      ))}
    </ol>
  );
}

export function Task1Visual({ chart }: { chart: Task1Chart }) {
  return (
    <div className="rounded-xl bg-ink-2 p-4">
      {chart.kind === 'bar' ? <BarChart {...chart} /> : <ProcessDiagram {...chart} />}
    </div>
  );
}
