var p = Object.create;
var s = Object.defineProperty;
var O = Object.getOwnPropertyDescriptor;
var j = Object.getOwnPropertyNames;
var g = Object.getPrototypeOf, m = Object.prototype.hasOwnProperty;
var v = (r)=>s(r, "__esModule", {
        value: !0
    })
;
var y = (r, e)=>()=>(e || r((e = {
            exports: {
            }
        }).exports, e), e.exports)
;
var d = (r, e, t, a)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let n of j(e))!m.call(r, n) && (t || n !== "default") && s(r, n, {
        get: ()=>e[n]
        ,
        enumerable: !(a = O(e, n)) || a.enumerable
    });
    return r;
}, h = (r, e)=>d(v(s(r != null ? p(g(r)) : {
    }, "default", !e && r && r.__esModule ? {
        get: ()=>r.default
        ,
        enumerable: !0
    } : {
        value: r,
        enumerable: !0
    })), r)
;
var i = y((_, l)=>{
    "use strict";
    var u = Object.getOwnPropertySymbols, w = Object.prototype.hasOwnProperty, P1 = Object.prototype.propertyIsEnumerable;
    function E(r) {
        if (r == null) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(r);
    }
    function S() {
        try {
            if (!Object.assign) return !1;
            var r = new String("abc");
            if (r[5] = "de", Object.getOwnPropertyNames(r)[0] === "5") return !1;
            for(var e = {
            }, t = 0; t < 10; t++)e["_" + String.fromCharCode(t)] = t;
            var a = Object.getOwnPropertyNames(e).map(function(o) {
                return e[o];
            });
            if (a.join("") !== "0123456789") return !1;
            var n = {
            };
            return "abcdefghijklmnopqrst".split("").forEach(function(o) {
                n[o] = o;
            }), Object.keys(Object.assign({
            }, n)).join("") === "abcdefghijklmnopqrst";
        } catch  {
            return !1;
        }
    }
    l.exports = S() ? Object.assign : function(r, e) {
        for(var t, a = E(r), n, o = 1; o < arguments.length; o++){
            t = Object(arguments[o]);
            for(var c in t)w.call(t, c) && (a[c] = t[c]);
            if (u) {
                n = u(t);
                for(var f = 0; f < n.length; f++)P1.call(t, n[f]) && (a[n[f]] = t[n[f]]);
            }
        }
        return a;
    };
});
var b = h(i()), q = b.default;
var Y = Object.create;
var h1 = Object.defineProperty;
var G = Object.getOwnPropertyDescriptor;
var J = Object.getOwnPropertyNames;
var K = Object.getPrototypeOf, Q = Object.prototype.hasOwnProperty;
var X = (e)=>h1(e, "__esModule", {
        value: !0
    })
;
((e)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(e, {
        get: (t, n)=>(typeof require != "undefined" ? require : t)[n]
    }) : e
)(function(e) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + e + '" is not supported');
});
var I = (e, t)=>()=>(t || e((t = {
            exports: {
            }
        }).exports, t), t.exports)
