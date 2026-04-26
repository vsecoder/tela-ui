import { useRef, type ClipboardEvent, type FC, type KeyboardEvent } from 'react';
import { cn } from '../cn';

export interface PinInputProps {
  /** Number of cells. Default: 4 */
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  /** Fires when all cells are filled */
  onComplete?: (value: string) => void;
  /** Show dots instead of digits */
  mask?: boolean;
  disabled?: boolean;
  className?: string;
}

export const PinInput: FC<PinInputProps> = ({
  length = 4,
  value = '',
  onChange,
  onComplete,
  mask = false,
  disabled = false,
  className,
}) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const go = (i: number) =>
    refs.current[Math.max(0, Math.min(i, length - 1))]?.focus();

  const emit = (next: string) => {
    onChange?.(next);
    if (next.length === length) onComplete?.(next);
  };

  const handleChange = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, '').slice(-1);
    if (!d) return;
    const next = (value.slice(0, i) + d + value.slice(i + 1)).slice(0, length);
    emit(next);
    if (i < length - 1) go(i + 1);
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (value[i]) {
        emit(value.slice(0, i) + value.slice(i + 1));
      } else if (i > 0) {
        emit(value.slice(0, i - 1) + value.slice(i));
        go(i - 1);
      }
    } else if (e.key === 'ArrowLeft')  { go(i - 1); }
      else if (e.key === 'ArrowRight') { go(i + 1); }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    emit(digits);
    go(Math.min(digits.length, length - 1));
  };

  return (
    <div className={cn('ui-pin-input', className)} role="group" aria-label="PIN">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el; }}
          type={mask ? 'password' : 'text'}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          disabled={disabled}
          className={cn('ui-pin-input__cell', value[i] && 'ui-pin-input__cell--filled')}
          value={value[i] ?? ''}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={e => e.target.select()}
          aria-label={`Символ ${i + 1} из ${length}`}
        />
      ))}
    </div>
  );
};
