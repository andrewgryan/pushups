import { serveDir } from "https://deno.land/std@0.194.0/http/file_server.ts";

Deno.serve(async (req: Request): Response => {
  return serveDir(req, { fsRoot: "./static" });
});
