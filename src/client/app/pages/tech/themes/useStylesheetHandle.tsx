/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from "../../../../../deps/react.ts";

import { Color, ColorTarget, Grey } from "../../../theme.tsx";

import buildHSLString from "./buildHSLString.tsx";

type CSSRule = any;
type StyleSheet = any;

interface ThemeRule {
  target: ColorTarget;
  color: Color | Grey;
  depth: number;
  cssRule: CSSRule;
}

interface Palette {
  hues: Record<Color, number>;
  saturations: number[];
  lightnesses: number[];
  contrastLightnesses: number[];
  greys: number[];
  contrastGreys: number[];
}

function getStyleProperty(target: ColorTarget): string {
  switch (target) {
    case "text":
      return "color";
    case "border":
      return "border-color";
    case "bg":
      return "background-color";
    case "shadow":
      return "box-shadow";
  }
}

interface ThemeStylesheetHandle {
  palette: Palette;
  updateHues: (color: Color, value: number) => void;
  updateSaturations: (depth: number, value: number) => void;
  updateLightnesses: (depth: number, value: number) => void;
  updateContrastLightnesses: (depth: number, value: number) => void;
  updateGreys: (depth: number, value: number) => void;
  updateContrastGreys: (depth: number, value: number) => void;
}

function getThemeStylesheet(): StyleSheet {
  // @ts-ignore
  return Array.from(window.document.styleSheets)
    .find((stylesheet) => {
      const hrefParts = (stylesheet as any).href?.split("/");
      return hrefParts?.[hrefParts?.length - 1] === "theme.css";
    });
}

function getCSSRules(): ThemeRule[] {
  const themeStylesheet = getThemeStylesheet();
  return themeStylesheet
    ? Array.from((themeStylesheet as any).cssRules).map<ThemeRule>(
      (cssRule, index) => {
        const [target, color, depth] = (cssRule as any).cssText
          .split("{")[0]
          .trim()
          .slice(1)
          .split("-");
        return {
          target: target as ColorTarget,
          color: color as Color,
          depth: isNaN(+depth) ? 0 : +depth,
          cssRule: (themeStylesheet as any).cssRules[index],
        };
      },
    )
    : [];
}

function updateCSSRules(
  rules: ThemeRule[],
  palette: Palette,
  filter: (rule: ThemeRule) => boolean,
) {
  for (const rule of rules) {
    const { target, color, depth } = rule;
    if (filter(rule)) {
      const property = getStyleProperty(target);
      if (color === "grey" || color === "grey-contrast") {
        // blue tint
        const hue = 204;
        // weak saturation for a slight tint
        const saturation = 4;
        const lightness = color === "grey"
          ? palette.greys[depth]
          : palette.contrastGreys[depth];
        rule.cssRule.style[property] = buildHSLString(
          hue,
          saturation,
          lightness,
        );
      } else {
        const hue = palette.hues[color];
        const saturation = palette.saturations[depth];
        const lightness = palette.lightnesses[depth];
        rule.cssRule.style[property] = buildHSLString(
          hue,
          saturation,
          lightness,
        );
      }
    }
  }
}

function initPalette(): Palette {
  const rules = getCSSRules();
  const maxDepth = rules.reduce(
    (max, { depth }) => depth > max ? depth : max,
    0,
  );
  const saturations = new Array(maxDepth + 1).fill(0).map((_, i) =>
    94 - i * 44 / maxDepth
  );
  const lightnesses = new Array(maxDepth + 1).fill(0).map((_, i) =>
    5 + i * 33 / maxDepth
  );
  const contrasts = new Array(maxDepth + 1).fill(0).map((_, i) =>
    88 - i * 33 / maxDepth
  );
  return {
    hues: {
      "primary": 0,
      "accent": 0,
      "surface": 0,
      "warning": 0,
      "primary-contrast": 0,
      "accent-contrast": 0,
      "surface-contrast": 0,
      "warning-contrast": 0,
    },
    saturations,
    lightnesses: [...lightnesses],
    contrastLightnesses: contrasts,
    greys: lightnesses,
    contrastGreys: contrasts,
  };
}

