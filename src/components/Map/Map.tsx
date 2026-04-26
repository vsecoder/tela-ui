import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { cn } from '../cn';

export interface MapMarker {
  lat: number;
  lon: number;
  popup?: string;
}

export interface MapProps {
  lat: number;
  lon: number;
  zoom?: number;
  /** Extra markers in addition to the center pin. */
  markers?: MapMarker[];
  /** Popup text for the center marker. */
  popup?: string;
  /** Map height in px. Default: `240` */
  height?: number;
  /** Disable pan/zoom interactions. */
  static?: boolean;
  /**
   * Break out of parent horizontal padding (adds `margin: 0 -16px`).
   * Use instead of wrapping in `<Inset>`.
   */
  full?: boolean;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type YMaps = any;

declare global {
  interface Window { ymaps?: YMaps }
}

let scriptPromise: Promise<void> | null = null;

function loadYmaps(): Promise<void> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.id = 'ymaps-api';
    s.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    s.onload  = () => resolve();
    s.onerror = () => reject(new Error('Failed to load Yandex Maps'));
    document.head.appendChild(s);
  });

  return scriptPromise;
}

function getTheme(): 'light' | 'dark' {
  return document.documentElement.getAttribute('data-appearance') === 'dark'
    ? 'dark'
    : 'light';
}

const DARK_FILTER = 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)';

function applyThemeFilter(map: YMaps, theme: string) {
  try {
    const el: HTMLElement = map.panes.get('tiles').getElement();
    el.style.filter = theme === 'dark' ? DARK_FILTER : '';
  } catch {
    // pane may not be ready yet
  }
}

export const Map: FC<MapProps> = ({
  lat, lon, zoom = 15, markers = [], popup,
  height = 240, static: isStatic = false, full = false, className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<YMaps | null>(null);
  const [theme, setTheme]           = useState<string>(getTheme);
  const [isFullscreen, setFullscreen] = useState(false);

  // Watch data-appearance for live theme switching.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const next = getTheme();
      setTheme(prev => (prev !== next ? next : prev));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-appearance'],
    });
    return () => observer.disconnect();
  }, []);

  // Apply CSS filter when theme changes after map is ready.
  useEffect(() => {
    if (mapRef.current) applyThemeFilter(mapRef.current, theme);
  }, [theme]);

  // Init map once on mount.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    loadYmaps().then(() => {
      if (!el || !window.ymaps || mapRef.current) return;

      window.ymaps.ready(() => {
        if (!el || mapRef.current) return;

        const map = new window.ymaps.Map(el, {
          center: [lat, lon],
          zoom,
          controls: isStatic ? [] : ['zoomControl'],
        }, { suppressMapOpenBlock: true });

        if (isStatic) {
          map.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom', 'multiTouch']);
        }

        const center = new window.ymaps.Placemark(
          [lat, lon],
          { balloonContent: popup ?? '' },
          { preset: 'islands#accentCircleDotIcon', iconColor: '#2481cc' },
        );
        map.geoObjects.add(center);
        if (popup) center.balloon.open();

        markers.forEach(({ lat: mlat, lon: mlon, popup: mp }) => {
          map.geoObjects.add(new window.ymaps.Placemark(
            [mlat, mlon],
            { balloonContent: mp ?? '' },
            { preset: 'islands#circleDotIcon' },
          ));
        });

        applyThemeFilter(map, getTheme());
        mapRef.current = map;
      });
    });

    return () => {
      mapRef.current?.destroy();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fullscreen tracking.
  useEffect(() => {
    const onFsChange = () => {
      setFullscreen(!!document.fullscreenElement);
      requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div ref={wrapRef} className={cn('ui-map-wrap', full && 'ui-map-wrap--full', className)}>
      <div
        ref={containerRef}
        className={cn('ui-map', isStatic && 'ui-map--static')}
        style={{ height: isFullscreen ? '100%' : height }}
      />
      <button
        type="button"
        className="ui-map__fullscreen"
        onClick={handleFullscreen}
        aria-label={isFullscreen ? 'Закрыть' : 'На весь экран'}
      >
        {isFullscreen ? (
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 5.5V3a1 1 0 0 1 1-1h2.5M10.5 2H13a1 1 0 0 1 1 1v2.5M14 10.5V13a1 1 0 0 1-1 1h-2.5M5.5 14H3a1 1 0 0 1-1-1v-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
};
