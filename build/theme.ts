import palettes from  "../palette.json" assert { type: "json" }

const makeLayerCss = (name: string, depth: number, color: string) =>
`.bg-${name}-${depth} {
  background-color: #${color}
}

.border-${name}-${depth} {
  border-color: #${color}
}
`

// with a depth of six, each palette is 6 dark shades
// and 6 light shades
const MAX_DEPTH = 6
type Twelve<T> = [T, T, T, T, T, T, T, T, T, T, T, T]

// Twelve swatches are needed per color feature:
type ColorFeature =
  | 'primary'
  | 'accent'
  | 'surface'
  | 'warning'
  | 'grey'
interface Swatch {
  name: string
  color: string
}
type PaletteSpecification = {
  color: ColorFeature
  swatches: Twelve<Swatch>
}[]

function parsePalette() {
  
}

const pal = palettes

function buildPaletteCSS(): string {
  return palettes.map(({ paletteName, swatches }) =>
    swatches.map(
      ({color}, i) => makeLayerCss(paletteName, i, color)
    ).join('\n')
  ).join('\n')
}

const makeSpacingCss = (depth: number, padding: number) => 
`.block-${depth} {
  padding: ${padding}em;
}

.block-${depth} > *:first-child {
  margin-top: 0;
}

.block-${depth} > *:last-child {
  margin-bottom: 0;
}

.header-block-${depth} {
  padding: 0.5em ${padding}em;
}
`

function buildSpacingCSS(): string {
  const maxDepth = palettes[0].swatches.length
  return Array(maxDepth).fill(0).map((_, index) =>
    makeSpacingCss(index, 2.5 - 2.75 * index / maxDepth)
  ).join('\n')
}

const makeTextColorCSS = (color: string) =>
`.text-color {
  color: #${color}
}
`

function buildTextColorCSS(): string {
  const contrastSwatches = palettes.find((palette) => palette.paletteName === "contrast")?.swatches
  const textColor = contrastSwatches?.[contrastSwatches.length - 1]?.color
  return textColor ? makeTextColorCSS(textColor) : ''
}

export default function buildCSS(): string {
  const paletteCss = buildPaletteCSS()
  const spacingCss = buildSpacingCSS()
  const textCss = buildTextColorCSS()
  return [paletteCss, spacingCss, textCss].join('\n')
}
