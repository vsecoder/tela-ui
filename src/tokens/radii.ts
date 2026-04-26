/**
 * Border-radius tokens.
 *
 * --ui-radius    → cards, modals, inputs, buttons, sections (12px)
 * --ui-radius-sm → chips, tags, nested elements inside cards (10px)
 *
 * Override via createTheme({ radii: { ... } }).
 */

export interface RadiiTokens {
  /** Default radius — cards, modals, inputs, buttons */
  radius: string;
  /** Small radius — tags, chips, toggle active tab */
  radiusSm: string;
}

export const defaultRadii: RadiiTokens = {
  radius:   '12px',
  radiusSm: '10px',
};

export function radiiToCss(r: RadiiTokens): string {
  return `
  --ui-radius:    ${r.radius};
  --ui-radius-sm: ${r.radiusSm};
`.trim();
}
