/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../../../deps/react.ts";
import { HuePicker } from "../../../../../deps/react-color.ts"

import { Color, Layer, Block } from "../../../theme.tsx"
import { Page } from "../../../layout/Page.tsx"

import buildHSLString from "./buildHSLString.tsx"
import useStylesheetHandle from "./useStylesheetHandle.tsx"
import TestLayer from "./TestLayer.tsx"

interface ColorLevel {
  saturation: number
  lightness: number
}
interface HSLColor extends ColorLevel {
  hue: number
}

interface LevelPickerProps {
  value: number
  onChange: (value: number) => void
}

function LevelPicker({
  value,
  onChange,
}: LevelPickerProps) {
  return (
    <div>
      <input
        type="range"
        value={value}
        // @ts-ignore
        onChange={(event) => onChange(+event.target.value)}
      />
      <label>{Math.round(value)}</label>
    </div>
  )
}


const COLOR_KEYS_ORDER: Color[] = [
  "primary",
  "accent",
  "surface",
  "warning",
]

export default function ThemePlayground() {
  const {
    palette,
    updateHues,
    updateSaturations,
    updateLightnesses,
    updateContrastLightnesses,
    updateGreys,
    updateContrastGreys,
  } = useStylesheetHandle()

  const {
    hues,
    saturations,
    lightnesses,
    contrastLightnesses,
    greys,
    contrastGreys,
  } = palette
  const colorLevels = saturations.map((saturation, index) => ({
    saturation,
    lightness: lightnesses[index],
  }))
  const colorGrid: (HSLColor & { color: Color })[][] = COLOR_KEYS_ORDER
    .map((color) => {
      const hue = hues[color as Color]
      return colorLevels.map(({saturation, lightness}) => ({
        color: color as Color,
        hue,
        saturation,
        lightness,
      }))
    })

  const sidebar = (
    <div>
      <Block className="flex-row-evenly">
        <Layer>
          {COLOR_KEYS_ORDER.map((color) => {
            const hue = hues[color]
            return (
              <React.Fragment key={color}>
                <label>{color} - {Math.round(hue)}</label>
                <HuePicker
                  width="100px"
                  color={{h: hue, s: 0, l: 0}}
                  onChangeComplete={({ hsl }: any) => {
                    updateHues(color, hsl.h)
                  }}
                />
              </React.Fragment>
            )
          })}
        </Layer>
        <Layer>
          {saturations.map((saturation, depth) => (
            <LevelPicker
              value={saturation}
              onChange={(value) => {
                updateSaturations(depth, value)
              }}
            />
          ))}
        </Layer>
      </Block>
      <Block className="flex-row-evenly">
        <Layer>
          <label>hue lightness</label>
          {lightnesses.map((lightness, depth) => (
            <LevelPicker
              value={lightness}
              onChange={(value) => {
                updateLightnesses(depth, value)
              }}
            />
          ))}
        </Layer>
        <Layer>
          <label>contrast hue lightness</label>
          {contrastLightnesses.map((contrastLightness, depth) => (
            <LevelPicker
              value={contrastLightness}
              onChange={(value) => {
                updateContrastLightnesses(depth, value)
              }}
            />
          ))}
        </Layer>
      </Block>
      <Block className="flex-row-evenly">
        <Layer>
          <label>grey</label>
          {greys.map((grey, depth) => (
            <LevelPicker
              value={grey}
              onChange={(value) => {
                updateGreys(depth, value)
              }}
            />
          ))}
        </Layer>
        <Layer>
          <label>contrast grey</label>
          {contrastGreys.map((grey, depth) => (
            <LevelPicker
              value={grey}
              onChange={(value) => {
                updateContrastGreys(depth, value)
              }}
            />
          ))}
        </Layer>
      </Block>
    </div>
  )
  return (
    <Page sidebar={sidebar}>
      <Block>
        <Layer>
          <div className="flex-row-evenly">
            {colorGrid.map((column) => (
              <Block key={column[0].color}>
                <label>{column[0].color}</label>
                {column.map((hslColor) => (
                  <div
                    key={`${hslColor.saturation}-${hslColor.lightness}`}
                    style={{
                      backgroundColor: buildHSLString(hslColor.hue, hslColor.saturation, hslColor.lightness),
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      margin: 4,
                    }}
                  />
                ))} 
              </Block>
            ))}
          </div>
        </Layer>
      </Block>
      <Block>
        <TestLayer>
          <TestLayer>
            <TestLayer />
          </TestLayer>
        </TestLayer>
      </Block>
    </Page>
  );
}
