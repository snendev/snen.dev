var b = Object.create;
var s = Object.defineProperty;
var p = Object.getOwnPropertyDescriptor;
var O = Object.getOwnPropertyNames;
var j = Object.getPrototypeOf, g = Object.prototype.hasOwnProperty;
var m = (r)=>s(r, "__esModule", {
        value: !0
    })
;
var v = (r, e)=>()=>(e || r((e = {
            exports: {
            }
        }).exports, e), e.exports)
;
var y = (r, e, t)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let n of O(e))!g.call(r, n) && n !== "default" && s(r, n, {
        get: ()=>e[n]
        ,
        enumerable: !(t = p(e, n)) || t.enumerable
    });
    return r;
}, h = (r)=>y(m(s(r != null ? b(j(r)) : {
    }, "default", r && r.__esModule && "default" in r ? {
        get: ()=>r.default
        ,
        enumerable: !0
    } : {
        value: r,
        enumerable: !0
    })), r)
;
var l = v((q, i)=>{
    "use strict";
    var u1 = Object.getOwnPropertySymbols, d = Object.prototype.hasOwnProperty, w = Object.prototype.propertyIsEnumerable;
    function P1(r) {
        if (r == null) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(r);
    }
    function E1() {
        try {
            if (!Object.assign) return !1;
            var r = new String("abc");
            if (r[5] = "de", Object.getOwnPropertyNames(r)[0] === "5") return !1;
            for(var e = {
            }, t = 0; t < 10; t++)e["_" + String.fromCharCode(t)] = t;
            var n = Object.getOwnPropertyNames(e).map(function(o) {
                return e[o];
            });
            if (n.join("") !== "0123456789") return !1;
            var a = {
            };
            return "abcdefghijklmnopqrst".split("").forEach(function(o) {
                a[o] = o;
            }), Object.keys(Object.assign({
            }, a)).join("") === "abcdefghijklmnopqrst";
        } catch  {
            return !1;
        }
    }
    i.exports = E1() ? Object.assign : function(r, e) {
        for(var t, n = P1(r), a, o = 1; o < arguments.length; o++){
            t = Object(arguments[o]);
            for(var f in t)d.call(t, f) && (n[f] = t[f]);
            if (u1) {
                a = u1(t);
                for(var c = 0; c < a.length; c++)w.call(t, a[c]) && (n[a[c]] = t[a[c]]);
            }
        }
        return n;
    };
});
var S = h(l());
var export_default = S.default;
var H = Object.create;
var h1 = Object.defineProperty;
var W = Object.getOwnPropertyDescriptor;
var Y = Object.getOwnPropertyNames;
var G = Object.getPrototypeOf, J = Object.prototype.hasOwnProperty;
var K = (e)=>h1(e, "__esModule", {
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
var b1 = (e, t)=>()=>(t || e((t = {
            exports: {
            }
        }).exports, t), t.exports)
;
var X = (e, t, n)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let u2 of Y(t))!J.call(e, u2) && u2 !== "default" && h1(e, u2, {
        get: ()=>t[u2]
        ,
        enumerable: !(n = W(t, u2)) || n.enumerable
    });
    return e;
}, g1 = (e)=>X(K(h1(e != null ? H(G(e)) : {
    }, "default", e && e.__esModule && "default" in e ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var z = b1((r)=>{
    "use strict";
    var E2 = export_default, y2 = 60103, x1 = 60106;
    r.Fragment = 60107;
    r.StrictMode = 60108;
    r.Profiler = 60114;
    var I = 60109, P2 = 60110, O2 = 60112;
    r.Suspense = 60113;
    var w = 60115, T1 = 60116;
    typeof Symbol == "function" && Symbol.for && (a = Symbol.for, y2 = a("react.element"), x1 = a("react.portal"), r.Fragment = a("react.fragment"), r.StrictMode = a("react.strict_mode"), r.Profiler = a("react.profiler"), I = a("react.provider"), P2 = a("react.context"), O2 = a("react.forward_ref"), r.Suspense = a("react.suspense"), w = a("react.memo"), T1 = a("react.lazy"));
    var a, V = typeof Symbol == "function" && Symbol.iterator;
    function Z(e) {
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
    }, F1 = {
    };
    function d(e, t, n) {
        this.props = e, this.context = t, this.refs = F1, this.updater = n || D;
    }
    d.prototype.isReactComponent = {
    };
    d.prototype.setState = function(e, t) {
        if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, t, "setState");
    };
    d.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    };
    function L1() {
    }
    L1.prototype = d.prototype;
    function S2(e, t, n) {
        this.props = e, this.context = t, this.refs = F1, this.updater = n || D;
    }
    var R = S2.prototype = new L1;
    R.constructor = S2;
    E2(R, d.prototype);
    R.isPureReactComponent = !0;
    var M = Array.isArray, q = Object.prototype.hasOwnProperty, k = {
        current: null
    }, N = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function A(e, t, n) {
        var u3, o = {
        }, c = null, f = null;
        if (t != null) for(u3 in t.ref !== void 0 && (f = t.ref), t.key !== void 0 && (c = "" + t.key), t)q.call(t, u3) && !N.hasOwnProperty(u3) && (o[u3] = t[u3]);
        var i = arguments.length - 2;
        if (i === 1) o.children = n;
        else if (1 < i) {
            for(var s1 = Array(i), p2 = 0; p2 < i; p2++)s1[p2] = arguments[p2 + 2];
            o.children = s1;
        }
        if (e && e.defaultProps) for(u3 in i = e.defaultProps, i)o[u3] === void 0 && (o[u3] = i[u3]);
        return {
            $$typeof: y2,
            type: e,
            key: c,
            ref: f,
            props: o,
            _owner: k.current
        };
    }
    function ee(e, t) {
        return {
            $$typeof: y2,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner
        };
    }
    function C1(e) {
        return typeof e == "object" && e !== null && e.$$typeof === y2;
    }
    function te(e) {
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
        return typeof e == "object" && e !== null && e.key != null ? te("" + e.key) : t.toString(36);
    }
    function _1(e, t, n, u4, o) {
        var c = typeof e;
        (c === "undefined" || c === "boolean") && (e = null);
        var f = !1;
        if (e === null) f = !0;
        else switch(c){
            case "string":
            case "number":
                f = !0;
                break;
            case "object":
                switch(e.$$typeof){
                    case y2:
                    case x1:
                        f = !0;
                }
        }
        if (f) return f = e, o = o(f), e = u4 === "" ? "." + $(f, 0) : u4, M(o) ? (n = "", e != null && (n = e.replace(U, "$&/") + "/"), _1(o, t, n, "", function(p3) {
            return p3;
        })) : o != null && (C1(o) && (o = ee(o, n + (!o.key || f && f.key === o.key ? "" : ("" + o.key).replace(U, "$&/") + "/") + e)), t.push(o)), 1;
        if (f = 0, u4 = u4 === "" ? "." : u4 + ":", M(e)) for(var i = 0; i < e.length; i++){
            c = e[i];
            var s2 = u4 + $(c, i);
            f += _1(c, t, n, s2, o);
        }
        else if (s2 = Z(e), typeof s2 == "function") for(e = s2.call(e), i = 0; !(c = e.next()).done;)c = c.value, s2 = u4 + $(c, i++), f += _1(c, t, n, s2, o);
        else if (c === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
        return f;
    }
    function m1(e, t, n) {
        if (e == null) return e;
        var u5 = [], o = 0;
        return _1(e, u5, "", "", function(c) {
            return t.call(n, c, o++);
        }), u5;
    }
    function re(e) {
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
    var l2 = {
        current: null
    }, v2 = {
        transition: 0
    }, ne = {
        ReactCurrentDispatcher: l2,
        ReactCurrentBatchConfig: v2,
        ReactCurrentOwner: k,
        assign: E2
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
            if (!C1(e)) throw Error("React.Children.only expected to receive a single React element child.");
            return e;
        }
    };
    r.Component = d;
    r.PureComponent = S2;
    r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ne;
    r.cloneElement = function(e, t, n) {
        if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var u6 = E2({
        }, e.props), o = e.key, c = e.ref, f = e._owner;
        if (t != null) {
            if (t.ref !== void 0 && (c = t.ref, f = k.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
            for(s3 in t)q.call(t, s3) && !N.hasOwnProperty(s3) && (u6[s3] = t[s3] === void 0 && i !== void 0 ? i[s3] : t[s3]);
        }
        var s3 = arguments.length - 2;
        if (s3 === 1) u6.children = n;
        else if (1 < s3) {
            i = Array(s3);
            for(var p4 = 0; p4 < s3; p4++)i[p4] = arguments[p4 + 2];
            u6.children = i;
        }
        return {
            $$typeof: y2,
            type: e.type,
            key: o,
            ref: c,
            props: u6,
            _owner: f
        };
    };
    r.createContext = function(e) {
        return e = {
            $$typeof: P2,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        }, e.Provider = {
            $$typeof: I,
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
            $$typeof: O2,
            render: e
        };
    };
    r.isValidElement = C1;
    r.lazy = function(e) {
        return {
            $$typeof: T1,
            _payload: {
                _status: -1,
                _result: e
            },
            _init: re
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
        var t = v2.transition;
        v2.transition = 1;
        try {
            e();
        } finally{
            v2.transition = t;
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
        return l2.current.useCallback(e, t);
    };
    r.useContext = function(e) {
        return l2.current.useContext(e);
    };
    r.useDebugValue = function() {
    };
    r.useDeferredValue = function(e) {
        return l2.current.useDeferredValue(e);
    };
    r.useEffect = function(e, t) {
        return l2.current.useEffect(e, t);
    };
    r.useId = function() {
        return l2.current.useId();
    };
    r.useImperativeHandle = function(e, t, n) {
        return l2.current.useImperativeHandle(e, t, n);
    };
    r.useInsertionEffect = function(e, t) {
        return l2.current.useInsertionEffect(e, t);
    };
    r.useLayoutEffect = function(e, t) {
        return l2.current.useLayoutEffect(e, t);
    };
    r.useMemo = function(e, t) {
        return l2.current.useMemo(e, t);
    };
    r.useReducer = function(e, t, n) {
        return l2.current.useReducer(e, t, n);
    };
    r.useRef = function(e) {
        return l2.current.useRef(e);
    };
    r.useState = function(e) {
        return l2.current.useState(e);
    };
    r.useSyncExternalStore = function(e, t, n) {
        return l2.current.useSyncExternalStore(e, t, n);
    };
    r.useTransition = function() {
        return l2.current.useTransition();
    };
    r.version = "18.0.0-rc.0-f2a59df48-20211208";
});
var j1 = b1((ie, B)=>{
    "use strict";
    B.exports = z();
});
var ue = g1(j1()), oe = g1(j1()), { Fragment: fe , StrictMode: le , Profiler: ae , Suspense: pe , Children: ye , Component: de , PureComponent: _e , __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: me , cloneElement: ve , createContext: he , createElement: Ee , createFactory: Se , createRef: Re , forwardRef: ke , isValidElement: Ce , lazy: $e , memo: je , startTransition: be , unstable_act: ge , unstable_createMutableSource: xe , useCallback: Ie , useContext: Pe , useDebugValue: Oe , useDeferredValue: we , useEffect: Te , useId: Ve , useImperativeHandle: De , useInsertionEffect: Fe , useLayoutEffect: Le , useMemo: Me , useReducer: qe , useRef: Ne , useState: Ae , useSyncExternalStore: Ue , useTransition: ze , version: Be  } = ue;
var export_default1 = oe.default;
var x = Object.create;
var u = Object.defineProperty;
var v1 = Object.getOwnPropertyDescriptor;
var O1 = Object.getOwnPropertyNames;
var E = Object.getPrototypeOf, b2 = Object.prototype.hasOwnProperty;
var g2 = (e)=>u(e, "__esModule", {
        value: !0
    })
;
((e)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(e, {
        get: (r, o)=>(typeof require != "undefined" ? require : r)[o]
    }) : e
)(function(e) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + e + '" is not supported');
});
var _ = (e, r)=>()=>(r || e((r = {
            exports: {
            }
        }).exports, r), r.exports)
;
var S1 = (e, r, o)=>{
    if (r && typeof r == "object" || typeof r == "function") for (let t of O1(r))!b2.call(e, t) && t !== "default" && u(e, t, {
        get: ()=>r[t]
        ,
        enumerable: !(o = v1(r, t)) || o.enumerable
    });
    return e;
}, l1 = (e)=>S1(g2(u(e != null ? x(E(e)) : {
    }, "default", e && e.__esModule && "default" in e ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var y1 = _((s4)=>{
    "use strict";
    var q = export_default1, a = 60103;
    s4.Fragment = 60107;
    typeof Symbol == "function" && Symbol.for && (f = Symbol.for, a = f("react.element"), s4.Fragment = f("react.fragment"));
    var f, N = Object.prototype.hasOwnProperty, R = q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function j2(e, r, o) {
        var t, n = {
        }, i = null, c = null;
        o !== void 0 && (i = "" + o), r.key !== void 0 && (i = "" + r.key), r.ref !== void 0 && (c = r.ref);
        for(t in r)N.call(r, t) && !w.hasOwnProperty(t) && (n[t] = r[t]);
        if (e && e.defaultProps) for(t in r = e.defaultProps, r)n[t] === void 0 && (n[t] = r[t]);
        return {
            $$typeof: a,
            type: e,
            key: i,
            ref: c,
            props: n,
            _owner: R.current
        };
    }
    s4.jsx = j2;
    s4.jsxs = j2;
});
var p1 = _((I, d)=>{
    "use strict";
    d.exports = y1();
});
var F = l1(p1()), P = l1(p1()), { Fragment: L , jsx: T , jsxs: C  } = F;
P.default;
const PRELOAD_SCRIPT = `
  import React from \"https://esm.sh/react@rc\";
  import { hydrateRoot } from \"https://esm.sh/react-dom@rc\";

  import App from \"./App.tsx\";

  const root = hydrateRoot(
    document.body,
    React.createElement(App, { url: new URL(window.location) })
  )
`;
function PrefetchLinks() {
    return export_default1.createElement(export_default1.Fragment, null, export_default1.createElement("link", {
        rel: "prefetch",
        href: "App.tsx"
    }), export_default1.createElement("link", {
        rel: "prefetch",
        href: "Comments.tsx"
    }));
}
function Html({ children  }) {
    return export_default1.createElement("html", {
        lang: "en"
    }, export_default1.createElement("head", null, export_default1.createElement("meta", {
        charSet: "utf-8"
    }), export_default1.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
    }), export_default1.createElement("link", {
        rel: "shortcut icon",
        href: "favicon.ico"
    }), export_default1.createElement(PrefetchLinks, null), export_default1.createElement("title", null, "Deno React18 Test"), export_default1.createElement("script", {
        type: "module",
        dangerouslySetInnerHTML: {
            __html: PRELOAD_SCRIPT
        }
    })), export_default1.createElement("body", null, export_default1.createElement("noscript", {
        dangerouslySetInnerHTML: {
            __html: `<b>Enable JavaScript to run this app.</b>`
        }
    }), children));
}
const Comments = $e(()=>import('./Comments.tsx')
);
function App({ url  }) {
    return T(Html, {
        children: T("main", {
            children: C(pe, {
                fallback: T("div", {
                    children: "Loading..."
                }),
                children: [
                    T("div", {
                        children: "Hello world!"
                    }),
                    T(Comments, {
                    })
                ]
            })
        })
    });
}
export { App as default };

