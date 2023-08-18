import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.194.0/http/file_server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(
  "https://kixpbxytlkwqauqsckme.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeHBieHl0bGt3cWF1cXNja21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzIxNTksImV4cCI6MjAwNDUwODE1OX0.jHYoyq282s1Yhq382geJpeBhf5BGiN4ObnOPk9NBrzo"
);

Deno.serve(async (req: Request): Response => {
  if (req.method === "GET") {
    const { pathname, searchParams } = new URL(req.url);
    if (pathname === "/activity") {
      const activity = searchParams.get("activity");
      return serveFile(req, `./static/forms/${activity}.html`);
    }
  }
  if (req.method === "POST") {
    // Form data
    const formData = await req.formData();
    const activity = formData.get("activity");
    let table;
    let row;
    const workout_date = new Date();
    if (activity === "push-up") {
      table = "workouts";
      const repetitions = formData.get("repetitions");
      const sets = formData.get("sets");
      row = {
        repetitions,
        sets,
        workout_date,
      };
    } else {
      table = "plank";
      const seconds = formData.get("seconds");
      row = {
        seconds,
        workout_date,
      };
    }

    // Set row in database
    const { data, error } = await supabase.from(table).insert([row]).select();

    console.log({ data, error });

    return new Response(`
      <h2>Submitted</h2>
    `);
  }
  return serveDir(req, { fsRoot: "./static" });
});
