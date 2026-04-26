import { Children, useCallback, useEffect, useRef, useState } from 'react';
import type { FC, PointerEvent, ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from '@gravity-ui/icons';
import { cn } from '../cn';

interface CarouselProps {
  children: ReactNode;
  /** Show prev/next arrow buttons */
  arrows?: boolean;
  /** Show dot indicators */
  dots?: boolean;
  className?: string;
}

export const Carousel: FC<CarouselProps> = ({ children, arrows = false, dots = true, className }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const count = Children.count(children);

  const dragStart = useRef<number | null>(null);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Array.from(track.children).indexOf(entry.target as HTMLElement);
            if (idx !== -1) setCurrent(idx);
          }
        }
      },
      { root: track, threshold: 0.5 },
    );
    Array.from(track.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [count]);

  const prev = () => scrollTo(Math.max(0, current - 1));
  const next = () => scrollTo(Math.min(count - 1, current + 1));

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragStart.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) next(); else prev();
  };

  const onPointerCancel = () => { dragStart.current = null; };

  return (
    <div className={cn('ui-carousel', className)}>
      <div
        ref={trackRef}
        className="ui-carousel__track"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {Children.map(children, (child, i) => (
          <div key={i} className="ui-carousel__slide">{child}</div>
        ))}
      </div>

      {arrows && count > 1 && (
        <>
          <button
            type="button"
            className={cn('ui-carousel__arrow', 'ui-carousel__arrow--prev', current === 0 && 'ui-carousel__arrow--hidden')}
            onClick={prev}
            aria-label="Предыдущий"
          >
            <ArrowLeft width={18} height={18} />
          </button>
          <button
            type="button"
            className={cn('ui-carousel__arrow', 'ui-carousel__arrow--next', current === count - 1 && 'ui-carousel__arrow--hidden')}
            onClick={next}
            aria-label="Следующий"
          >
            <ArrowRight width={18} height={18} />
          </button>
        </>
      )}

      {dots && count > 1 && (
        <div className="ui-carousel__dots" role="tablist">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              className={cn('ui-carousel__dot', i === current && 'ui-carousel__dot--active')}
              onClick={() => scrollTo(i)}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
