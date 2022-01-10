import React from "../react.ts";

import { AsyncData } from "./SuspenseRef.ts";

/// WARNING - THIS IS INCORRECT CODE
/// This does not work since React throws away the component when suspending; the hook has no "prior render" to reference
/// and so it is re-mounted each time.

/// unstable_getCacheForType isn't exposed yet
// function getCache(): Map<string, AsyncData<unknown>> {
//   return React.unstable_getCacheForType(new Map());
// }

/**
 * useSuspendable helps us read the results of a request in a way that is integrated with Suspense.
 *
 * It uses a Ref<AsyncData> to maintain some promise result in one of three states:
 *   - the promise is still loading, aka "pending"
 *   - the promise has resolved to an error
 *   - the promise has resolved successfully
 * While pending, the AsyncData's value contains the pending promise.
 * Once resolved or errored, the AsyncData's value contains the appropriate result.
 *
 * During a render, the hook's behavior is dependent on the promise state:
 * While pending, we throw the pending promise, telling React to "suspend" at the next Suspense boundary.
 * When failed, we throw the error, propagating it upward to the next ErrorBoundary.
 * When resolved, we return the resolved value and render.
 */
export default function useSuspendable<T>(
  initialize: () => Promise<T>,
) {
  const ref = React.useRef<AsyncData<T>>();
  if (ref.current === undefined) {
    const promise = initialize();
    ref.current = {
      status: "pending",
      value: promise,
    };
    promise.then(
      (value) => {
        if (ref.current?.status === "pending") {
          ref.current = {
            status: "resolved",
            value,
          };
          console.log(ref);
        }
      },
      (error) => {
        if (ref.current?.status === "pending") {
          ref.current = {
            status: "failure",
            value: error,
          };
        }
      },
    );
  }
  if (ref.current.status === "resolved") return ref.current.value;
  else throw ref.current.value;
}
