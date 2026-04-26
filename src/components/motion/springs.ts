/**
 * Shared spring/transition presets for consistent motion across the UI.
 *
 * Usage:
 *   import { tapSpring, snapSpring } from '../motion/springs';
 *   <motion.button transition={tapSpring} ... />
 */

/** Icon-level press (icon squishes inside a pill, damping lower = more bounce). */
export const tapSpring = { type: 'spring', stiffness: 500, damping: 18 } as const;

/** Full button press (heavier, less bouncy). */
export const buttonSpring = { type: 'spring', stiffness: 500, damping: 25 } as const;

/** Sheet / modal entrance — vaul-like spring. */
export const snapSpring = { type: 'spring', stiffness: 380, damping: 36, mass: 1 } as const;

/** Progress bar fill — slow, weighty. */
export const gentleSpring = { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 } as const;

/** Snackbar / toast pop — quick and light. */
export const snackbarSpring = { type: 'spring', stiffness: 500, damping: 38, mass: 0.7 } as const;

/** Entrance with noticeable overshoot (badges, alerts, counts). */
export const bounceSpring = { type: 'spring', stiffness: 420, damping: 12, mass: 0.7 } as const;

/** Collapse / expand — balanced. */
export const collapseSpring = { type: 'spring', stiffness: 300, damping: 30 } as const;