;
var ee = (e, t, n, o)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let u of J(t))!Q.call(e, u) && (n || u !== "default") && h1(e, u, {
        get: ()=>t[u]
        ,
        enumerable: !(o = G(t, u)) || o.enumerable
    });
    return e;
}, P = (e, t)=>ee(X(h1(e != null ? Y(K(e)) : {
    }, "default", !t && e && e.__esModule ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var z = I((r)=>{
    "use strict";
    var E = q, y1 = 60103, b1 = 60106;
    r.Fragment = 60107;
    r.StrictMode = 60108;
    r.Profiler = 60114;
    var g1 = 60109, O1 = 60110, j1 = 60112;
    r.Suspense = 60113;
    var w = 60115, T = 60116;
    typeof Symbol == "function" && Symbol.for && (a = Symbol.for, y1 = a("react.element"), b1 = a("react.portal"), r.Fragment = a("react.fragment"), r.StrictMode = a("react.strict_mode"), r.Profiler = a("react.profiler"), g1 = a("react.provider"), O1 = a("react.context"), j1 = a("react.forward_ref"), r.Suspense = a("react.suspense"), w = a("react.memo"), T = a("react.lazy"));
    var a, V = typeof Symbol == "function" && Symbol.iterator;
    function te(e) {
        return e === null || typeof e != "object" ? null : (e = V && e[V] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var D = {
        isMounted: function() {
            return !1;
        },
        enqueueForceUpdate: function() {
        },
        enqueueReplaceState: function() {
        },
        enqueueSetState: function() {
        }
    }, F = {
    };
    function d1(e, t, n) {
        this.props = e, this.context = t, this.refs = F, this.updater = n || D;
    }
    d1.prototype.isReactComponent = {
    };
    d1.prototype.setState = function(e, t) {
        if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, t, "setState");
    };
    d1.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    };
    function L() {
    }
    L.prototype = d1.prototype;
    function S(e, t, n) {
        this.props = e, this.context = t, this.refs = F, this.updater = n || D;
    }
    var R = S.prototype = new L;
    R.constructor = S;
    E(R, d1.prototype);
    R.isPureReactComponent = !0;
    var M = Array.isArray, q1 = Object.prototype.hasOwnProperty, k = {
        current: null
    }, N = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function A(e, t, n) {
        var o, u = {
        }, i1 = null, f = null;
        if (t != null) for(o in t.ref !== void 0 && (f = t.ref), t.key !== void 0 && (i1 = "" + t.key), t)q1.call(t, o) && !N.hasOwnProperty(o) && (u[o] = t[o]);
        var c = arguments.length - 2;
        if (c === 1) u.children = n;
        else if (1 < c) {
            for(var s1 = Array(c), p1 = 0; p1 < c; p1++)s1[p1] = arguments[p1 + 2];
            u.children = s1;
        }
        if (e && e.defaultProps) for(o in c = e.defaultProps, c)u[o] === void 0 && (u[o] = c[o]);
        return {
            $$typeof: y1,
            type: e,
            key: i1,
            ref: f,
            props: u,
            _owner: k.current
        };
    }
    function re(e, t) {
        return {
            $$typeof: y1,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner
        };
    }
    function C(e) {
        return typeof e == "object" && e !== null && e.$$typeof === y1;
    }
    function ne(e) {
        var t = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + e.replace(/[=:]/g, function(n) {
            return t[n];
        });
    }
    var U = /\/+/g;
    function $(e, t) {
        return typeof e == "object" && e !== null && e.key != null ? ne("" + e.key) : t.toString(36);
    }
    function _(e, t, n, o, u) {
        var i2 = typeof e;
        (i2 === "undefined" || i2 === "boolean") && (e = null);
        var f = !1;
        if (e === null) f = !0;
        else switch(i2){
            case "string":
            case "number":
                f = !0;
                break;
            case "object":
                switch(e.$$typeof){
                    case y1:
                    case b1:
                        f = !0;
                }
        }
        if (f) return f = e, u = u(f), e = o === "" ? "." + $(f, 0) : o, M(u) ? (n = "", e != null && (n = e.replace(U, "$&/") + "/"), _(u, t, n, "", function(p2) {
            return p2;
        })) : u != null && (C(u) && (u = re(u, n + (!u.key || f && f.key === u.key ? "" : ("" + u.key).replace(U, "$&/") + "/") + e)), t.push(u)), 1;
        if (f = 0, o = o === "" ? "." : o + ":", M(e)) for(var c = 0; c < e.length; c++){
            i2 = e[c];
            var s2 = o + $(i2, c);
            f += _(i2, t, n, s2, u);
        }
        else if (s2 = te(e), typeof s2 == "function") for(e = s2.call(e), c = 0; !(i2 = e.next()).done;)i2 = i2.value, s2 = o + $(i2, c++), f += _(i2, t, n, s2, u);
        else if (i2 === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
        return f;
    }
    function m1(e, t, n) {
        if (e == null) return e;
        var o = [], u = 0;
        return _(e, o, "", "", function(i3) {
            return t.call(n, i3, u++);
        }), o;
    }
    function ue(e) {
        if (e._status === -1) {
            var t = e._result;
            t = t(), t.then(function(n) {
                (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
            }, function(n) {
                (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
            }), e._status === -1 && (e._status = 0, e._result = t);
        }
        if (e._status === 1) return e._result.default;
        throw e._result;
    }
    var l = {
        current: null
    }, v1 = {
        transition: 0
    }, oe = {
        ReactCurrentDispatcher: l,
        ReactCurrentBatchConfig: v1,
        ReactCurrentOwner: k,
        assign: E
    };
    r.Children = {
        map: m1,
        forEach: function(e, t, n) {
            m1(e, function() {
                t.apply(this, arguments);
            }, n);
        },
        count: function(e) {
            var t = 0;
            return m1(e, function() {
                t++;
            }), t;
        },
        toArray: function(e) {
            return m1(e, function(t) {
                return t;
            }) || [];
        },
        only: function(e) {
            if (!C(e)) throw Error("React.Children.only expected to receive a single React element child.");
            return e;
        }
    };
    r.Component = d1;
    r.PureComponent = S;
    r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = oe;
    r.cloneElement = function(e, t, n) {
        if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var o = E({
        }, e.props), u = e.key, i4 = e.ref, f = e._owner;
        if (t != null) {
            if (t.ref !== void 0 && (i4 = t.ref, f = k.current), t.key !== void 0 && (u = "" + t.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
            for(s3 in t)q1.call(t, s3) && !N.hasOwnProperty(s3) && (o[s3] = t[s3] === void 0 && c !== void 0 ? c[s3] : t[s3]);
        }
        var s3 = arguments.length - 2;
        if (s3 === 1) o.children = n;
        else if (1 < s3) {
            c = Array(s3);
            for(var p3 = 0; p3 < s3; p3++)c[p3] = arguments[p3 + 2];
            o.children = c;
        }
        return {
            $$typeof: y1,
            type: e.type,
            key: u,
            ref: i4,
            props: o,
            _owner: f
        };
    };
    r.createContext = function(e) {
        return e = {
            $$typeof: O1,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        }, e.Provider = {
            $$typeof: g1,
            _context: e
        }, e.Consumer = e;
    };
    r.createElement = A;
    r.createFactory = function(e) {
        var t = A.bind(null, e);
        return t.type = e, t;
    };
    r.createRef = function() {
        return {
            current: null
        };
    };
    r.forwardRef = function(e) {
        return {
            $$typeof: j1,
            render: e
        };
    };
    r.isValidElement = C;
    r.lazy = function(e) {
        return {
            $$typeof: T,
            _payload: {
                _status: -1,
                _result: e
            },
            _init: ue
        };
    };
    r.memo = function(e, t) {
        return {
            $$typeof: w,
            type: e,
            compare: t === void 0 ? null : t
        };
    };
    r.startTransition = function(e) {
        var t = v1.transition;
        v1.transition = 1;
        try {
            e();
        } finally{
            v1.transition = t;
        }
    };
    r.unstable_act = function() {
        throw Error("act(...) is not supported in production builds of React.");
    };
    r.unstable_createMutableSource = function(e, t) {
        return {
            _getVersion: t,
            _source: e,
            _workInProgressVersionPrimary: null,
            _workInProgressVersionSecondary: null
        };
    };
    r.useCallback = function(e, t) {
        return l.current.useCallback(e, t);
    };
    r.useContext = function(e) {
        return l.current.useContext(e);
    };
    r.useDebugValue = function() {
    };
    r.useDeferredValue = function(e) {
        return l.current.useDeferredValue(e);
    };
    r.useEffect = function(e, t) {
        return l.current.useEffect(e, t);
    };
    r.useId = function() {
        return l.current.useId();
    };
    r.useImperativeHandle = function(e, t, n) {
        return l.current.useImperativeHandle(e, t, n);
    };
    r.useInsertionEffect = function(e, t) {
        return l.current.useInsertionEffect(e, t);
    };
    r.useLayoutEffect = function(e, t) {
        return l.current.useLayoutEffect(e, t);
    };
    r.useMemo = function(e, t) {
        return l.current.useMemo(e, t);
    };
    r.useReducer = function(e, t, n) {
        return l.current.useReducer(e, t, n);
    };
    r.useRef = function(e) {
        return l.current.useRef(e);
    };
    r.useState = function(e) {
        return l.current.useState(e);
    };
    r.useSyncExternalStore = function(e, t, n) {
        return l.current.useSyncExternalStore(e, t, n);
    };
    r.useTransition = function() {
        return l.current.useTransition();
    };
    r.version = "18.0.0-rc.0-f2a59df48-20211208";
});
var x = I((ce, B)=>{
    "use strict";
    B.exports = z();
});
var H = P(x()), W = P(x()), { Fragment: fe , StrictMode: le , Profiler: ae , Suspense: pe , Children: ye , Component: de , PureComponent: _e , __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: me , cloneElement: ve , createContext: he , createElement: Ee , createFactory: Se , createRef: Re , forwardRef: ke , isValidElement: Ce , lazy: $e , memo: xe , startTransition: Ie , unstable_act: Pe , unstable_createMutableSource: be , useCallback: ge , useContext: Oe , useDebugValue: je , useDeferredValue: we , useEffect: Te , useId: Ve , useImperativeHandle: De , useInsertionEffect: Fe , useLayoutEffect: Le , useMemo: Me , useReducer: qe , useRef: Ne , useState: Ae , useSyncExternalStore: Ue , useTransition: ze , version: Be  } = W, He = H.default || W;
function createPromiseRef(promise) {
    const promiseRef = {
        current: {
            status: "pending",
            value: promise
        }
    };
    promise.then((value)=>{
        if (promiseRef.current.status === "pending") {
            const newValue = {
                status: "resolved",
                value
            };
            promiseRef.current = newValue;
        }
    }, (error)=>{
        if (promiseRef.current.status === "pending") {
            const newValue = {
                status: "resolved",
                value: error
            };
            promiseRef.current = newValue;
        }
    });
    return promiseRef;
}
function readPromiseRef(ref) {
    if (ref.current.status === "resolved") return ref.current.value;
    else throw ref.current.value;
}
class CachedResponse {
    headers;
    ok;
    redirected;
    status;
    statusText;
    type;
    url;
    _response;
    _arrayBuffer;
    _blob;
    _json;
    _text;
    constructor(nativeResponse){
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
function readFetchResult(result) {
    if (result.response) return result.response;
    result.response = new CachedResponse(readPromiseRef(result));
    return result.response;
}
const cache = new Map();
function useFetch(url) {
    const cachedRef = cache.get(url);
    if (cachedRef !== undefined) return readFetchResult(cachedRef);
    const promise = fetch(url);
    const ref = createPromiseRef(promise);
    cache.set(url, ref);
    return readFetchResult(ref);
}
function Posts() {
    const response = useFetch("https://cdn.jsdelivr.net/gh/snendev/website/src/api.ts");
    const stuff = response.text();
    console.log({
        response
    });
    return He.createElement("p", null, stuff);
}
export { Posts as default };
