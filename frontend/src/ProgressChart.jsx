import { useEffect, useState } from "react";
import { getExerciseData } from "./storage";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* -------------------- CONSTANTS -------------------- */

const COLORS = [
  "#4f8cff",
  "#22c55e",
  "#f97316",
  "#e11d48",
  "#a855f7",
  "#14b8a6",
];

/* -------------------- HELPERS -------------------- */

// Epley formula
function estimate1RM(weight, reps) {
  return Math.round(weight * (1 + reps / 30));
}

function getBlockWeek(dateStr, startDate) {
  const diffDays =
    (new Date(dateStr) - startDate) / (1000 * 60 * 60 * 24);
  return Math.floor(diffDays / 7) + 1;
}

function getPRs(grouped, metric) {
  const prs = {};

  Object.entries(grouped).forEach(([set, values]) => {
    let best = values[0];
    values.forEach((v) => {
      if (v[metric] > best[metric]) {
        best = v;
      }
    });
    prs[set] = best;
  });

  return prs;
}

/* -------------------- COMPONENT -------------------- */

export default function ProgressChart({ exercise, forceDeload }) {
  const [data, setData] = useState([]);
  const [metric, setMetric] = useState("weight");

  if (!exercise) return null;

  /* ---------- fetch ---------- */
  useEffect(() => {
  const data = getExerciseData(exercise);
  setData(data);
}, [exercise]);

  if (!data.length) {
    return <p style={{ color: "#9aa0a6" }}>No data yet</p>;
  }

  /* ---------- group by set ---------- */
  const grouped = {};
  data.forEach((d) => {
    if (!grouped[d.set_number]) grouped[d.set_number] = [];
    grouped[d.set_number].push(d);
  });

  Object.values(grouped).forEach((g) =>
    g.sort((a, b) => new Date(a.date) - new Date(b.date))
  );

  /* ---------- block logic ---------- */
  const blockStart = new Date(
    Object.values(grouped)[0][0].date
  );

  const currentWeek = getBlockWeek(
    data[data.length - 1].date,
    blockStart
  );

  const isDeload = forceDeload || currentWeek % 4 === 0;

  /* ---------- PRs ---------- */
  const prs = isDeload ? {} : getPRs(grouped, metric);

  /* ---------- stats ---------- */
  const sessions = new Set(data.map((d) => d.date)).size;

  const bestSet = data.reduce((a, b) =>
    b.weight > a.weight ? b : a
  );

  const best1RM = Math.max(
    ...data.map((d) => estimate1RM(d.weight, d.reps))
  );

  const base = Object.values(grouped)[0];

  /* -------------------- RENDER -------------------- */

  return (
    <div>
      {/* STATS PANEL */}
      <div
        style={{
          background: "#181b20",
          padding: "16px 20px",
          borderRadius: 8,
          marginBottom: 20,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 16,
          textAlign: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>
            Week {currentWeek}
          </div>
          <div style={{ color: "#9aa0a6", fontSize: 13 }}>
            Block
          </div>
        </div>

        <div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>
            {sessions}
          </div>
          <div style={{ color: "#9aa0a6", fontSize: 13 }}>
            Sessions
          </div>
        </div>

        <div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>
            {bestSet.weight} kg
          </div>
          <div style={{ color: "#9aa0a6", fontSize: 13 }}>
            Best Set
          </div>
        </div>

        <div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>
            {best1RM} kg
          </div>
          <div style={{ color: "#9aa0a6", fontSize: 13 }}>
            Best 1RM
          </div>
        </div>
      </div>

      {isDeload && (
        <p style={{ color: "#facc15", marginBottom: 12 }}>
          Deload week — PRs paused
        </p>
      )}

      {/* METRIC TOGGLE */}
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setMetric("weight")}
          style={{
            marginRight: 8,
            background:
              metric === "weight" ? "#222632" : undefined,
          }}
        >
          Weight
        </button>
        <button
          onClick={() => setMetric("reps")}
          style={{
            background:
              metric === "reps" ? "#222632" : undefined,
          }}
        >
          Reps
        </button>
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={base}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          {Object.entries(grouped).map(([set, values], idx) => (
            <Line
              key={set}
              data={values}
              dataKey={metric}
              name={`Set ${set}`}
              stroke={COLORS[idx % COLORS.length]}
              strokeWidth={2}
              dot={(p) => {
                const isPR =
                  !isDeload &&
                  prs[set] &&
                  p.payload.date === prs[set].date &&
                  p.payload[metric] === prs[set][metric];

                return (
                  <circle
                    cx={p.cx}
                    cy={p.cy}
                    r={isPR ? 6 : 3}
                    fill={
                      isPR
                        ? "#facc15"
                        : COLORS[idx % COLORS.length]
                    }
                  />
                );
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
