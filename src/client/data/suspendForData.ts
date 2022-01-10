import SuspenseRef from "./SuspenseRef.ts"

// do not try to mutate this cache! https://github.com/reactwg/react-18/discussions/25
// TODO: try importing unstable_getCacheForType
// avoided for now to avoid CDN import issues
// (history: I spent hours trying to understand a dependency issue, and don't want to try another import right now)
const cache = new Map<string, SuspenseRef<unknown>>();

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
 * There's also no cache lock here, so keys should be unique per usage of readAsyncData -- it is
 * less concerning to consider the race between a component and its next render.
 */
export default function suspendForData<T>(
  key: string,
  getAsyncResult: () => Promise<T>,
): T {
  const cachedRef = cache.get(key) as SuspenseRef<T> | undefined;
  const ref = cachedRef ?? new SuspenseRef(getAsyncResult());
  if (!cachedRef) cache.set(key, ref);
  const result = ref.read();
  return result
}
