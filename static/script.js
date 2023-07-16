import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(
  "https://kixpbxytlkwqauqsckme.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeHBieHl0bGt3cWF1cXNja21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzIxNTksImV4cCI6MjAwNDUwODE1OX0.jHYoyq282s1Yhq382geJpeBhf5BGiN4ObnOPk9NBrzo"
);

let { data: workouts, errpr } = await supabase
  .from("workouts")
  .select("pushup_count,workout_date");

// Render previous sessions
let ul = document.getElementById("sessions");
workouts.forEach((workout) => {
  let date = new Date(workout.workout_date);
  let li = document.createElement("li");
  li.appendChild(
    document.createTextNode(`${date.toLocaleString()}: ${workout.pushup_count}`)
  );
  ul.appendChild(li);
});

// Connect event to supabase
document.getElementById("btn").addEventListener("click", async (ev) => {
  // Get values from form
  let el = document.getElementById("counter");
  const count = el.value;
  const date = new Date();

  // Update form container
  let form = document.getElementById("form");
  form.innerHTML = `
    <h2>Submitted</h2>
    <div>Reps: ${count}</div>
    <div>Sets: 1</div>
  `;

  // Push to database
  const { data, error } = await supabase
    .from("workouts")
    .insert([{ pushup_count: count, workout_date: date }])
    .select();
});

// Chart.js
import {
  Chart,
  registerables,
} from "https://cdn.jsdelivr.net/npm/chart.js@4.3.0/+esm";
Chart.register(...registerables);
Chart.defaults.color = "white";
Chart.defaults.borderColor = "hsl(240deg 50% 50% / 0.3)";

const render = (data) => {
  new Chart(document.getElementById("chart"), {
    type: "line",
    data,
  });
};

const toLabels = (workouts) => {
  return workouts.map((workout, i) => i);
};

const toDatasets = (workouts) => {
  const reps = workouts.map((workout) => workout.pushup_count);
  const sets = workouts.map((workout) => 1);
  const total = workouts.map((workout) => workout.pushup_count);
  return [
    { label: "Reps", data: reps },
    { label: "Sets", data: sets },
    { label: "Total", data: total },
  ];
};

render({
  labels: toLabels(workouts),
  datasets: toDatasets(workouts),
});
