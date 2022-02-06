import palettes from  "../palette.json" assert { type: "json" }

const makeCss = (name: string, depth: number, color: string) =>
`.bg-${name}-${depth} {
  background-color: #${color}
}

.text-${name}-${depth} {
  color: #${color}
}

.border-${name}-${depth} {
  border-color: #${color}
}`

export function buildPaletteCSS(): string {
  return palettes.map(({ paletteName, swatches }) =>
    swatches.map(
      ({color}, i) => makeCss(paletteName, i, color)
    ).join('\n\n')
  ).join('\n\n')
}
