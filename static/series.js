import "https://cdn.plot.ly/plotly-2.24.1.min.js"
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(
  "https://kixpbxytlkwqauqsckme.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeHBieHl0bGt3cWF1cXNja21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzIxNTksImV4cCI6MjAwNDUwODE1OX0.jHYoyq282s1Yhq382geJpeBhf5BGiN4ObnOPk9NBrzo"
);

// Push-ups
let { data: pushups } = await supabase
  .from("workouts")
  .select("sets,repetitions,workout_date");
const pushUpData = [{
	name: "Reps",
	x: pushups.map(({ workout_date }) => workout_date),
	y: pushups.map(({ repetitions}) => repetitions),
	marker: {
	  color: "#4bb3a1"
	}
}];

// Planks
let { data: planks, error } = await supabase
  .from("plank")
  .select("seconds,workout_date");

const x = planks.map(({ workout_date }) => workout_date);
const y = planks.map(({ seconds }) => seconds);

const root = document.documentElement;
const el = document.getElementById('series');
const data = [{
	name: "Plank duration",
	x,
	y,
	marker: {
	  color: "#4bb3a1"
	}
}];
const my = 40;
const ml = 40;
const mr = 10;
const family = "Tektur, cursive";
const color = "#006f87" // getComputedStyle(root).getPropertyValue("--surface-active");
const layout = {
	  title: {
	    text: "Plank",
	    font: {
	      color,
	      family
	    }
	  },
	  showlegend: true,
	  legend: {
            x: 0.5,
            xanchor: 'right',
            y: 1.1,
	    font: { color, family }
	  },
	  plot_bgcolor: "transparent",
	  paper_bgcolor: "transparent",
	  margin: {
            t: my,
	    b: my,
	    l: ml,
	    r: mr
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
	    font: { color, family }
	  }
	}
	};
const config = { responsive: true, displayModeBar: false };
Plotly.newPlot(el, data, layout, config);
Plotly.newPlot("repeated", pushUpData, layout, config);
