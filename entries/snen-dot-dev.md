---  
title: "snen.dev: A technical introduction"  
category: "about"  
slug: "what-is-this"  
subhead: "I tinker with the React 18 release candidate's new features in a framework-less environment"  
tags: [ "deno", "react", "react18", "current rendering", "snen.dev" ]  
---  

## This website uses bleeding-edge web technology

It leverages the [React 18 Release Candidate](https://github.com/reactwg/react-18/discussions/9)
(see [React](https://reactjs.org/) if you're not familiar), tying together two
previously-incompatible features to mitigate React's most critical performance issues. All
built and served without a framework using Deno's native support for TypeScript, ESM, and more.

### The upgrade

React 18 is coming out with several new features, but these features mostly center around a few
architectural themes. These are primarily in pursuit of _concurrent rendering_ and
_selective hydration_. This becomes relevant when considering two of the following
previously-incompatible features:

- [Server-Side Rendering](https://reactjs.org/docs/react-dom-server.html), which is to render the
React tree into HTML on the server first, rather than on the client's browser. After the browser
completes page load, React undergoes "hydration" and matches up the component tree to the
pre-rendered DOM. In client-side-only usages, React renders a blank page until all content is
loaded, which provides a poor loading experience.
- [Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html), which lets React "suspend"
rendering a component when resources are not fully prepared. Previously, this was not supported
under SSR, but it has been used widely for bundle
[code-splitting](https://reactjs.org/docs/code-splitting.html#reactlazy) for some time now.
At first glance, it may only seem like this only offers some improved Loading API, but with
React 18, it may also enable data fetching strategies that are less bug-prone.

(See also the note on SSR support in the above link and at the bottom of
[this page](https://reactjs.org/docs/react-api.html#reactsuspense).)

All of this works hand-in-hand with what React calls _concurrent rendering_. I could talk more
about it, but the
[GitHub discussion on the new architecture](https://github.com/reactwg/react-18/discussions/37)
provides a lot of detail and has a lot of pictures to explain things, so I encourage readers to
check that out instead. For those who might recall something like this, it was previously known
described as [_concurrent mode_](https://reactjs.org/docs/concurrent-mode-intro.html), and there
is more information on the naming [here](https://github.com/reactwg/react-18/discussions/64)).

### Why React?

Plenty of tools exist for building websites or applications, so the choice of a front-end
framework is always somewhat deliberate. So "Why React?" is a natural question to ask someone
in my position. Often, the question's intent is really one of three more specific questions:

- Why React, as opposed to Angular, Vue, Svelte, or another JS framework?
- Why a JavaScript client-side framework, as opposed to vanilla HTML/JavaScript?
- Why JavaScript at all, instead of using a web framework in another language (with templates/etc)?

The last two, I'll answer first. I think JavaScript is neat. I think reactive web frameworks
provide powerful toolkits for UI building. I find the APIs to be intuitive and the application
code that I develop using them to be sensible, readable, and maintainable.

With regard to why I prefer React over other JavaScript frameworks, I'm biased since I'm most
experienced with React, and I also think their newest concurrent rendering technology is pretty
cool. I do generally like to experiment with other frameworks when I can, but for this website,
React was my go-to choice.

### Why Deno?

[Deno](https://deno.land/) is a TypeScript-first runtime leveraging V8 and built to match existing
browser specifications as much as possible in top-level APIs. It supports JSX and ESM natively,
and it encourages [remote imports](https://deno.land/manual/linking_to_external_code). This site
leverages that to the fullest, code-splitting where possible and ignoring third-party dependency
imports in the bundler.

Also, the ability to run TypeScript code server-side with no additional bells or whistles is
quite convenient for me. I find it very useful to sketch out types that define how I expect data
to be shaped as I go along. TypeScript catches when I break a contract I set for myself, and
that's very useful for me as a developer.

Deno's focus on "native everything" streamlined the work necessary to build a "framework" for
myself. That process, which Deno simplified, helped me learn more about Webpack's involvement
in React 18 and how modern data-fetching solutions will change with Suspense.

Finally, [Deno Deploy](https://deno.com/deploy) makes deploying this site easier than ever.
By connecting my repository, I can redeploy every time I push a new commit. There are plenty of
services that do that, but Deno Deploy even provides
[playgrounds](https://deno.com/deploy/docs/playgrounds) where you can test your deployment ahead
of time.

Basically, Deno kind-of does it all. Even though it is still somewhat unstable, I have fun
developing with it.

## What if I want to know more?

I'm hoping to release a guide as React 18 stabilizes, but there's a lot to experiment and test.
For the time being, feel free to check out the
[source code on github](https://github.com/snendev/snen.dev).
