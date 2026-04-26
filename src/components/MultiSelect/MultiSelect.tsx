import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { FC, ReactNode } from 'react';
import { ChevronDown, Check, MagnifierPlus } from '@gravity-ui/icons';
import type { SelectOption } from '../Select/Select';
import { cn } from '../cn';
import { Ripple } from '../Ripple';

export type { SelectOption };

interface MultiSelectProps {
  header?: ReactNode;
  before?: ReactNode;
  options: SelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
}

export const MultiSelect: FC<MultiSelectProps> = ({
  header,
  before,
  options,
  value = [],
  onChange,
  placeholder = 'Выбрать...',
  searchable = false,
  disabled = false,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setDraft([...value]);
      setQuery('');
      if (searchable) setTimeout(() => searchRef.current?.focus(), 80);
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
  }, [open, searchable, value]);

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => String(o.label).toLowerCase().includes(q));
  }, [options, query]);

  const toggle = (v: string) =>
    setDraft((d) => d.includes(v) ? d.filter((x) => x !== v) : [...d, v]);

  const confirm = () => {
    onChange?.(draft);
    setOpen(false);
  };

  const displayLabel = useMemo(() => {
    if (!value.length) return placeholder;
    const labels = value.map((v) => options.find((o) => o.value === v)?.label).filter(Boolean);
    return labels.join(', ');
  }, [value, options, placeholder]);

  const portalTarget = document.querySelector('.app-root') ?? document.body;

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={cn('ui-select', 'ui-multiselect', className)}
        onClick={() => !disabled && setOpen(true)}
      >
        {header && <span className="ui-select__header">{header}</span>}
        <div className="ui-select__field">
          {before && <span className="ui-select__before">{before}</span>}
          <span className={cn('ui-select__value', !value.length && 'ui-select__value--placeholder')}>
            {displayLabel}
          </span>
          {value.length > 0 && (
            <span className="ui-multiselect__count">{value.length}</span>
          )}
          <ChevronDown className="ui-select__chevron" width={16} height={16} />
        </div>
      </button>

      {open && createPortal(
        <div
          className="ui-select-overlay"
          onPointerDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="ui-select-sheet ui-multiselect-sheet" role="listbox" aria-multiselectable="true">
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
              {filtered.map((opt) => {
                const selected = draft.includes(opt.value);
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      disabled={opt.disabled}
                      className={cn('ui-select-sheet__option', selected && 'ui-select-sheet__option--selected')}
                      onClick={() => toggle(opt.value)}
                    >
                      <span className="ui-multiselect-sheet__checkbox" aria-hidden>
                        {selected && <Check width={14} height={14} />}
                      </span>
                      <span className="ui-select-sheet__option-label">{opt.label}</span>
                      <Ripple />
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="ui-select-sheet__empty">Ничего не найдено</li>
              )}
            </ul>
            <div className="ui-multiselect-sheet__footer">
              <button type="button" className="ui-multiselect-sheet__done" onClick={confirm}>
                Готово {draft.length > 0 && `(${draft.length})`}
              </button>
            </div>
          </div>
        </div>,
        portalTarget,
      )}
    </>
  );
};
