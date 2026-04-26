/**
 * Shared motion variant sets.
 *
 * The "inner press" pattern: the outer motion.button propagates the
 * "tap" state via variants to an inner motion.span, so the button's
 * background stays flush with the container border while only the
 * content squishes.
 *
 * Usage:
 *   <motion.button initial="rest" whileTap="tap" transition={tapSpring}>
 *     <motion.span variants={pressIcon} transition={tapSpring}>
 *       <Icon />
 *     </motion.span>
 *   </motion.button>
 */

/** Strong squeeze — icon-only buttons (arrow, +, −). */
export const pressIcon = {
  rest: { scale: 1   },
  tap:  { scale: 0.72 },
} as const;

/** Medium squeeze — icon+label segments (ButtonGroup, Pagination). */
export const pressContent = {
  rest: { scale: 1   },
  tap:  { scale: 0.82 },
} as const;

/** Soft squeeze — full-width buttons that scale themselves. */
export const pressSoft = {
  rest: { scale: 1   },
  tap:  { scale: 0.97 },
} as const;

/** Standard fade + slide-up entrance/exit (used for overlays, popovers). */
export const fadeUp = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0  },
  exit:    { opacity: 0, y: 12 },
} as const;

/** Fade + slide-down (for dropdown hints, banners from top). */
export const fadeDown = {
  hidden:  { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0   },
  exit:    { opacity: 0, y: -10 },
} as const;

/** Pure fade (overlay backgrounds, subtle transitions). */
export const fade = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
} as const;

/** Scale in from slightly smaller (modal content, cards, badges). */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1    },
  exit:    { opacity: 0, scale: 0.88 },
} as const;
