import { serveDir } from "https://deno.land/std@0.194.0/http/file_server.ts";

Deno.serve(async (req: Request): Response => {
  if (req.method === "POST") {
    return new Response("<h1>POST</h1>");
  }
  return serveDir(req, { fsRoot: "./static" });
});
