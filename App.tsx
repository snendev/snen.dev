/** @jsxImportSource https://esm.sh/react@rc */
import { Suspense, lazy, LazyExoticComponent, ReactElement } from "https://esm.sh/react@rc"

import Html from "./Html.tsx"

const Comments: any = lazy(() => import('./Comments.tsx'))

interface AppProps {
  url: URL
}

export default function App({url}: AppProps) {
  return (
    <Html>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <div>Hello world!</div>
          <Comments />
        </Suspense>
      </main>
    </Html>
  )
}
