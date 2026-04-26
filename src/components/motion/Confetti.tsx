import { type FC, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';

const COLORS = [
  '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
  '#FF922B', '#CC5DE8', '#F06595', '#20C997',
  '#74C0FC', '#FFA94D', '#A9E34B', '#FF6B9D',
  '#63E6BE', '#F783AC', '#94D82D', '#339AF0',
];

export interface ConfettiProps {
  /** Number of particles. Default 60. */
  count?: number;
  /**
   * Launch origin in viewport px. Default: top-center of the screen.
   * Use for burst-from-button style by passing the button's rect center.
   */
  origin?: { x: number; y: number };
  /** Called after the last particle finishes. */
  onComplete?: () => void;
}

interface Particle {
  id: number;
  color: string;
  isCircle: boolean;
  w: number;
  h: number;
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  rotate: number;
  duration: number;
  delay: number;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeParticles(count: number, origin?: { x: number; y: number }): Particle[] {
  const W = typeof window !== 'undefined' ? window.innerWidth  : 390;
  const H = typeof window !== 'undefined' ? window.innerHeight : 844;

  return Array.from({ length: count }, (_, id) => {
    const isCircle = Math.random() > 0.45;
    const size = rand(7, 14);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    if (origin) {
      // Burst from a point — particles scatter in all directions then fall
      const angle  = rand(0, Math.PI * 2);
      const speed  = rand(160, 440);
      const dx     = Math.cos(angle) * speed;
      const dy     = Math.sin(angle) * speed - rand(80, 200); // bias upward
      return {
        id, color, isCircle,
        w: isCircle ? size : size * 0.55,
        h: isCircle ? size : size * 1.7,
        x0: origin.x,
        y0: origin.y,
        dx,
        dy: dy + H * 0.9,               // gravity pulls to bottom
        rotate: rand(-540, 540),
        duration: rand(1.1, 1.8),
        delay:    rand(0, 0.15),
      };
    }

    // Rain from top — particles start above the viewport
    const x0 = rand(-40, W + 40);
    return {
      id, color, isCircle,
      w: isCircle ? size : size * 0.55,
      h: isCircle ? size : size * 1.7,
      x0,
      y0: rand(-60, -10),
      dx: rand(-80, 80),                 // horizontal drift
      dy: H + rand(60, 120),             // fall to bottom
      rotate: rand(-720, 720),
      duration: rand(1.4, 2.4),
      delay:    rand(0, 0.6),
    };
  });
}

export const Confetti: FC<ConfettiProps> = ({
  count = 60,
  origin,
  onComplete,
}) => {
  const particles = useMemo(
    () => makeParticles(count, origin),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const maxDuration = Math.max(...particles.map((p) => p.delay + p.duration));

  useEffect(() => {
    if (!onComplete) return;
    const t = setTimeout(onComplete, maxDuration * 1000 + 50);
    return () => clearTimeout(t);
  }, [onComplete, maxDuration]);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            top:    p.y0,
            left:   p.x0,
            width:  p.w,
            height: p.h,
            borderRadius: p.isCircle ? '50%' : '2px',
            backgroundColor: p.color,
            willChange: 'transform, opacity',
          }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{
            x:       p.dx,
            y:       p.dy,
            rotate:  p.rotate,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            ease:     'easeIn',
            opacity: {
              times:    [0, 0.7, 1],
              duration: p.duration,
              delay:    p.delay,
            },
          }}
        />
      ))}
    </div>
  );
};
