import suspendData from "./suspendData.ts";

// When requesting data from the server, we need to specify our own domain
// This might seem a little silly but it avoids the need to diverge code paths between client and server.
// If a HOST env variable is defined, use that; otherwise, we are probably in development, so reference the local server.
function getDenoHost() {
  return Deno.env.get("HOST") ?? `http://localhost:${Deno.env.get("PORT") ?? "8080"}`
}

const HOST = typeof Deno === "undefined" ? "" : getDenoHost()

export default function readJsonAPI<T>(
  endpoint: string,
  ...args: string[]
): T {
  const pathname = `${HOST}/api/${endpoint}${args.length > 0 ? "/" : ""}${args.join('/')}`;
  return suspendData(
    pathname,
    async () => {
      const response = await fetch(pathname);
      return await response.json() as T;
    },
  );
}
