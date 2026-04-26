import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { createPortal } from 'react-dom';
import { Clock } from '@gravity-ui/icons';
import { cn } from '../cn';
import { Button } from '../Button/Button';

export interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  /** Minute step. Default: `5` */
  step?: number;
  header?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const ITEM_H = 44;

function pad(n: number) { return String(n).padStart(2, '0'); }

function useWheel(items: string[], initial: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = initial * ITEM_H;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const i = Math.round(el.scrollTop / ITEM_H);
    setIndex(Math.max(0, Math.min(i, items.length - 1)));
  };

  return { ref, index, onScroll };
}

export const TimePicker: FC<TimePickerProps> = ({
  value,
  onChange,
  step = 5,
  header,
  placeholder = 'Выберите время',
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState(false);

  const hours   = Array.from({ length: 24 },  (_, i) => pad(i));
  const minutes = Array.from({ length: Math.ceil(60 / step) }, (_, i) => pad(i * step));

  const parseValue = () => {
    if (!value) return { h: 0, m: 0 };
    const [hh, mm] = value.split(':').map(Number);
    return {
      h: isNaN(hh) ? 0 : hh,
      m: isNaN(mm) ? 0 : Math.round(mm / step),
    };
  };
  const { h: initH, m: initM } = parseValue();

  const hourWheel = useWheel(hours, initH);
  const minWheel  = useWheel(minutes, initM);

  const confirm = () => {
    onChange?.(`${hours[hourWheel.index]}:${minutes[minWheel.index]}`);
    setOpen(false);
  };

  const displayValue = value ?? '';

  const portalTarget = document.querySelector('.app-root') ?? document.body;

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={cn('ui-timepicker', className)}
        onClick={() => !disabled && setOpen(true)}
      >
        {header && <span className="ui-timepicker__header">{header}</span>}
        <div className="ui-timepicker__field">
          <Clock width={16} height={16} className="ui-timepicker__icon" />
          <span className={cn('ui-timepicker__value', !value && 'ui-timepicker__value--placeholder')}>
            {displayValue || placeholder}
          </span>
        </div>
      </button>

      {open && createPortal(
        <div
          className="ui-timepicker-overlay"
          onPointerDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="ui-timepicker-sheet">
            <div className="ui-timepicker-sheet__title">Выберите время</div>

            <div className="ui-timepicker-sheet__drums">
              {/* Highlight bar */}
              <div className="ui-timepicker-sheet__highlight" />

              {/* Hours */}
              <div
                ref={hourWheel.ref}
                className="ui-timepicker-sheet__drum"
                onScroll={hourWheel.onScroll}
              >
                <div className="ui-timepicker-sheet__drum-pad" />
                {hours.map((h) => (
                  <div key={h} className="ui-timepicker-sheet__drum-item">{h}</div>
                ))}
                <div className="ui-timepicker-sheet__drum-pad" />
              </div>

              <span className="ui-timepicker-sheet__colon">:</span>

              {/* Minutes */}
              <div
                ref={minWheel.ref}
                className="ui-timepicker-sheet__drum"
                onScroll={minWheel.onScroll}
              >
                <div className="ui-timepicker-sheet__drum-pad" />
                {minutes.map((m) => (
                  <div key={m} className="ui-timepicker-sheet__drum-item">{m}</div>
                ))}
                <div className="ui-timepicker-sheet__drum-pad" />
              </div>
            </div>

            <div className="ui-timepicker-sheet__action">
              <Button size="l" stretched onClick={confirm}>Готово</Button>
            </div>
          </div>
        </div>,
        portalTarget,
      )}
    </>
  );
};
