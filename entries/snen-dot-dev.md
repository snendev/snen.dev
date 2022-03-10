# This website uses bleeding-edge web technology

Welcome to [snen.dev](https://snen.dev)!

This website leverages the [React 18 Release Candidate](https://github.com/reactwg/react-18/discussions/9) (see [React](https://reactjs.org/) if you're not familiar), enabling support for two previously-incompatible React features which massively improve its performance and usability.

The server uses Deno, a [TypeScript](https://www.typescriptlang.org/) runtime with native support for ESM and other modern browser features, which builds and serves the application without a typical framework.

## Why React?

Plenty of tools exist for building websites or applications, so the choice of a front-end framework is always somewhat deliberate. Often, people want to know one of three more specific answers:

- Why a JavaScript client-side framework, as opposed to vanilla HTML/JavaScript?  
- Why JavaScript at all, instead of using a web framework in another language (rendering with HTML templates/etc)?
- Why React, as opposed to Angular, Vue, Svelte, or another JS framework?

The first two, I'll answer first. I think JavaScript is neat; I enjoy writing TypeScript code in particular. I think reactive web frameworks provide powerful toolkits for building UIs. I thinkg the APIs exposed by React and libraries in the React ecosystem are intuitive, and the application code I write with them is sensible, readable, and maintainable.

I am biased towards React since I have the most experience with it, but there are many great options out there. I do also think the concurrent rendering technology coming in React 18, which I will discuss more shortly, is pretty cool. I do generally like to experiment with other frameworks when I can, but for this website, React was my go-to choice.

### JSX is a good tool for web development

One of the most useful parts of the React API is the use of [JSX](https://reactjs.org/docs/introducing-jsx.html) ([the spec](https://facebook.github.io/jsx/)), a syntax for declaring components in an HTML/XML-like format. Many JavaScript frameworks nowadays have JSX support, so what I am about to state supports JavaScript frameworks in general moreso than React in specific.

However, I really do think this is important. JSX syntax directly mirrors the DOM's structure, making it easier to represent the rendered DOM in a declarative, "data-driven" way. And, often, when these representations are easier to make in my code, they are also easier to make in my brain.

JSX also synergizes well with the type of composition that "component"-based frameworks leverage. Component subtrees can be defined at-will in these systems, and components often need to create large number of sub-components. JSX makes it convenient to declare component subtrees, which could be used to encapsulate large in compact statements. This makes code written using React (and its cousins) a lot more convenient to write, read, design, and understand.

> #### Aside: More on JSX
> 
> To support JSX, JavaScript runtimes look for a unique file extension, `.tsx` or `.jsx` to enable JSX in the file. Usage of JSX allows easily weaving component subtrees with any relevant properties:
> 
> ```tsx
> // component.ts
> const value = someValue
> const calculatedList = readableFunctionName(value)
> const handlePress = () => alert('Hello!')
> const jsx = (
>   // Container that defines layout
>   <ContainerDiv>
>     { /* Header component that renders according to some data */ }
>     <HeaderComponent title="JSX Title" value={calculatedList.length} />
>     { /* Body container */ }
>     <Body>
>       <button type="button" onClick={handlePress}>Say hi!</button>
>       { /* Render each item in a list of values */ }
>       {calculatedList.map((listItem) => (
>         <span key={listItem.key}>{listItem}</span>
>       ))}
>     </Body>
>   </ContainerDiv>
> )
> ```
> 
> Values such as the `title="JSX Title"` and `value={calculatedList.length}` on `HeaderComponent` are considered _props_. Props include both the "attributes" on any React component and the "children" (child components) represented underneath them. This notion of "children" allows us to represent the `ContainerDiv` and `Body` components, which might _wrap_ subcomponents but not directly _control_ them. TypeScript also supports JSX, so all these values are type-checked.
> 
> In general, libraries like React define how JSX syntax should be used. JSX syntax just yields "elements": in React's case, components and their props are passed to [`React.createElement`](https://reactjs.org/docs/react-api.html#createelement). For comparison, Preact uses a function named [`h`](https://jasonformat.com/wtf-is-jsx/). (That link refers to how the [_Babel_](https://babeljs.io/) transpiler handles JSX, but Deno and many browsers provide much of the same functionality.) There are several ways to inform a JavaScript runtime/compiler how to handle JSX, and environments often have their own recommendations.

Many modern browsers also support JSX nowadays when scripts use the correct [pragmas](https://johno.com/jsx-pragma)

### React's APIs are fantastic

JSX is already one example of this, but there is another example I want to touch on. When [hooks](https://reactjs.org/docs/hooks-intro.html) were released, the React community was abuzz with talk and criticism. My favorite example of the type of convenience I want to highlight came from Twitter during that
time, but what I'd like to clarify is that React APIs enable these sorts of improvements _all over the place_ in front-end code. The tweet:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">ok so - I took dan&#39;s classes/hooks code from react conf, blacked out the &#39;unnecessary&#39; bits, then colour coded bits by &#39;concern&#39;. so much nicer. the effect is amplified in more complex components, where concerns are split and mixed across lifecycle methods. <a href="https://t.co/nPUzQcisFt">pic.twitter.com/nPUzQcisFt</a></p>&mdash; sunil pai, inc. (@threepointone) <a href="https://twitter.com/threepointone/status/1056594421079261185?ref_src=twsrc%5Etfw">October 28, 2018</a></blockquote>

When programming for a user interface, classes like those on the left are very common. Interfaces have subscriptions to manage, controls to listen for -- they respond to input and perform resulting actions. Hooks make it easier to isolate the logic of each _behavior_, where a behavior might consist of some combination of inputs and outputs involving state, effects, and callback calls.

Hooks solve a few particularly nice use cases, but in my experience, these are only examples of how powerful these APIs are.

### React 18 and Concurrent Rendering

React 18 is coming out with several new features, but these features mostly center around a few architectural themes. These are primarily in pursuit of _concurrent rendering_ and _selective hydration_. This becomes relevant when considering two of the following previously- incompatible features:

- [Server-Side Rendering](https://reactjs.org/docs/react-dom-server.html). Traditionally, React builds a clientside app by shipping a "bare" HTML page to the browser which does little but request a JavaScript bundle. Once that bundle arrives, it loads the React tree and renders the application. With SSR, the React tree is rendered into HTML on the server first. Then, once the browser completes page load, React undergoes "hydration" and matches up the component tree to the pre-rendered HTML in the browser's DOM. This avoids the delayed loading experience required for a "client-side rendered" application.
- [Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html), which lets React "suspend" rendering a component when resources are not fully prepared. Previously, this was not supported when using SSR ([see the bottom of this page](https://reactjs.org/docs/react-api.html#reactsuspense)), but it has been used widely for bundle [code-splitting](https://reactjs.org/docs/code-splitting.html#reactlazy) for some time now. At first glance, it may only seem like Suspense only offers some improved API for declaring loading states. However, it also signals the evolution toward React 18's _concurrent rendering_ paradigm, since there is now a better way to declare that subtrees of an app might be _pending resolution_. In the near future, Suspense will also enable data fetching strategies that allow even more salient and predictable React development patterns. Some of this is (experimentally) implemented in this website!

All of this works hand-in-hand with what React calls _concurrent rendering_. I could talk more about it, but the [GitHub discussion on the new architecture](https://github.com/reactwg/react-18/discussions/37) provides a lot of detail and has a lot of pictures to explain things, so I encourage readers to check that out instead. For those who might recall something like this, it was previously known described as [_concurrent mode_](https://reactjs.org/docs/concurrent-mode-intro.html), and there is more information on the naming [here](https://github.com/reactwg/react-18/discussions/64)).

![Preview: React's new hydration model explained via pictures. Picture borrowed from GitHub @reactwg/react-18 discussion #37.](https://camo.githubusercontent.com/6cc4eeef439feb3c17d0ac09c701c0deffe170c60a039afa8c0b85d7d4b9c9ef/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f5358524b357573725862717143534a3258396a4769673f613d77504c72596361505246624765344f4e305874504b356b4c566839384747434d774d724e5036374163786b61)

(Above: A picture borrowed from the aforementioned Github discussion. Very interesting indeed...)

## Why Deno?

[Deno](https://deno.land/) is a TypeScript-first runtime leveraging V8 and built to match existing browser specifications as much as possible in top-level APIs. It supports JSX and ESM natively, and it encourages [remote imports](https://deno.land/manual/linking_to_external_code). This site leverages that to the fullest, code-splitting where possible and including no third-party dependencies in the app bundle (these are left as remote imports).

Now, Deno works significantly differently from NodeJS, and the ecosystem is still quite new. But I like Deno for a lot of reasons. First, I have been having fun experimenting with it since it came out, and I feel like I am learning more for it. Second, it's pretty convenient.

For me, the most obvious reason is Deno's built-in TypeScript support.

### TypeScript is great for client _and_ server

As far as I have seen, TypeScript provides tremendous advantages to developers. Simply put, it is nice to have a tool for encoding guarantees in my code. Those guarantees usually have to do with the shape of variables or parameters, and naming these shapes helps me reason about the code I'm writing. This argument is akin to something I have seen heavily espoused by the Rust community, the idea that [the compiler is your friend](https://ferrous-systems.com/blog/the-compiler-is-your-friend/). In practice, TypeScript has made it much easier to maintain and extend my codebases: my type definitions help me encode details I don't want to forget or misrepresent later.

I know there are developers for whom such structures often "get in the way" rather than helping; but even in this case, TypeScript provides a number of escape hatches (like `as` assertions and the `any` type). Unless you opt into stricter checking, it also doesn't require you to enforce anything about your code, so you can opt-in only when it's helpful.

Let's face it, JavaScript hasn't quite been known for its predictability in its history.  The ability to run TypeScript code server-side with no additional bells or whistles is quite convenient for me, since I can easily share types, components, and utilities directly between my client and server code. I appreciate its mission to support parity with browsers. I like that it treats ESNext syntax as the standard. Deno can also even bundle TypeScript code (although the feature set is minimal), so in very simple cases I don't even need to use a separate bundler for client files.

### Fewer moving parts

This has less to do with Deno in particular, but I also like being able to move away from "heavy" frameworks. For example, to use React in NodeJS, most pages recommend leveraging some [build toolchain](https://reactjs.org/docs/create-a-new-react-app.html#creating-a-toolchain-from-scratch). Now, React [can already be used without all the hullabaloo](https://reactjs.org/docs/create-a-new-react-app.html#you-might-not-need-a-toolchain) in NodeJS, but Node is not a TypeScript runtime, meaning that server code must also be compiled, and often a second build configuration must be maintained. This isn't a huge problem, but it's definitely not convenient, and in my experience, build configurations only ever tend to get more complicated over time.

Frameworks like [NextJS](https://nextjs.org/) create convenient APIs around common toolchains to help these concerns stay "out-of-sight". This is really useful in many cases, and I think NextJS is fantastic! However, I also believe that one of the most difficult aspects of web programming for beginners is how hard it is to understand any full application stack. When it's the norm for frameworks to move these concerns out of the way, it also becomes more and more rare to find examples that show how it all works end-to-end.

> #### Aside: Build toolchains are the "baseline" and always have been
> 
> Actually, though. Most of the [top](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started#setting_up_your_first_react_app) > [search](https://www.w3schools.com/REACT/DEFAULT.ASP) [results](https://react-tutorial.app/app.html?id=334) on google for "react tutorial" recommend using [create-react-app](https://create-react-app.dev/) to bootstrap new React applications. React's documentation, [even way back in 2017](https://github.com/facebook/react/blob/main/CHANGELOG.md#1562-september-25-2017), began the tutorial with [a note on prerequisites](https://react-legacy.netlify.app/tutorial/tutorial.html#prerequisites) that reference compiling via Babel with no explanation.
> 
> There's a lot of historical reasons for this, and much of this is still relevant. For a long time, it's the only way things could work. Nowadays, some of these concerns are less important, since [users overwhelmingly browse with Google Chrome](https://en.wikipedia.org/wiki/Usage_share_of_web_browsers#Summary_tables), which supports (and pressures other browsers to support) lots of modern JavaScript features like JSX pragmas (so JSX can be used in-browser), async iterators, etc.
> 
> However, there was a time when Internet Explorer dominated and terrorized the landscape. I'm simplifying here a bit, but IE, especially older versions, had a reputation for not quite playing nicely with other browsers, having missing or incorrect implementations for browser standards, and more. Browser compatibility was and still is a must-have, so any code that used newer ECMA features needed to be _transpiled_ so that they could work on older browsers like Internet Explorer.
> 
> Over time, tools such as [webpack](https://webpack.js.org/) and [babel](https://babeljs.io/) were developed to help solve these problems; pre-processors that compile JavaScript in various ways to improve development experience without sacrificing usability. These tools were powerful enough to integrate all sorts of compilation steps, including ones that enable TypeScript and [flow](https://flow.org/) support. As those tools were developed, they were soon integrated into build toolchains everywhere.
> 
> Thus, `create-react-app` was made to simplify bootstrapping and staying up-to-date with all those technologies and unwritten "standards" for JavaScript development. Truth be told, `create-react-app` is a really fantastic bit of technology. It supports a lot of convenient features; one of particular note is [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/), which enables updating a running development server with new code any time the developer saves a source file.
> 
> For those that aim to take more control over their application, `create-react-app` supports an "ejection" feature, where it basically copies all its configuration files into your repository, exposing you to the dark and scary depths of _JavaScript build infrastructure_. Only then is the user exposed to the litany of (development-only) dependencies that provide all of these features. I know I'm not the first React developer to eject an app confidently and then fail horribly at subsequent infrastructural upgrades, thus leading me to reinitialize the source code in a new create-react-app environment, never to be touched again.
> 
> It can be really scary to eject, since you don't really have any way to test things or explore piece-by-piece. Whatever under-the-hood dependencies are being used are _all_ now your concern. In that way, it can also make it hard to learn more. There's a bit of a trade-off in this way when using something like `create-react-app`, but if you are new to the ecosystem, you probably have no other reasonable choice.

Imagine seeing a React app for the first time as a new developer. To understand how a typical "React app" works, one must learn the machinery of HTTP, what a webserver is, how a browser interprets HTML/JS, what the Babel compiler does, what the TypeScript compiler does, what a React component is, how the React render lifecycle works, maybe another programming language and the concept of a "proxy" or "CORS" if a custom backend exists, and, finally, how to read JavaScript. That's a lot of topics to read about!

Now, it's not like complete mastery of all these topics is necessary for getting started, but it's easy to see how beginners could get stuck or confused. It's much harder to understand what a bundler is without understanding how my code reaches the browser in the first place, or without understanding that the browser is the thing interpreting your code.

Like I said -- Deno doesn't directly solve these problems. But it does make it easier to approach these ideas in a framework-less way, which I think, if at nothing else, is a very important sandbox to have.

### Remote imports synergize well with code-splitting

Code-splitting involves compiling a JS project into _chunks_ instead of a single bundle file. This means that the browser can import code only when needed. Effectively, this reduces the impact that complexity in your app has on overall bundle size: if some feature that requires a large number of dependencies only appears on one page, the app is built in such a way that the expensive code only requested when it is about to be used, like when visiting a particular page. Finally, if multiple sources in the app use the same chunk, once the browser has received that chunk, any further requests for the same resource can be handled by the browser cache.

> #### Example: Isolating usages of a dependency
> 
> A straightforward example of why code splitting is useful is the [theme explorer page](/reading/making-themes-bad-at-colors), which imports several extra `react-colors` dependencies that are otherwise not needed on the app. Since the theme explorer page is compiled into its own chunk, browsers can import it lazily at the time that the `/theme-explorer` route is visited. This way, both the component's code and any dependencies are imported only if they are needed for the current browsing context.
>
> ```tsx
> // static import
> import ThemePlayground from "(...)/ThemePlayground.js"
> // dynamic import ("lazy", run-time)
> const ThemePlayground = React.lazy(() => import("(...)/ThemePlayground.js"))
>
> // ...
>
> // in AppRouter.tsx
> return (
>   <Route
>     path={path}
>     component={
>       <Suspense fallback={<Loading />}>
>         <ThemePlayground />
>       </Suspense>
>     }
>   />
> )
> ```
>
> <iframe title="codesandbox" src="https://codesandbox.io/embed/github/snendev/snen.dev/tree/main?autoresize=1&view=editor&codemirror=1&fontsize=12&module=/src/client/app/AppRouter.tsx" style="width: 100%; min-height: 600px; margin-top: 30px;"></iframe>


For this website, [esbuild](https://esbuild.github.io/) is used to strip the source files into the JavaScript chunks that will serve as the web bundle. I think many bundlers support code splitting nowadays, so this is not much of a surprise. However, it's a convenient synergy: remote resource requests are "split" by default, _and_ there's no need to maintain them as part of the compiled web bundle.

At the end of the day it just helps guarantee that less code is shipped to the client. On snen.dev, you can check your Developer Tools network tab, and you'll see the following:

![snen.dev network tab inside the browser Developer Tools. Shows file sizes 2.7kB, 835B, 25.0kB, 9.1kB, etc.](/assets/intro-snen-dev-network-tab.png)

### Deploy

Finally, [Deno Deploy](https://deno.com/deploy) makes deploying this site easier than ever. By connecting my repository, I can redeploy every time I push a new commit. There are plenty of services that do that, but Deno Deploy even provides [playgrounds](https://deno.com/deploy/docs/playgrounds) where you can test your deployment ahead of time. Also, at time of writing, Deno Deploy just released a new suite of features that enable developers to [build assets in CI](https://deno.com/blog/deploy-static-files) and improve how static files are handled. Since I'm already using Deno, Deploy is definitely the way to go.

### Conclusion

In short: Deno is convenient. First-class support for TypeScript and modern ECMAScript standards goes a long way, and so does the ability to write [isomorphic](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) code. It supports a simple full-stack experience, including CI. Doing things this way helped strengthen my knowledge about React, JavaScript, and the web.

And, most importantly, I have fun developing with it.

## What if I want to know more?

I'm hoping to release a guide as React 18 stabilizes, but there's a lot to test and experiment with. In particular, I want to do some performance testing and verify whether all the new React features are working properly. For the time being, feel free to check out the [source code on github](https://github.com/snendev/snen.dev).
