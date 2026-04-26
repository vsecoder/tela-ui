import { Children, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { FC, ReactNode } from 'react';
import { ChevronDown, Check, MagnifierPlus } from '@gravity-ui/icons';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  /** Label rendered above the trigger. */
  header?: ReactNode;
  /** Icon placed to the left of the selected value. */
  before?: ReactNode;
  /** Structured options list — preferred over JSX `<option>` children. */
  options?: SelectOption[];
  value?: string;
  /** Fires with a synthetic `{ target: { value } }` object — compatible with `useState` setter via `e.target.value`. */
  onChange?: (e: { target: { value: string } }) => void;
  placeholder?: string;
  /** Show a search field inside the bottom sheet. */
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  /** Legacy: pass `<option>` elements as children instead of `options` prop. */
  children?: ReactNode;
}

function parseChildren(children: ReactNode): SelectOption[] {
  const opts: SelectOption[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === 'option') {
      const p = child.props as { value?: string | number; children?: ReactNode; disabled?: boolean };
      opts.push({ value: String(p.value ?? ''), label: p.children, disabled: p.disabled });
    } else {
      // handle React.Fragment wrapper
      const nestedChildren = (child.props as { children?: ReactNode }).children;
      if (nestedChildren) opts.push(...parseChildren(nestedChildren));
    }
  });
  return opts;
}

/**
 * Native-feel select that opens a bottom-sheet picker.
 * Accepts either a structured `options` array or legacy JSX `<option>` children.
 *
 * ```tsx
 * <Select
 *   header="Регион"
 *   value={region}
 *   onChange={(e) => setRegion(e.target.value)}
 *   options={[
 *     { value: 'eu-west',  label: 'EU West'  },
 *     { value: 'us-east',  label: 'US East'  },
 *     { value: 'asia',     label: 'Asia'     },
 *   ]}
 * />
 * ```
 */
export const Select: FC<SelectProps> = ({
  header,
  before,
  options: optionsProp,
  value = '',
  onChange,
  placeholder,
  searchable = false,
  disabled = false,
  className,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const options = useMemo(
    () => optionsProp ?? (children ? parseChildren(children) : []),
    [optionsProp, children],
  );

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label ?? placeholder ?? '';

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => String(o.label).toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    if (!open) { setQuery(''); return; }
    if (searchable) setTimeout(() => searchRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, searchable]);

  const pick = (v: string) => {
    setOpen(false);
    onChange?.({ target: { value: v } });
  };

  const portalTarget = document.querySelector('.app-root') ?? document.body;

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={cn('ui-select', className)}
        onClick={() => !disabled && setOpen(true)}
      >
        {header && <span className="ui-select__header">{header}</span>}
        <div className="ui-select__field">
          {before && <span className="ui-select__before">{before}</span>}
          <span className={cn('ui-select__value', !selected && 'ui-select__value--placeholder')}>
            {displayLabel}
          </span>
          <ChevronDown className="ui-select__chevron" width={16} height={16} />
        </div>
      </button>

      {open && createPortal(
        <div
          className="ui-select-overlay"
          onPointerDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="ui-select-sheet" role="listbox">
            {searchable && (
              <div className="ui-select-sheet__search-wrap">
                <input
                  ref={searchRef}
                  className="ui-select-sheet__search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск..."
                />
                <MagnifierPlus width={16} height={16} className="ui-select-sheet__search-icon" />
              </div>
            )}
            <ul className="ui-select-sheet__list">
              {filtered.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={opt.value === value}
                    disabled={opt.disabled}
                    className={cn('ui-select-sheet__option', opt.value === value && 'ui-select-sheet__option--selected')}
                    onClick={() => pick(opt.value)}
                  >
                    <span className="ui-select-sheet__option-label">{opt.label}</span>
                    {opt.value === value && <Check width={16} height={16} className="ui-select-sheet__check" />}
                    <Ripple />
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="ui-select-sheet__empty">Ничего не найдено</li>
              )}
            </ul>
          </div>
        </div>,
        portalTarget,
      )}
    </>
  );
};
