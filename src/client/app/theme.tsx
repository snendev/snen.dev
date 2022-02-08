/** @jsx React.createElement */
import React from "../../deps/react.ts";

type Color = "greyscale" | "primary" | "accent" | "surface" | "warning";
type ThemeMode = "light" | "dark"

const ThemeContext = React.createContext<ThemeMode | null>(null);

const LIGHTEST_GREY_DEPTH = 7
const DARKEST_GREY_DEPTH = 0
const LIGHTEST_HUE_DEPTH = 4

const TOP_LAYER_DARK_MODE: LayerHandle = {
  backgroundColor: "greyscale",
  textColor: "greyscale",
  depth: DARKEST_GREY_DEPTH + 1,
}

const TOP_LAYER_LIGHT_MODE: LayerHandle = {
  backgroundColor: "greyscale",
  textColor: "greyscale",
  depth: LIGHTEST_GREY_DEPTH - 1,
}

interface ThemeProviderProps {
  children: React.ReactNode;
  mode: ThemeMode
}

export function ThemeProvider({ children, mode }: ThemeProviderProps) {
  const backLayer = mode === 'dark' ? TOP_LAYER_DARK_MODE : TOP_LAYER_LIGHT_MODE
  return (
    <ThemeContext.Provider value={mode}>
      <LayerContext.Provider value={backLayer}>
        {children}
      </LayerContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeMode {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return context;
}

interface LayerHandle {
  backgroundColor: Color
  textColor: Color
  depth: number
}

// text color is always greyscale unless specified otherwise
// this helper calculates which depth level to use, according to the surface color
function getTextColorDepth(
  surfaceColor: Color,
  depth: number,
  mode: ThemeMode,
): number {
  const max = mode === 'dark' ? LIGHTEST_GREY_DEPTH : DARKEST_GREY_DEPTH
  const min = mode === 'dark' ? DARKEST_GREY_DEPTH : LIGHTEST_GREY_DEPTH
  switch (surfaceColor) {
    case 'greyscale': return depth < 4 ? max : min
    case 'primary':
    case 'accent':
    case 'surface':
    case 'warning':
      return depth < 2 ? max : min
  }
}

const LayerContext = React.createContext<LayerHandle | null>(null)

interface LayerOptions {
  backgroundColor?: Color,
  textColor?: Color,
  showBorder?: boolean,
}

function useLayer(
  options: LayerOptions,
  additionalDepth = 1,
): LayerHandle {
  const { backgroundColor, textColor } = options

  const mode = useTheme()
  const parentLayer = React.useContext(LayerContext)

  if (parentLayer === null) {
    throw new Error("useLayer must be used inside a <ThemeProvider>");
  }

  const layer = React.useMemo<LayerHandle>(() => ({
    depth: parentLayer.depth + (mode === 'dark' ? additionalDepth : -additionalDepth),
    backgroundColor: backgroundColor ?? parentLayer.backgroundColor,
    textColor: textColor ?? "greyscale",
  }), [parentLayer, backgroundColor, mode, textColor])

  return layer
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function clampDepth(backgroundColor: Color, depth: number): number {
  switch (backgroundColor) {
    case 'greyscale': return clamp(depth, 0, LIGHTEST_GREY_DEPTH)
    case 'primary':
    case 'accent':
    case 'surface':
    case 'warning':
      return clamp(depth, 0, LIGHTEST_HUE_DEPTH)
  }
}

function cx(...classNames: (string | undefined)[]): string {
  return classNames.join(' ')
}

function getLayerClassname(layer: LayerHandle, mode: ThemeMode): string {
  const { depth, backgroundColor, textColor } = layer
  const realDepth = clampDepth(backgroundColor, depth)
  const surfaceClassName = `bg-${backgroundColor}-${realDepth}`
  const borderDepth = clampDepth(backgroundColor, realDepth + (mode === 'dark' ? -1 : 1))
  const borderClassName = `border-${backgroundColor}-${borderDepth}`
  const textColorDepth = getTextColorDepth(backgroundColor, realDepth, mode)
  const textClassName = `text-${textColor}-${textColorDepth}`
  return cx(surfaceClassName, borderClassName, textClassName)
}

interface LayerProps extends LayerOptions {
  children: React.ReactNode
  className?: string
}

export function Layer({
  children,
  className,
  ...options
}: LayerProps) {
  const mode = useTheme()
  const layer = useLayer(options)
  const layerClassName = getLayerClassname(layer, mode)
  return (
    <div className={cx(className, layerClassName)}>
      {/* Stack the next layer */}
      <LayerContext.Provider value={layer}>
        {children}
      </LayerContext.Provider>
    </div>
  )
}

// shades are 20% increments up and down 2x maybe 3x

export function Header({
  children,
  className,
  ...options
}: LayerProps) {
  const mode = useTheme()
  const headerOptions: LayerOptions = {
    backgroundColor: options.backgroundColor ?? "primary",
    textColor: options.textColor,
    showBorder: options.showBorder ?? true,
  }
  const layer = useLayer(headerOptions, -2)
  const layerClassName = getLayerClassname(layer, mode)
  return (
    <header className={cx(layerClassName, "header", className)}>
      {/* Stack the next layer */}
      <LayerContext.Provider value={layer}>
        {children}
      </LayerContext.Provider>
    </header>
  )
}

export function Button({
  children,
  className,
  onClick,
  ...options
}: LayerProps & { onClick: () => void }): JSX.Element {
  const mode = useTheme()
  const buttonOptions: LayerOptions = {
    backgroundColor: options.backgroundColor ?? "primary",
    textColor: options.textColor,
    showBorder: options.showBorder ?? true,
  }
  const layer = useLayer(buttonOptions, -2)
  const layerClassName = getLayerClassname(layer, mode)
  return (
    <button
      className={cx(layerClassName, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
