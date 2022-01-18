import suspendData from "./suspendData.ts";

export default function readJsonAPI<T>(
  endpoint: string,
  specifier?: string,
): T {
  const pathname = `/api/${endpoint}${specifier ? `/${specifier}` : ""}`;
  return suspendData(
    pathname,
    async () => {
      const response = await fetch(pathname);
      return await response.json() as T;
    },
  );
}
