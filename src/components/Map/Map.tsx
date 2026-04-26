import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { Map as LeafletMap } from 'leaflet';
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
  /** Popup text for the center marker. Omit to show no popup. */
  popup?: string;
  /** Map height in px. Default: `240` */
  height?: number;
  /** Disable pan/zoom interactions. */
  static?: boolean;
  className?: string;
}

let leafletCssInjected = false;

function injectLeafletCss() {
  if (leafletCssInjected || document.querySelector('#leaflet-css')) return;
  const link = document.createElement('link');
  link.id   = 'leaflet-css';
  link.rel  = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(link);
  leafletCssInjected = true;
}

export const Map: FC<MapProps> = ({
  lat,
  lon,
  zoom = 15,
  markers = [],
  popup,
  height = 240,
  static: isStatic = false,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    injectLeafletCss();

    import('leaflet').then((L) => {
      if (!containerRef.current || mapRef.current) return;

      // Fix default icon path broken by bundlers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current, {
        zoomControl:       !isStatic,
        dragging:          !isStatic,
        scrollWheelZoom:   !isStatic,
        doubleClickZoom:   !isStatic,
        touchZoom:         !isStatic,
        keyboard:          !isStatic,
        attributionControl: true,
      }).setView([lat, lon], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const center = L.marker([lat, lon]).addTo(map);
      if (popup) center.bindPopup(popup).openPopup();

      markers.forEach(({ lat: mlat, lon: mlon, popup: mp }) => {
        const m = L.marker([mlat, mlon]).addTo(map);
        if (mp) m.bindPopup(mp);
      });

      mapRef.current = map;
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // intentionally only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('ui-map', isStatic && 'ui-map--static', className)}
      style={{ height }}
    />
  );
};
