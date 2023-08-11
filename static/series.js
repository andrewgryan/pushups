import "https://cdn.plot.ly/plotly-2.24.1.min.js"
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(
  "https://kixpbxytlkwqauqsckme.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeHBieHl0bGt3cWF1cXNja21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzIxNTksImV4cCI6MjAwNDUwODE1OX0.jHYoyq282s1Yhq382geJpeBhf5BGiN4ObnOPk9NBrzo"
);

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
	  color: root.style.getPropertyValue("--text-4")
	}
}];
const m = 40;
const color = "#003441" // getComputedStyle(root).getPropertyValue("--surface-active");
const layout = {
	  title: {
	    text: "Progress",
	    font: {
	      color
	    }
	  },
	  plot_bgcolor: "transparent",
	  paper_bgcolor: "transparent",
	  margin: {
            t: m,
	    b: m,
	    l: m,
	    r: m
	  },
	xaxis: {
	  gridcolor: color,
	  tickfont: {
	    color
	  }
	},
	yaxis: {
	  gridcolor: color,
	  tickfont: {
	    color
	  },
          rangemode: "tozero"
	}
	};
const config = { responsive: true, displayModeBar: false };
Plotly.newPlot(el, data, layout, config);
