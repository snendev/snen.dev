export type AsyncData<T> =
  | {
    status: "pending";
    value: Promise<T>;
  }
  | {
    status: "failure";
    value: Error;
  }
  | {
    status: "resolved";
    value: T;
  };

/**
 * SuspenseRef helps us read the results of a request in a way that is integrated with Suspense.
 *
 * It is a bucket for some async request data under one of three states:
 *   - the request is still loading, aka "pending"
 *   - the request has failed
 *   - the request has resolved successfully
 * While pending, the value in the bucket is the active promise for the async work.
 * Once resolved or errored, the bucket contains the appropriate result.
 *
 * When read() is called, the resulting behavior is dependent on the promise state:
 * While pending, we throw the pending promise, telling Suspense to "yield".
 * When failed, it propagates the error upward.
 * When resolved, we return the resolved value and render.
 */
export default class SuspenseRef<T> {
  _current: AsyncData<T>;

  constructor(promise: Promise<T>) {
    this._current = {
      status: "pending",
      value: promise,
    };
    promise.then(
      (value) => {
        if (this._current.status === "pending") {
          this._current = {
            status: "resolved",
            value,
          };
        }
      },
      (error) => {
        if (this._current.status === "pending") {
          this._current = {
            status: "failure",
            value: error,
          };
        }
      },
    );
  }

  read(): T {
    if (this._current.status === "resolved") return this._current.value;
    else throw this._current.value;
  }
}
