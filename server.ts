import { serveFile } from "https://deno.land/std@0.58.0/http/file_server.ts";

Deno.serve((req: Request): Response => {
  let path;
  if (req.url === "/") {
    path = `${Deno.cwd()}/index.html`;
  } else {
    path = `${Deno.cwd()}/public${req.url}`;
  }
  const content = await serveFile(path);
  return new Response(content);
});
