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
	  color: "#4bb3a1"
	}
}];
const my = 40;
const mx = 20;
const color = "#006f87" // getComputedStyle(root).getPropertyValue("--surface-active");
const layout = {
	  title: {
	    text: "Plank",
	    font: {
	      color
	    }
	  },
	  showlegend: true,
	  legend: {
            x: 0,
            xanchor: 'right',
            y: 1,
	    font: { color }
	  },
	  plot_bgcolor: "transparent",
	  paper_bgcolor: "transparent",
	  margin: {
            t: my,
	    b: my,
	    l: mx,
	    r: mx
	  },
	xaxis: {
	  color,
	  gridcolor: color
	},
	yaxis: {
          color,
          gridcolor: color,
          rangemode: "tozero"
	}
	};
const config = { responsive: true, displayModeBar: false };
Plotly.newPlot(el, data, layout, config);
