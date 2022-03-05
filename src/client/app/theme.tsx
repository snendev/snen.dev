/** @jsx React.createElement */
import React from "../../deps/react.ts";

import cx from "./classnames.ts";

// grey = primary theme mode color, contrast = the other one
// so if dark mode, "grey" means black and "contrast" means white
// if light mode, the opposite
export type Grey = "grey" | "grey-contrast";
export type Color =
  | "primary"
  | "accent"
  | "surface"
  | "warning"
  | "primary-contrast"
  | "accent-contrast"
  | "surface-contrast"
  | "warning-contrast";
export type ColorTarget = "text" | "border" | "bg" | "shadow";
export type ThemeMode = "light" | "dark";

export interface ThemeHandle {
  mode: ThemeMode;
  toggleThemeMode: () => void;
}

const ThemeContext = React.createContext<ThemeHandle | null>(null);

const MIN_DEPTH = 0;
const MAX_DEPTH = 5;

const ROOT_LAYER: LayerHandle = {
  backgroundColor: "grey",
  depth: MIN_DEPTH,
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = React.useState<"light" | "dark" | null>(null);

  function onChange(nextMode: "light" | "dark") {
    // @ts-ignore
    document.documentElement.className = nextMode;
    setMode(nextMode);
  }

  React.useLayoutEffect(() => {
    if (mode !== null) return;
    // @ts-ignore Need to find a way to SSR + use <reference lib="dom">
    const isLightMode =
      window.matchMedia("(prefers-color-scheme: light)").matches;
    onChange(isLightMode ? "light" : "dark");
  }, [mode]);

  function onToggle() {
    if (mode === null) return;
    const nextMode = mode === "light" ? "dark" : "light";
    onChange(nextMode);
  }

  const handle = React.useMemo<ThemeHandle>(() => ({
    mode: mode ?? "dark",
    toggleThemeMode: onToggle,
  }), [mode, onToggle]);

  return (
    <ThemeContext.Provider value={handle}>
      <LayerContext.Provider value={ROOT_LAYER}>
        {children}
      </LayerContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeHandle {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return context;
}

export function useThemeMode(): ThemeMode {
  const { mode } = useTheme();
  return mode;
}

function addDepth(depth: number, plus: number): number {
  const mod = MAX_DEPTH + 1;
  // TODO: snake instead of ring?
  return (depth + plus + mod) % mod;
}

interface LayerHandle {
  backgroundColor: Color | Grey;
  depth: number;
}

const LayerContext = React.createContext<LayerHandle | null>(null);

interface LayerOptions {
  backgroundColor?: Color | Grey;
  showBorder?: boolean;
}

export function useLayer(
  options: LayerOptions = {},
  additionalDepth = 0,
): LayerHandle {
  const { backgroundColor } = options;

  const mode = useThemeMode();
  const parentLayer = React.useContext(LayerContext);

  if (parentLayer === null) {
    throw new Error("useLayer must be used inside a <ThemeProvider>");
  }

  const layer = React.useMemo<LayerHandle>(() => ({
    depth: addDepth(parentLayer.depth, additionalDepth),
    backgroundColor: backgroundColor ?? parentLayer.backgroundColor,
  }), [parentLayer, backgroundColor, mode]);

  return layer;
}

function getLayerClassname(layer: LayerHandle, mode: ThemeMode): string {
  const { depth, backgroundColor } = layer;

  const surfaceClassName = `bg-${backgroundColor}-${depth}`;
  const borderClassName = `border-${backgroundColor}-${depth}`;

  // only add a shadow to border grey backgrounds in light mode
  const shadowClassName: string | undefined =
    mode === "light" && backgroundColor === "grey"
      ? `shadow-grey-contrast-${depth}`
      : undefined;
  return cx(
    surfaceClassName,
    borderClassName,
    shadowClassName,
    "text-color",
    mode,
  );
}

interface SurfaceProps extends LayerOptions {
  children: React.ReactNode;
  className?: string;
}

interface LayerProps extends SurfaceProps {
  headerLeft?: React.ReactNode;
  headerTitle?: React.ReactNode;
  headerRight?: React.ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  root?: boolean;
}

export function Layer({
  children,
  className,
  headerLeft,
  headerTitle,
  headerRight,
  headerClassName,
  bodyClassName,
  root = false,
  ...options
}: LayerProps) {
  const mode = useThemeMode();
  const additionalDepth = root ? 0 : 1;
  const layer = useLayer(options, additionalDepth);
  const layerClassName = getLayerClassname(layer, mode);
  const headerOptions: LayerOptions = {
    backgroundColor: options.backgroundColor ?? "primary",
    showBorder: options.showBorder ?? true,
  };
  const headerLayer = useLayer(headerOptions, additionalDepth);
  const headerLayerClassName = getLayerClassname(headerLayer, mode);

  return (
    <div className={cx("layer", layerClassName, className)}>
      {headerLeft || headerTitle || headerRight
        ? (
          <header
            className={cx(
              "layer-header",
              `header-block-${headerLayer.depth}`,
              mode === "dark"
                ? `shadow-grey-contrast-${headerLayer.depth}`
                : undefined,
              headerLayerClassName,
              headerClassName,
            )}
          >
            <div>
              {headerLeft ?? null}
              {headerTitle
                ? (
                  <Heading depth={headerLayer.depth}>
                    {headerTitle}
                  </Heading>
                )
                : null}
            </div>
            {headerRight ?? <div />}
          </header>
        )
        : null}
      <div className={cx("layer-body", bodyClassName)}>
        {/* Stack the next layer */}
        <LayerContext.Provider value={layer}>
          {children}
        </LayerContext.Provider>
      </div>
    </div>
  );
}

interface HeadingProps {
  children: React.ReactNode;
  depth: number;
}

function Heading({ children, depth }: HeadingProps) {
  switch (depth) {
    case 0:
      return <h1>{children}</h1>;
    case 1:
      return <h2>{children}</h2>;
    case 2:
      return <h3>{children}</h3>;
    case 3:
      return <h4>{children}</h4>;
    case 4:
      return <h5>{children}</h5>;
    default:
      return <h6>{children}</h6>;
  }
}

/** Highlight renders inline backgrounds */
export function Highlight({
  children,
  className,
  ...options
}: SurfaceProps) {
  const mode = useThemeMode();
  const layer = useLayer(options, 1);
  const layerClassName = getLayerClassname(layer, mode);

  return (
    <span
      className={cx(layerClassName, `inline-block-${layer.depth}`, className)}
    >
      {/* Stack the next layer */}
      <LayerContext.Provider value={layer}>
        {children}
      </LayerContext.Provider>
    </span>
  );
}

/**
 * Block renders padding at a width determined by the current depth.
 *
 * @param props
 */
export function Block({
  children,
  className,
  additionalDepth = 0,
  ...rest
}: React.HTMLProps<HTMLDivElement> & {
  additionalDepth?: number;
}): JSX.Element {
  const layer = useLayer();
  const paddingClassName = `block-${
    Math.min(layer.depth + additionalDepth, MAX_DEPTH)
  }`;
  return (
    <div className={cx(paddingClassName, className)} {...rest}>
      {children}
    </div>
  );
}

interface ButtonProps extends SurfaceProps {
  onClick: () => void;
}

export function Button({
  children,
  className,
  onClick,
  ...options
}: ButtonProps): JSX.Element {
  const mode = useThemeMode();
  const buttonOptions: LayerOptions = {
    backgroundColor: options.backgroundColor ?? "primary",
    showBorder: options.showBorder ?? true,
  };
  const layer = useLayer(buttonOptions);
  const layerClassName = getLayerClassname(layer, mode);
  return (
    <button
      className={cx(layerClassName, `header-block-${layer.depth}`, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  backgroundColor?: Grey;
}

export function TextArea({
  className,
  backgroundColor,
  ...textAreaProps
}: TextAreaProps): JSX.Element {
  const mode = useThemeMode();
  const layer = useLayer({}, 2);
  const layerClassName = getLayerClassname(layer, mode);
  return (
    <textarea
      className={cx(layerClassName, className)}
      {...textAreaProps}
    />
  );
}
