import { forwardRef, useEffect, useRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../cn';

function mergeRefs<T>(...refs: Array<React.Ref<T> | null | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref != null) (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

interface RippleProps extends HTMLAttributes<HTMLSpanElement> {}

/**
 * Ripple feedback overlay. Place inside any `position: relative; overflow: hidden` container.
 * Attaches a `pointerdown` listener to the parent element and plays a radial wave from the tap point.
 */
export const Ripple = forwardRef<HTMLSpanElement, RippleProps>(({ className, ...rest }, forwardedRef) => {
  const parentRef = useRef<HTMLElement | null>(null);
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const show = (x: number, y: number) => {
    const el = rippleRef.current;
    if (!el) return;
    el.classList.remove('ui-ripple--active');
    el.style.top = `${y}px`;
    el.style.left = `${x}px`;
    // Force reflow so the animation restarts even on rapid taps
    void el.offsetWidth;
    el.classList.add('ui-ripple--active');
  };

  const hide = () => {
    rippleRef.current?.classList.remove('ui-ripple--active');
  };

  useEffect(() => {
    if (!rippleRef.current) return;
    parentRef.current = rippleRef.current.parentElement;

    const onPointerDown = (e: PointerEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      show(e.clientX - rect.left, e.clientY - rect.top);
    };

    const parent = parentRef.current;
    parent?.addEventListener('pointerdown', onPointerDown);
    return () => parent?.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return (
    <span
      ref={mergeRefs(forwardedRef, rippleRef)}
      role="presentation"
      aria-hidden
      className={cn('ui-ripple', className)}
      onAnimationEnd={hide}
      {...rest}
    />
  );
});

Ripple.displayName = 'Ripple';
