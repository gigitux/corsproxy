import { serve } from "https://deno.land/std@0.146.0/http/server.ts";

const handler = async (request: Request): Promise<Response> => {
  const reqUrl = request.url.split("http://localhost:3000/")[1];

  const res = await fetch(reqUrl, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });

  const allowedHeaders = request.headers.get("Access-Control-Request-Headers"); // .headers wasn't specified, so reflect the request headers

  const response = await res.arrayBuffer();
  return new Response(response, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      Vary: "Origin",
      "Access-Control-Allow-Headers":
        allowedHeaders || "Authorization, Content-Type",
      "Access-Control-Allow-Credentials": "true",
    },
  });
};

console.log(`HTTP webserver running. Access it at: http://localhost:3000/`);
await serve(handler, { port: 3000 });
