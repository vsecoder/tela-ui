import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { FC, ReactNode } from 'react';
import { Check } from '@gravity-ui/icons';
import type { SelectOption } from '../Select/Select';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export type { SelectOption };

interface ComboboxProps {
  header?: ReactNode;
  before?: ReactNode;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Allow entering a value not present in options */
  freeInput?: boolean;
  disabled?: boolean;
  className?: string;
}

interface PopupPos { top?: number; bottom?: number; left: number; width: number; }

export const Combobox: FC<ComboboxProps> = ({
  header,
  before,
  options,
  value = '',
  onChange,
  placeholder,
  freeInput = false,
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [pos, setPos] = useState<PopupPos | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return options.filter((o) => String(o.label).toLowerCase().includes(q));
  }, [options, query]);

  const openDropdown = () => {
    if (disabled || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUpward = spaceBelow < 140 && spaceAbove > spaceBelow;
    setPos({
      left: rect.left,
      width: rect.width,
      ...(openUpward ? { bottom: window.innerHeight - rect.top } : { top: rect.bottom + 4 }),
    });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); } };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const handleInput = (v: string) => {
    setQuery(v);
    if (freeInput) onChange?.(v);
    if (!open) openDropdown();
  };

  const pick = (opt: SelectOption) => {
    setQuery(String(opt.label));
    onChange?.(opt.value);
    setOpen(false);
  };

  const portalTarget = document.querySelector('.app-root') ?? document.body;

  return (
    <div ref={wrapRef} className={cn('ui-combobox', className)}>
      {header && <span className="ui-combobox__header">{header}</span>}
      <div className="ui-combobox__field">
        {before && <span className="ui-combobox__before">{before}</span>}
        <input
          ref={inputRef}
          className="ui-combobox__input"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={openDropdown}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>

      {open && pos && createPortal(
        <ul
          className="ui-combobox-popup"
          style={{ position: 'fixed', left: pos.left, width: pos.width, ...(pos.top !== undefined ? { top: pos.top } : { bottom: pos.bottom }) }}
          role="listbox"
        >
          {filtered.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                role="option"
                aria-selected={opt.value === value}
                disabled={opt.disabled}
                className={cn('ui-combobox-popup__option', opt.value === value && 'ui-combobox-popup__option--selected')}
                onMouseDown={(e) => { e.preventDefault(); pick(opt); }}
              >
                <span className="ui-combobox-popup__label">{opt.label}</span>
                {opt.value === value && <Check width={14} height={14} className="ui-combobox-popup__check" />}
                <Ripple />
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="ui-combobox-popup__empty">Ничего не найдено</li>
          )}
        </ul>,
        portalTarget,
      )}
    </div>
  );
};
