import { useState } from 'react';
import type { FC } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Calendar } from '@gravity-ui/icons';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  header?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const MONTHS_RU = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const DAYS_RU   = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function calendarDays(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  // Monday-based: getDay() returns 0=Sun, shift to Mon=0
  const startDow = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(startDow).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  min,
  max,
  header,
  placeholder = 'Выберите дату',
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState<{ y: number; m: number }>(() => {
    const d = value ?? new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  const today = new Date();
  const cells = calendarDays(cursor.y, cursor.m);

  const prevMonth = () => setCursor(({ y, m }) => m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 });
  const nextMonth = () => setCursor(({ y, m }) => m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 });

  const pick = (d: Date) => {
    if (min && d < min) return;
    if (max && d > max) return;
    onChange?.(d);
    setOpen(false);
  };

  const portalTarget = document.querySelector('.app-root') ?? document.body;

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={cn('ui-datepicker', className)}
        onClick={() => !disabled && setOpen(true)}
      >
        {header && <span className="ui-datepicker__header">{header}</span>}
        <div className="ui-datepicker__field">
          <Calendar width={16} height={16} className="ui-datepicker__icon" />
          <span className={cn('ui-datepicker__value', !value && 'ui-datepicker__value--placeholder')}>
            {value ? formatDate(value) : placeholder}
          </span>
        </div>
      </button>

      {open && createPortal(
        <div
          className="ui-datepicker-overlay"
          onPointerDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="ui-datepicker-sheet">
            {/* Month nav */}
            <div className="ui-datepicker-sheet__nav">
              <button type="button" className="ui-datepicker-sheet__nav-btn" onClick={prevMonth} aria-label="Предыдущий месяц">
                <ChevronLeft width={18} height={18} />
              </button>
              <span className="ui-datepicker-sheet__month">
                {MONTHS_RU[cursor.m]} {cursor.y}
              </span>
              <button type="button" className="ui-datepicker-sheet__nav-btn" onClick={nextMonth} aria-label="Следующий месяц">
                <ChevronRight width={18} height={18} />
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="ui-datepicker-sheet__grid">
              {DAYS_RU.map((d) => (
                <span key={d} className="ui-datepicker-sheet__dow">{d}</span>
              ))}

              {/* Day cells */}
              {cells.map((day, idx) => {
                if (!day) return <span key={`e-${idx}`} />;
                const isSelected = value ? isSameDay(day, value) : false;
                const isToday    = isSameDay(day, today);
                const isDisabled = (min && day < min) || (max && day > max) || false;
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => pick(day)}
                    className={cn(
                      'ui-datepicker-sheet__day',
                      isSelected && 'ui-datepicker-sheet__day--selected',
                      isToday && !isSelected && 'ui-datepicker-sheet__day--today',
                      isDisabled && 'ui-datepicker-sheet__day--disabled',
                    )}
                  >
                    {day.getDate()}
                    <Ripple />
                  </button>
                );
              })}
            </div>
          </div>
        </div>,
        portalTarget,
      )}
    </>
  );
};
