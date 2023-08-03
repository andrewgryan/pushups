import { serveDir } from "https://deno.land/std@0.194.0/http/file_server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(
  "https://kixpbxytlkwqauqsckme.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeHBieHl0bGt3cWF1cXNja21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzIxNTksImV4cCI6MjAwNDUwODE1OX0.jHYoyq282s1Yhq382geJpeBhf5BGiN4ObnOPk9NBrzo"
);

Deno.serve(async (req: Request): Response => {
  if (req.method === "POST") {
    // Supabase client
    console.log({ supabase });

    const data = await req.formData();
    return new Response(`
      <h2>Submitted</h2>
      <div>Repetitions: ${data.get("repetitions")}</div>
      <div>Sets: ${data.get("sets")}</div>
    `);
  }
  return serveDir(req, { fsRoot: "./static" });
});
