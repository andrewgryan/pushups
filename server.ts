const HTML = await Deno.readFile("./index.html");

Deno.serve(async (req: Request): Response => {
  return new Response(HTML, { "content-type": "text/html" });
});
