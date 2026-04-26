import { colorsToCss, lightColors, darkColors, type ColorTokens } from './colors';
import { spacingToCss, defaultScale, defaultSemantic, type SpacingScale, type SemanticSpacing } from './spacing';
import { radiiToCss, defaultRadii, type RadiiTokens } from './radii';

export type { ColorTokens, SpacingScale, SemanticSpacing, RadiiTokens };
export { lightColors, darkColors, defaultScale, defaultSemantic, defaultRadii };

export interface ThemeConfig {
  colors?: Partial<ColorTokens>;
  darkColors?: Partial<ColorTokens>;
  spacing?: Partial<SpacingScale>;
  semantic?: Partial<SemanticSpacing>;
  radii?: Partial<RadiiTokens>;
  /** Font stack — defaults to Inter Variable */
  font?: string;
}

export interface Theme {
  /** Inject this CSS string into a <style> tag on :root */
  lightCss: string;
  /** Inject this CSS string inside [data-appearance='dark'] */
  darkCss: string;
  /** Full <style> element innerHTML */
  styleContent: string;
}

const DEFAULT_FONT = "'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif";

/**
 * Build a complete theme from partial overrides.
 *
 * @example
 * const theme = createTheme({
 *   colors: { accent: '#7c3aed', accentFg: '#ffffff' },
 *   radii: { radius: '16px', radiusSm: '12px' },
 * });
 * // Inject in your app root:
 * document.head.insertAdjacentHTML('beforeend', `<style>${theme.styleContent}</style>`);
 */
export function createTheme(config: ThemeConfig = {}): Theme {
  const resolvedLight = { ...lightColors,    ...config.colors };
  const resolvedDark  = { ...darkColors,     ...config.darkColors };
  const resolvedScale = { ...defaultScale,   ...config.spacing };
  const resolvedSem   = { ...defaultSemantic,...config.semantic };
  const resolvedRadii = { ...defaultRadii,   ...config.radii };
  const font          = config.font ?? DEFAULT_FONT;

  const base = `
  ${colorsToCss(resolvedLight)}
  ${spacingToCss(resolvedScale, resolvedSem)}
  ${radiiToCss(resolvedRadii)}
  --ui-font: ${font};
  --ui-shadow-sm:  0 2px 4px  rgba(0, 0, 0, 0.14);
  --ui-shadow-md:  0 4px 16px rgba(0, 0, 0, 0.14);
  --ui-overlay-bg: rgba(0, 0, 0, 0.45);
`.trim();

  const dark = colorsToCss(resolvedDark).trim();

  const lightCss = `:root {\n  ${base.replace(/\n/g, '\n  ')}\n}`;
  const darkCss  = `[data-appearance='dark'] {\n  ${dark.replace(/\n/g, '\n  ')}\n}`;

  return {
    lightCss,
    darkCss,
    styleContent: `${lightCss}\n${darkCss}`,
  };
}

/** Default theme (light + dark, standard Telegram colors). */
export const defaultTheme = createTheme();
