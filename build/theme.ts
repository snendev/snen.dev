import basePalette from  "../palette.json" assert { type: "json" }

// only accepts 6-digit combos
function buildRGBA(rgb: string, a: number) {
  const r = parseInt(rgb.slice(0, 2), 16);
  const g = parseInt(rgb.slice(2, 4), 16);
  const b = parseInt(rgb.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const makeLayerCss = (
  feature: ColorFeature,
  mode: 'dark' | 'light',
  depth: number,
  color: string,
) => `.bg-${feature}-${depth}.${mode} {
  background-color: #${color};
}

.border-${feature}-${depth}.${mode} {
  border-color: #${color};
}

.shadow-${feature}-${depth}.${mode} {
  ${mode === "light"
    ? `box-shadow: 0 0 0 1px #${color}`
    : `box-shadow: inset 0 -4px 32px ${buildRGBA(color, 0.1)}`
  }
}

.bg-${feature}-contrast-${depth}.${mode === 'dark' ? 'light' : 'dark'} {
  background-color: #${color};
}

.border-${feature}-contrast-${depth}.${mode === 'dark' ? 'light' : 'dark'} {
  border-color: #${color};
}

.shadow-${feature}-contrast-${depth}.${mode === 'dark' ? 'light' : 'dark'} {
  ${mode === "dark"
    ? `box-shadow: 0 0 0 1px #${color}`
    : `box-shadow: inset 0 -4px ${32 / (depth * 0.5 + 1)}px ${buildRGBA(color, 0.1)}`}
}
`

// Twelve swatches are needed per color feature:
type ColorFeature =
  | 'grey'
  | 'primary'
  | 'accent'
  | 'surface'
  | 'warning'

interface Swatch {
  name: string
  color: string
}
type SwatchPalette = [Swatch, Swatch, Swatch, Swatch, Swatch, Swatch]

type PaletteSpecification = {
  color: ColorFeature,
  contrast: 'dark' | 'light'
  swatches: SwatchPalette
}[]

function parsePalette(): PaletteSpecification {
  return basePalette.map(({ paletteName, swatches }) => {
    const [color, contrast] = paletteName.split('-') as [ColorFeature, 'dark' | 'light']
    return { color, contrast, swatches: swatches as SwatchPalette }
  })
}

function buildPaletteCSS(palettes: PaletteSpecification): string {
  return palettes.map(({ color: colorName, contrast, swatches }) =>
    swatches.map(
      ({color}, i) => makeLayerCss(colorName, contrast, i, color)
    ).join('\n')
  ).join('\n')
}

const makeSpacingCss = (depth: number, padding: number) => 
`.block-${depth} {
  padding: ${padding + 0.25}em ${padding}em;
}

.block-${depth} + .block-${depth} {
  padding-top: 0;
}

.block-${depth} > *:first-child {
  margin-top: 0;
}
.block-${depth} > *:last-child {
  margin-bottom: 0;
}

.inline-block-${depth} {
  padding: 0 ${padding * 0.3}em;
}

.header-block-${depth} {
  padding: 0.5em ${padding}em;
}
`

function buildSpacingCSS(palettes: PaletteSpecification): string {
  const maxDepth = palettes[0].swatches.length
  return Array(maxDepth).fill(0).map((_, index) =>
    makeSpacingCss(index, 2.5 - 2.75 * index / maxDepth)
  ).join('\n')
}

const makeTextColorCSS = (lightModeColor: string, darkModeColor: string) =>
`.text-color.light{
  color: #${lightModeColor};
}

.text-color.dark {
  color: #${darkModeColor};
}
`

function buildTextColorCSS(palettes: PaletteSpecification): string {
  const blackTextColor = palettes.find(({ color, contrast}) => color === "grey" && contrast === "dark")?.swatches[0]?.color
  const whiteTextColor = palettes.find(({ color, contrast}) => color === "grey" && contrast === "light")?.swatches[0]?.color
  return blackTextColor && whiteTextColor ? makeTextColorCSS(blackTextColor, whiteTextColor) : ''
}

// TODO minify this in some way
export default function buildCSS(): string {
  const palette = parsePalette()
  const paletteCss = buildPaletteCSS(palette)
  const spacingCss = buildSpacingCSS(palette)
  const textCss = buildTextColorCSS(palette)
  return [paletteCss, spacingCss, textCss].join('\n')
}
