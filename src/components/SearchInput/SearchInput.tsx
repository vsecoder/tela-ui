import { type FC, useRef } from 'react';
import { CircleXmarkFill, Magnifier } from '@gravity-ui/icons';
import { cn } from '../cn';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /**
   * Vertical padding variant.
   * 'm' → compact (iOS-style), 'l' → default (Android/desktop).
   */
  size?: 'm' | 'l';
  /** Called when the clear button is pressed. Defaults to `onChange('')`. */
  onClear?: () => void;
}

export const SearchInput: FC<SearchInputProps> = ({
  value = '',
  onChange,
  placeholder = 'Search',
  disabled,
  className,
  size = 'l',
  onClear,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    (onClear ?? (() => onChange?.('')))();
    inputRef.current?.focus();
  };

  return (
    <div className={cn('ui-search-input', `ui-search-input--${size}`, className)}>
      <Magnifier className="ui-search-input__icon" width={16} height={16} />
      <div className="ui-search-input__body">
        <input
          ref={inputRef}
          type="search"
          className="ui-search-input__input"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
      {value.length > 0 && (
        <button
          type="button"
          className="ui-search-input__clear"
          onClick={handleClear}
          aria-label="Clear"
          tabIndex={-1}
        >
          <CircleXmarkFill width={16} height={16} />
        </button>
      )}
    </div>
  );
};
