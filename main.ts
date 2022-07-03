import { serve } from "https://deno.land/std@0.146.0/http/server.ts";

const port = 8080;

const handler = async (request: Request): Promise<Response> => {
  const reqUrl = request.url.split("http://localhost:3000/")[1];

  const res = await fetch(reqUrl, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });

  const allowedHeaders = request.headers.get("Access-Control-Request-Headers"); // .headers wasn't specified, so reflect the request headers

  console.log(allowedHeaders);

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

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port: 3000 });
