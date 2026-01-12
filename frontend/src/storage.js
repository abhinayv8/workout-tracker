const KEY = "workout_data";

export function loadData() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : {};
}

export function saveExerciseData(exercise, sets) {
  const data = loadData();
  if (!data[exercise]) data[exercise] = [];
  data[exercise].push(...sets);
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getExerciseData(exercise) {
  const data = loadData();
  return data[exercise] || [];
}

export function clearAllData() {
  localStorage.removeItem(KEY);
}
