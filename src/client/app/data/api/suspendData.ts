// @ts-ignore Type not exposed yet
import SuspenseRef from "./SuspenseRef.ts";

const _globalCache = new Map<string, SuspenseRef<unknown>>();

function getCache(): Map<string, SuspenseRef<unknown>> {
  return _globalCache;
}

/**
 * readAsyncData is a simple in-render reader for remote data.
 * It works with the above cache to process async work through the AsyncRef class.
 *
 * Rather than caching every Response or whatever type, the user must simply clarify how to yield
 * a "resolved" response.
 * Since React could suspend and re-try rendering at any time, it is critical that there is no way
 * to call e.g. some Response.body.text() stream more than once.
 * This is a pretty hard API choice to make as a library maintainer, since it is hard to steer
 * users away from incorrect usage, so I sympathize with the react-fetch team.
 * But I'm ignoring this problem.
 *
 * There's also no cache lock here, so keys should be unique per usage of suspendData -- it is
 * less concerning to consider only the race between a component and its next render.
 */
export default function suspendData<T>(
  key: string,
  getAsyncResult: () => Promise<T>,
): T {
  const cache = getCache();
  const cachedRef = cache.get(key) as SuspenseRef<T> | undefined;
  const ref = cachedRef ?? new SuspenseRef(getAsyncResult());
  if (!cachedRef) cache.set(key, ref);
  const result = ref.read();
  return result;
}
