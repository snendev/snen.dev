import { HandlerContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  // const randomIndex = Math.floor(Math.random() * JOKES.length);
  // const body = JOKES[randomIndex];
  return new Response("Not implemented");
};
