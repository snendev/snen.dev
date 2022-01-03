type AsyncData<T> =
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

type Ref<T> = {
  current: T;
};

function createPromiseRef<T>(promise: Promise<T>): Ref<AsyncData<T>> {
  const promiseRef: Ref<AsyncData<T>> = {
    current: {
      status: "pending",
      value: promise,
    },
  };
  promise.then(
    (value) => {
      if (promiseRef.current.status === "pending") {
        const newValue: AsyncData<T> = {
          status: "resolved",
          value,
        };
        promiseRef.current = newValue;
      }
    },
    (error) => {
      if (promiseRef.current.status === "pending") {
        const newValue: AsyncData<T> = {
          status: "resolved",
          value: error,
        };
        promiseRef.current = newValue;
      }
    },
  );
  return promiseRef;
}

function readPromiseRef<T>(ref: Ref<AsyncData<T>>): T {
  if (ref.current.status === "resolved") return ref.current.value;
  else throw ref.current.value;
}

// CachedResponse helps manage response readers in case React needs to suspend.
// Each method is a wrapper over an inner reader that only consumes the response stream once.
class CachedResponse {
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: ResponseType;
  url: string;
  _response: Response;
  _arrayBuffer: Ref<AsyncData<ArrayBuffer>> | null;
  _blob: Ref<AsyncData<Blob>> | null;
  _json: Ref<AsyncData<Object>> | null;
  _text: Ref<AsyncData<string>> | null;

  constructor(nativeResponse: Response) {
    this.headers = nativeResponse.headers;
    this.ok = nativeResponse.ok;
    this.redirected = nativeResponse.redirected;
    this.status = nativeResponse.status;
    this.statusText = nativeResponse.statusText;
    this.type = nativeResponse.type;
    this.url = nativeResponse.url;

    this._response = nativeResponse;
    this._arrayBuffer = null;
    this._blob = null;
    this._json = null;
    this._text = null;
  }

  arrayBuffer() {
    if (this._arrayBuffer) return readPromiseRef(this._arrayBuffer);
    this._arrayBuffer = createPromiseRef(this._response.arrayBuffer());
    return readPromiseRef(this._arrayBuffer);
  }

  blob() {
    if (this._blob) return readPromiseRef(this._blob);
    this._blob = createPromiseRef(this._response.blob());
    return readPromiseRef(this._blob);
  }

  json() {
    if (this._json) return readPromiseRef(this._json);
    this._json = createPromiseRef(this._response.json());
    return readPromiseRef(this._json);
  }

  text() {
    if (this._text) return readPromiseRef(this._text);
    this._text = createPromiseRef(this._response.text());
    return readPromiseRef(this._text);
  }
}

// Special alias of Ref<AsyncData<Response>> for maintaining the response in cache
type FetchResult = Ref<AsyncData<Response>> & { response?: CachedResponse };

// Wrapper for readPromiseRef that caches the response
function readFetchResult(result: FetchResult): CachedResponse {
  if (result.response) return result.response;
  result.response = new CachedResponse(readPromiseRef(result));
  return result.response;
}

// do not try to mutate this cache! https://github.com/reactwg/react-18/discussions/25
// TODO: try importing unstable_getCacheForType
// avoided for now to avoid CDN import issues
// (history: I spent hours trying to understand why I can't import hooks here right now, and don't want to try another import right now)
const cache = new Map<string, FetchResult>();

export default function useFetch(url: string): CachedResponse {
  const cachedRef = cache.get(url);

  if (cachedRef !== undefined) return readFetchResult(cachedRef);

  const promise = fetch(url);
  const ref: Ref<AsyncData<Response>> = createPromiseRef(promise);
  cache.set(url, ref);

  return readFetchResult(ref);
}
