import "https://cdn.plot.ly/plotly-2.24.1.min.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(
  "https://kixpbxytlkwqauqsckme.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeHBieHl0bGt3cWF1cXNja21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzIxNTksImV4cCI6MjAwNDUwODE1OX0.jHYoyq282s1Yhq382geJpeBhf5BGiN4ObnOPk9NBrzo"
);

// Push-ups
let { data: pushups } = await supabase
  .from("workouts")
  .select("sets,repetitions,workout_date");
const pushUpData = [
  {
    name: "Reps",
    x: pushups.map(({ workout_date }) => workout_date),
    y: pushups.map(({ repetitions }) => repetitions),
    marker: {
      color: "#4bb3a1",
    },
    line: { shape: "hv" },
  },
  {
    name: "Sets",
    x: pushups.map(({ workout_date }) => workout_date),
    y: pushups.map(({ sets }) => sets),
    marker: {
      color: "#d28a69",
    },
    line: { shape: "hv" },
  },
  {
    name: "Total",
    x: pushups.map(({ workout_date }) => workout_date),
    y: pushups.map(({ sets, repetitions }) => sets * repetitions),
    marker: {
      color: "#d2849c",
    },
    line: { shape: "hv" },
  },
];

// Planks
let { data: planks, error } = await supabase
  .from("plank")
  .select("seconds,workout_date,variation");

const root = document.documentElement;
const el = document.getElementById("series");
const keys = [
  ["straight-arm", "Straight arm", "#d2849c"],
  ["forearm", "Forearm", "#4bb3a1"],
  ["left-side", "Left side", "#d28a69"],
  ["right-side", "Right side", "#d28a69"],
  ["back", "Back", "#d28a69"],
];
const data = keys.map(([key, name, color]) => {
  return {
    name,
    x: planks
      .filter(({ variation }) => variation === key)
      .map(({ workout_date }) => workout_date),
    y: planks
      .filter(({ variation }) => variation === key)
      .map(({ seconds }) => seconds),
    marker: {
      color,
    },
    line: { shape: "hv" },
  };
});

const my = 40;
const ml = 40;
const mr = 10;
const family = "Tektur, cursive";
const color = "#006f87"; // getComputedStyle(root).getPropertyValue("--surface-active");
const titleColor = "#6ccdea";
const pushUpLayout = {
  title: {
    text: "Push-ups",
    font: {
      color: titleColor,
      family,
    },
  },
  yaxis: {
    color,
    gridcolor: color,
    rangemode: "tozero",
    tickfont: { color, family },
    title: {
      text: "Number",
      font: { color, family },
    },
  },
};
const layout = {
  title: {
    text: "Plank",
    font: {
      color: titleColor,
      family,
    },
  },
  showlegend: true,
  legend: {
    x: 0.75,
    xanchor: "right",
    y: 1.1,
    font: { color, family },
    orientation: "h",
  },
  plot_bgcolor: "transparent",
  paper_bgcolor: "transparent",
  margin: {
    t: my,
    b: my,
    l: ml,
    r: mr,
  },
  xaxis: {
    color,
    gridcolor: color,
    tickfont: { color, family },
  },
  yaxis: {
    color,
    gridcolor: color,
    rangemode: "tozero",
    tickfont: { color, family },
    title: {
      text: "seconds",
      font: { color, family },
    },
  },
};
const config = { responsive: true, displayModeBar: false };
Plotly.newPlot(el, data, layout, config);
Plotly.newPlot("repeated", pushUpData, { ...layout, ...pushUpLayout }, config);
