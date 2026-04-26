import { Children, cloneElement, createContext, isValidElement, useCallback, useContext, useReducer } from 'react';
import type { FC, FormEvent, ReactElement, ReactNode } from 'react';
import { cn } from '../cn';
import { Button } from '../Button';

/* ---------- context ---------- */

interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

interface FormCtxValue {
  state: FormState;
  setValue: (name: string, value: string) => void;
  setTouched: (name: string) => void;
  setError: (name: string, error: string) => void;
}

const FormCtx = createContext<FormCtxValue | null>(null);

type FormAction =
  | { type: 'SET_VALUE'; name: string; value: string }
  | { type: 'SET_TOUCHED'; name: string }
  | { type: 'SET_ERROR'; name: string; error: string }
  | { type: 'RESET' };

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, values: { ...state.values, [action.name]: action.value }, errors: { ...state.errors, [action.name]: '' } };
    case 'SET_TOUCHED':
      return { ...state, touched: { ...state.touched, [action.name]: true } };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.name]: action.error } };
    case 'RESET':
      return { values: {}, errors: {}, touched: {} };
    default:
      return state;
  }
}

/* ---------- Form ---------- */

interface FormProps {
  initialValues?: Record<string, string>;
  onSubmit?: (values: Record<string, string>) => void | Promise<void>;
  validate?: (values: Record<string, string>) => Record<string, string>;
  children: ReactNode;
  className?: string;
}

const FormRoot: FC<FormProps> = ({ initialValues = {}, onSubmit, validate, children, className }) => {
  const [state, dispatch] = useReducer(reducer, { values: initialValues, errors: {}, touched: {} });

  const setValue = useCallback((name: string, value: string) =>
    dispatch({ type: 'SET_VALUE', name, value }), []);
  const setTouched = useCallback((name: string) =>
    dispatch({ type: 'SET_TOUCHED', name }), []);
  const setError = useCallback((name: string, error: string) =>
    dispatch({ type: 'SET_ERROR', name, error }), []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validate) {
      const errs = validate(state.values);
      for (const [name, error] of Object.entries(errs)) {
        if (error) dispatch({ type: 'SET_ERROR', name, error });
      }
      if (Object.values(errs).some(Boolean)) return;
    }
    await onSubmit?.(state.values);
  };

  return (
    <FormCtx.Provider value={{ state, setValue, setTouched, setError }}>
      <form className={cn('ui-form', className)} onSubmit={handleSubmit} noValidate>
        {children}
      </form>
    </FormCtx.Provider>
  );
};

/* ---------- Form.Field ---------- */

interface FieldProps {
  name: string;
  children: ReactElement;
}

const Field: FC<FieldProps> = ({ name, children }) => {
  const ctx = useContext(FormCtx);
  if (!ctx) throw new Error('Form.Field must be inside <Form>');
  const { state, setValue, setTouched } = ctx;
  const value = state.values[name] ?? '';
  const error = state.errors[name];

  const child = Children.only(children);
  if (!isValidElement(child)) return child;

  const injected = cloneElement(child as ReactElement<Record<string, unknown>>, {
    value,
    onChange: (e: unknown) => {
      const v = (e as { target?: { value?: string } })?.target?.value ?? String(e ?? '');
      setValue(name, v);
    },
    onBlur: () => setTouched(name),
  });

  return (
    <div className="ui-form__field">
      {injected}
      {error && state.touched[name] && (
        <span className="ui-form__error">{error}</span>
      )}
    </div>
  );
};

/* ---------- Form.Submit ---------- */

interface SubmitProps {
  children?: ReactNode;
  disabled?: boolean;
}

const Submit: FC<SubmitProps> = ({ children = 'Отправить', disabled }) => (
  <Button type="submit" disabled={disabled}>
    {children}
  </Button>
);

/* ---------- hook ---------- */

export function useFormValues() {
  const ctx = useContext(FormCtx);
  if (!ctx) throw new Error('useFormValues must be used inside <Form>');
  return ctx.state.values;
}

/* ---------- export ---------- */

export const Form = Object.assign(FormRoot, { Field, Submit });
