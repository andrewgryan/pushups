import { serveDir } from "https://deno.land/std@0.194.0/http/file_server.ts";

Deno.serve(async (req: Request): Response => {
  if (req.method === "POST") {
    const data = await req.formData();
    console.log({ data });
    return new Response(`<h1>${data.get("secret")}</h1>`);
  }
  return serveDir(req, { fsRoot: "./static" });
});