export default function useThemeStylesheetHandle(): ThemeStylesheetHandle {
  const [palette, setPalette] = React.useState<Palette>(initPalette);

  const updateHues = React.useCallback((color: Color, value: number) => {
    const rules = getCSSRules();
    const newPalette: Palette = {
      ...palette,
      hues: {
        ...palette.hues,
        [color]: value,
      },
    };
    updateCSSRules(
      rules,
      newPalette,
      ({ color: ruleColor }) => ruleColor === color,
    );
    setPalette(newPalette);
  }, [palette]);

  const updateSaturations = React.useCallback(
    (depth: number, value: number) => {
      const rules = getCSSRules();
      const nextSaturations = [...palette.saturations];
      nextSaturations[depth] = value;
      const newPalette: Palette = {
        ...palette,
        saturations: nextSaturations,
      };
      updateCSSRules(
        rules,
        newPalette,
        ({ depth: ruleDepth, color: ruleColor }) =>
          ruleDepth === depth && ruleColor !== "grey-contrast" &&
          ruleColor !== "grey",
      );
      setPalette(newPalette);
    },
    [palette],
  );

  const updateLightnesses = React.useCallback(
    (depth: number, value: number) => {
      const rules = getCSSRules();
      const nextLightnesses = [...palette.lightnesses];
      nextLightnesses[depth] = value;
      const newPalette: Palette = {
        ...palette,
        lightnesses: nextLightnesses,
      };
      updateCSSRules(
        rules,
        newPalette,
        ({ depth: ruleDepth, color: ruleColor }) =>
          ruleDepth === depth && ruleColor !== "grey-contrast" &&
          ruleColor !== "grey",
      );
      setPalette(newPalette);
    },
    [palette],
  );

  const updateContrastLightnesses = React.useCallback(
    (depth: number, value: number) => {
      const rules = getCSSRules();
      const nextContrastLightnesses = [...palette.contrastLightnesses];
      nextContrastLightnesses[depth] = value;
      const newPalette: Palette = {
        ...palette,
        contrastLightnesses: nextContrastLightnesses,
      };
      updateCSSRules(
        rules,
        newPalette,
        ({ depth: ruleDepth, color: ruleColor }) =>
          ruleDepth === depth && ruleColor !== "grey-contrast" &&
          ruleColor !== "grey",
      );
      setPalette(newPalette);
    },
    [palette],
  );

  const updateGreys = React.useCallback((depth: number, value: number) => {
    const rules = getCSSRules();
    const nextGreys = [...palette.greys];
    nextGreys[depth] = value;
    const newPalette: Palette = {
      ...palette,
      greys: nextGreys,
    };
    updateCSSRules(
      rules,
      newPalette,
      ({ depth: ruleDepth, color: ruleColor }) =>
        ruleDepth === depth && ruleColor === "grey",
    );
    setPalette(newPalette);
  }, [palette]);

  const updateContrastGreys = React.useCallback(
    (depth: number, value: number) => {
      const rules = getCSSRules();
      const nextContrastGreys = [...palette.contrastGreys];
      nextContrastGreys[depth] = value;
      const newPalette: Palette = {
        ...palette,
        contrastGreys: nextContrastGreys,
      };
      updateCSSRules(
        rules,
        newPalette,
        ({ depth: ruleDepth, color: ruleColor }) =>
          ruleDepth === depth && ruleColor === "grey-contrast",
      );
      setPalette(newPalette);
    },
    [palette],
  );

  const handle = React.useMemo<ThemeStylesheetHandle>(() => ({
    palette,
    updateHues,
    updateSaturations,
    updateLightnesses,
    updateContrastLightnesses,
    updateGreys,
    updateContrastGreys,
  }), [
    palette,
    updateHues,
    updateSaturations,
    updateLightnesses,
    updateContrastLightnesses,
    updateGreys,
    updateContrastGreys,
  ]);

  return handle;
}
