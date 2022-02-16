/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../../../deps/react.ts";

import { Layer, Button, Block, TextArea, useLayer } from "../../../theme.tsx"

interface TestLayerProps {
  children?: React.ReactNode
}

export default function TestLayer({ children }: TestLayerProps) {
  const layer = useLayer()
  const { depth } = layer
  return (
    <Layer headerTitle={`Depth: ${depth}`}>
      <div>
        <div className="flex-row-evenly">
          <div>
            <Button
              backgroundColor="primary"
              onClick={() => { console.log('pressed primary button') }}
            >
              Primary button
            </Button>
          </div>
          <div>
            <Button
              backgroundColor="accent"
              onClick={() => { console.log('pressed accent button') }}
            >
              Accent button
            </Button>
          </div>
          <div>
            <Button
              backgroundColor="surface"
              onClick={() => { console.log('pressed surface button') }}
            >
              Surface button
            </Button>
          </div>
          <div>
            <Button
              backgroundColor="warning"
              onClick={() => { console.log('pressed warning button') }}
            >
              Warning button
            </Button>
          </div>
        </div>
        <Block>
          <TextArea value={JSON.stringify(layer)} />
        </Block>
        <Block>
          {children}
        </Block>
      </div>
    </Layer>
  )
}