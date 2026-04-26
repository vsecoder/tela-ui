import { useEffect, useMemo, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  LineController,
  BarController,
  DoughnutController,
  PieController,
  RadarController,
  PolarAreaController,
  BubbleController,
  ScatterController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import type { ChartConfiguration, ChartType, DefaultDataPoint } from 'chart.js';
import { cn } from '../cn';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  LineController,
  BarController,
  DoughnutController,
  PieController,
  RadarController,
  PolarAreaController,
  BubbleController,
  ScatterController,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export type { ChartConfiguration, ChartType };

export interface ChartProps<T extends ChartType = ChartType> {
  type: T;
  data: ChartConfiguration<T, DefaultDataPoint<T>>['data'];
  options?: ChartConfiguration<T, DefaultDataPoint<T>>['options'];
  className?: string;
}

function getThemeColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    text:    style.getPropertyValue('--ui-text').trim()    || '#09090b',
    subText: style.getPropertyValue('--ui-text-sub').trim()|| '#71717a',
    grid:    style.getPropertyValue('--ui-border').trim()  || 'rgba(0,0,0,0.08)',
    surface: style.getPropertyValue('--ui-surface').trim() || '#ffffff',
  };
}

export const Chart = <T extends ChartType = 'line'>({
  type,
  data,
  options,
  className,
}: ChartProps<T>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<ChartJS | null>(null);

  const mergedOptions = useMemo((): ChartConfiguration['options'] => {
    const theme = getThemeColors();
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: theme.text,
            font: { family: 'Inter Variable, Inter, system-ui, sans-serif', size: 12 },
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 3,
          },
        },
        tooltip: {
          backgroundColor: theme.surface,
          titleColor: theme.text,
          bodyColor: theme.subText,
          borderColor: theme.grid,
          borderWidth: 1,
          padding: 10,
          cornerRadius: 10,
          titleFont: { family: 'Inter Variable, Inter, system-ui, sans-serif', weight: 'bold' },
          bodyFont: { family: 'Inter Variable, Inter, system-ui, sans-serif' },
        },
      },
      scales: type === 'pie' || type === 'doughnut' ? undefined : {
        x: {
          ticks: { color: theme.subText, font: { size: 11, family: 'Inter Variable, Inter, system-ui, sans-serif' } },
          grid: { color: theme.grid },
          border: { color: theme.grid },
        },
        y: {
          ticks: { color: theme.subText, font: { size: 11, family: 'Inter Variable, Inter, system-ui, sans-serif' } },
          grid: { color: theme.grid },
          border: { color: theme.grid },
        },
      },
      ...options,
    } as NonNullable<ChartConfiguration['options']>;
  }, [type, options]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    instanceRef.current = new ChartJS(canvas, {
      type,
      data: data as ChartConfiguration['data'],
      options: mergedOptions,
    });

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update data + options without full remount
  useEffect(() => {
    const chart = instanceRef.current;
    if (!chart) return;
    chart.data = data as ChartConfiguration['data'];
    Object.assign(chart.options, mergedOptions);
    chart.update();
  }, [data, mergedOptions]);

  return (
    <div className={cn('ui-chart', className)}>
      <canvas ref={canvasRef} />
    </div>
  );
};
