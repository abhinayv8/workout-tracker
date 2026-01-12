import { useState } from "react";
import SetTable from "./SetTable";
import ProgressChart from "./ProgressChart";
import { clearAllData } from "./storage";

<button
  onClick={() => {
    if (confirm("Delete ALL workout data?")) {
      clearAllData();
      location.reload();
    }
  }}
  style={{ marginBottom: 12 }}
>
  Clear all data
</button>

const WORKOUTS = {
  "Posterior Chain": [
    "Romanian Deadlift",
    "Hamstring Curls",
    "Calf Raises",
    "Farmer's Walk",
    "Glute Bridges",
  ],
  "Chest + Delts": [
    "Flat Bench",
    "Single Arm Cable Low",
    "Single Arm Cable High",
    "Lateral Raises",
    "Overhead Press",
  ],
  "Biceps + Triceps": [
    "Preacher Curl",
    "Incline Curl",
    "Crossbody Curl",
    "EZ Bar Curl",
    "Straight Bar Pushdown",
    "Rope Pushdown",
    "Overhead Katana",
    "Tricep Kickback",
  ],
  "Back": [
    "Vertical Pull",
    "Horizontal Pull",
    "Rows",
    "Rear Delt",
  ],
  "Legs": [
    "Squats",
    "Lunges",
    "Leg Extensions",
    "Farmer's Walk",
    "Tibia Curl",
  ],
};

// SAFE DEFAULTS (never hardcode names again)
const DEFAULT_CATEGORY = Object.keys(WORKOUTS)[0];
const DEFAULT_EXERCISE = WORKOUTS[DEFAULT_CATEGORY][0];

export default function Workouts() {
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [exercise, setExercise] = useState(DEFAULT_EXERCISE);
  const [forceDeload, setForceDeload] = useState(false);

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {/* ===== LEFT: CATEGORY SIDEBAR ===== */}
      <div style={{ width: 220 }}>
        {Object.keys(WORKOUTS).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setExercise(WORKOUTS[cat][0]); // reset to first exercise
            }}
            style={{
              width: "100%",
              marginBottom: 8,
              background: cat === category ? "#222632" : undefined,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ===== RIGHT: MAIN PANEL ===== */}
      <div style={{ flex: 1 }}>
        {/* EXERCISE SELECTOR (THIS WAS MISSING) */}
        <div style={{ marginBottom: 16 }}>
          {WORKOUTS[category].map((ex) => (
            <button
              key={ex}
              onClick={() => setExercise(ex)}
              style={{
                marginRight: 8,
                marginBottom: 8,
                background: ex === exercise ? "#222632" : undefined,
              }}
            >
              {ex}
            </button>
          ))}
        </div>

        <h2>{exercise}</h2>

        <label style={{ marginBottom: 12, display: "block" }}>
          <input
            type="checkbox"
            checked={forceDeload}
            onChange={(e) => setForceDeload(e.target.checked)}
          />{" "}
          Force deload week
        </label>

        <SetTable exercise={exercise} />

        <hr style={{ margin: "40px 0" }} />

        <ProgressChart
          exercise={exercise}
          forceDeload={forceDeload}
        />
      </div>
    </div>
  );
}
