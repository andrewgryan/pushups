import "https://cdn.plot.ly/plotly-2.24.1.min.js"

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
