---  
title: "snen.dev: A technical introduction"  
category: "about"  
slug: "what-is-this"  
subhead: "I abuse the React18 release candidate's new features as much as I can"  
tags: [ "deno", "react", "react18", "current rendering", "snen.dev" ]  
---  


## This website uses bleeding-edge web technology

It leverages the [React 18 Release Candidate](https://github.com/reactwg/react-18/discussions/9),
tying together two previously-incompatible features to handle React's most critical performance
issues. All built without a framework using Deno, using its support for TypeScript, ESM, and more.

### The upgrade

React 18 released several new features, but when considering the architecture of user code, the
focus is on a couple of long-discussed topics in the React ecosystem:

- [Server-Side Rendering](https://reactjs.org/docs/react-dom-server.html), which is to render the
React tree into HTML on the server first, rather than on the client's browser. After the browser
completes page load, React undergoes "hydration" and matches up the component tree to the
pre-rendered DOM. In client-side-only usages, React renders a blank page until all content is
loaded, which provides a poor loading experience.
- [Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html), which lets React "suspend"
rendering a component when resources are not fully prepared. Previously, this was not supported
under SSR, but it has been used widely for bundle
[code-splitting](https://reactjs.org/docs/code-splitting.html#reactlazy) for some time now.
At first glance, it may only seem like this only offers some improved Loading API, but it also
enables strategies for managing asynchronous data that are less bug-prone.

(See also the note on SSR support in the above link and at the bottom of
[this page](https://reactjs.org/docs/react-api.html#reactsuspense).)

All of this works hand-in-hand with what React calls _concurrent rendering_, which was previously
known as [_concurrent mode_](https://reactjs.org/docs/concurrent-mode-intro.html) (more on the
naming [here](https://github.com/reactwg/react-18/discussions/64)). I could talk more about it,
but the
[GitHub discussion on the new architecture])(https://github.com/reactwg/react-18/discussions/37)
provides a lot of detail and has a lot of pictures to explain things, so I encourage readers to
check that out instead.



