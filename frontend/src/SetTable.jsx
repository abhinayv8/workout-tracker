import { useState } from "react";
import { saveExerciseData } from "./storage";

export default function SetTable({ exercise }) {
  const now = new Date();

  const [date] = useState(now.toISOString().slice(0, 10));
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });

  const [rows, setRows] = useState([
    { set_number: 1, reps: "", weight: "" },
  ]);

  function updateRow(i, field, value) {
    const copy = [...rows];
    copy[i][field] = value;
    setRows(copy);
  }

  function addRow() {
    setRows([
      ...rows,
      { set_number: rows.length + 1, reps: "", weight: "" },
    ]);
  }

  function save() {
    const sets = rows.map((r) => ({
      date,
      day_name: dayName,
      set_number: r.set_number,
      reps: Number(r.reps),
      weight: Number(r.weight),
    }));

    saveExerciseData(exercise, sets);
    alert("Saved locally");
  }

  return (
    <div>
      <p style={{ color: "#9aa0a6" }}>
        {dayName} · {date}
      </p>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Set</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.set_number}</td>
              <td>
                <input
                  value={r.reps}
                  onChange={(e) =>
                    updateRow(i, "reps", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={r.weight}
                  onChange={(e) =>
                    updateRow(i, "weight", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow} style={{ marginTop: 8 }}>
        + Add Set
      </button>

      <br />

      <button onClick={save} style={{ marginTop: 12 }}>
        Save Workout
      </button>
    </div>
  );
}
