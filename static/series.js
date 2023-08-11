import "https://cdn.plot.ly/plotly-2.24.1.min.js"
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(
  "https://kixpbxytlkwqauqsckme.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeHBieHl0bGt3cWF1cXNja21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzIxNTksImV4cCI6MjAwNDUwODE1OX0.jHYoyq282s1Yhq382geJpeBhf5BGiN4ObnOPk9NBrzo"
);

let { data: planks, error } = await supabase
  .from("plank")
  .select("seconds,workout_date");

const el = document.getElementById('series');
const data = [{
	name: "Plank duration",
	x: [1, 2, 3, 4, 5, 6],
	y: [1, 2, 4, 8, 16, 1] }];
const m = 20;
const layout = {
	  title: "Progress",
	  plot_bgcolor: "transparent",
	  paper_bgcolor: "transparent",
	  margin: {
            t: m,
	    b: m,
	    l: m,
	    r: m
	  }
	};
const config = { responsive: true};
Plotly.newPlot(el, data, layout, config);
