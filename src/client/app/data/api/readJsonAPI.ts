import suspendData from "./suspendData.ts";

export default function readJsonAPI<T>(
  endpoint: string,
  ...args: string[]
): T {
  const pathname = `/api/${endpoint}${args.map((arg) => `/${arg}`)}`;
  return suspendData(
    pathname,
    async () => {
      const response = await fetch(pathname);
      return await response.json() as T;
    },
  );
}
