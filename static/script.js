import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(
  "https://kixpbxytlkwqauqsckme.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeHBieHl0bGt3cWF1cXNja21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzIxNTksImV4cCI6MjAwNDUwODE1OX0.jHYoyq282s1Yhq382geJpeBhf5BGiN4ObnOPk9NBrzo"
);

let { data: workouts, error } = await supabase
  .from("workouts")
  .select("repetitions,sets,workout_date");

// Render previous sessions
let ul = document.getElementById("sessions");
workouts.forEach((workout) => {
  let date = new Date(workout.workout_date);
  let li = document.createElement("li");
  li.appendChild(
    document.createTextNode(
      `${date.toLocaleString()}: ${workout.sets} ${workout.repetitions}`
    )
  );
  ul.appendChild(li);
});
