import { Hono } from "https://deno.land/x/hono/mod.ts";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(
  "https://kixpbxytlkwqauqsckme.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeHBieHl0bGt3cWF1cXNja21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MzIxNTksImV4cCI6MjAwNDUwODE1OX0.jHYoyq282s1Yhq382geJpeBhf5BGiN4ObnOPk9NBrzo"
);

const app = new Hono();

app.get("/activity", async (c) => {
  const { activity } = c.req.query();
  const text = await Deno.readFile(`./static/forms/${activity}.html`);
  return c.html(text);
});

app.get("/login", async (c) => {
  // TODO add a client side login auth flow
  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const key = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const redirectTo =
    Deno.env.get("SUPABASE_REDIRECT_URL") ?? "http://localhost:3000";
  const header = c.req.headers.get("Authorization")!;
  return c.html(`
      <script type="module">
      import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
      const supabase = createClient("${url}", "${key}", {
          global: {
            headers: { Authorization: "${header}" },
          },
        }
      );
      document.getElementById("login").addEventListener("click", () => {
        supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: ${redirectTo}
          }
        })
      })
      </script>
      <h1>Hello, World!</h1>
      <button id="login">Login</button>
    `);
});

app.get("/user", async (c) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: c.req.headers.get("Authorization")! },
        },
      }
    );
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    return c.json({ user });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});

app.post("*", async (c) => {
  // Form data
  const formData = await c.req.formData();
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
    const variation = formData.get("variation");
    row = {
      seconds,
      workout_date,
      variation,
    };
  }

  // Set row in database
  const { data, error } = await supabase.from(table).insert([row]).select();

  console.log({ data, error });

  // Return confirmation that a workout has been submitted
  return new Response(`<h2>Submitted</h2>`, {
    headers: {
      "HX-Trigger": "workout-submit",
    },
  });
});

app.use("*", serveStatic({ root: "./static" }));

Deno.serve(app.fetch);
