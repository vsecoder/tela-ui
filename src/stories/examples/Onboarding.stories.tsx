import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnimatePresence, motion } from 'motion/react';
import { CircleCheck } from '@gravity-ui/icons';
import { Stepper }      from '../../components/Stepper/Stepper';
import { Button }       from '../../components/Button/Button';
import { Input }        from '../../components/Input/Input';
import { Select }       from '../../components/Select/Select';
import { Inset }        from '../../components/Inset/Inset';
import { Stagger }      from '../../components/motion/Stagger';
import { FadeIn }       from '../../components/motion/FadeIn';
import { Confetti }     from '../../components/motion/Confetti';
import { Accordion, AccordionItem } from '../../components/Accordion/Accordion';

const STEPS = [
  { label: 'Знакомство' },
  { label: 'О встрече'  },
  { label: 'Вопросы'    },
];

const FAQ = [
  {
    title: 'Сколько длится встреча?',
    body: 'Обычно 30–45 минут. Если тем окажется больше — можем продлить по взаимному согласию.',
  },
  {
    title: 'Можно ли перенести или отменить?',
    body: 'Да, за 2 часа до начала — напишите в Telegram или нажмите ссылку из письма-подтверждения.',
  },
  {
    title: 'Нужна ли какая-то подготовка?',
    body: 'Нет. Просто приходите с вопросами — остальное сделаем вместе.',
  },
  {
    title: 'Что если я опаздываю?',
    body: 'Предупредите заранее. Мы подождём до 10 минут, потом перенесём встречу.',
  },
];

const slideVariants = (dir: number) => ({
  hidden:  { opacity: 0, x: dir * 40 },
  visible: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: dir * -40 },
});

// ---- Validation helpers ----------------------------------------------------

function validateName(v: string): string {
  if (!v.trim()) return 'Введите имя';
  if (v.trim().length < 2) return 'Минимум 2 символа';
  return '';
}

function validateTelegram(v: string): string {
  if (!v.trim()) return '';
  if (!/^@[a-zA-Z0-9_]{5,32}$/.test(v.trim())) return 'Формат: @username (5–32 символа)';
  return '';
}

function validateDate(v: string): string {
  if (!v.trim()) return 'Укажите дату';
  const m = v.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) return 'Формат: ДД.ММ.ГГГГ';
  const [, d, mo, y] = m;
  const entered = new Date(Number(y), Number(mo) - 1, Number(d));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(entered.getTime())) return 'Некорректная дата';
  if (entered < today) return 'Дата не может быть в прошлом';
  return '';
}

// ---- Story source snippet (shown in the <> drawer) -------------------------

const SOURCE = `export const MeetingSetup = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [format, setFormat] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [topic, setTopic] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const touch = (field: string) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const errors = {
    name:     validateName(name),
    telegram: validateTelegram(telegram),
    date:     validateDate(date),
  };

  const handleNext = () => {
    // Mark step fields as touched so errors become visible
    if (step === 0) {
      setTouched((t) => ({ ...t, name: true, telegram: true }));
      if (errors.name || errors.telegram) return;
    }
    if (step === 1) {
      setTouched((t) => ({ ...t, date: true }));
      if (!format || errors.date || !time) return;
    }
    step < STEPS.length - 1 ? setStep(step + 1) : setDone(true);
  };

  return (
    <div style={{ maxWidth: 390, margin: '0 auto', minHeight: '100dvh' }}>
      <Inset top={20} bottom={0}>
        <Stepper steps={STEPS} current={step} />
      </Inset>

      {/* Step 1 */}
      {step === 0 && (
        <>
          <Input
            header="Ваше имя"
            placeholder="Алексей Петров"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => touch('name')}
            error={touched.name ? errors.name : undefined}
          />
          <Input
            header="Telegram"
            placeholder="@username"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            onBlur={() => touch('telegram')}
            error={touched.telegram ? errors.telegram : undefined}
          />
        </>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <>
          <Select header="Формат" value={format}
            onChange={(e) => setFormat(e.target.value)}
            options={[
              { value: '', label: '— Выберите —' },
              { value: 'video', label: 'Видеозвонок' },
              { value: 'voice', label: 'Голосовой звонок' },
            ]} />
          <Input
            header="Дата"
            placeholder="05.05.2026"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onBlur={() => touch('date')}
            error={touched.date ? errors.date : undefined}
          />
          <Select header="Время" value={time}
            onChange={(e) => setTime(e.target.value)}
            options={[
              { value: '', label: '— Выберите —' },
              { value: '10:00', label: '10:00' },
              { value: '11:00', label: '11:00' },
            ]} />
        </>
      )}

      <div style={{ padding: '12px 16px 24px', display: 'flex', gap: 10 }}>
        {step > 0 && (
          <Button size="l" mode="outline" onClick={() => setStep(step - 1)} stretched>
            Назад
          </Button>
        )}
        <Button size="l" stretched onClick={handleNext}>
          {step < STEPS.length - 1 ? 'Далее' : 'Записаться'}
        </Button>
      </div>
    </div>
  );
};`;

// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Examples/Onboarding',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const MeetingSetup: Story = {
  name: 'Meeting Setup',
  parameters: { source: SOURCE },
  render: () => {
    const [step,     setStep]     = useState(0);
    const [prevStep, setPrevStep] = useState(0);
    const [done,     setDone]     = useState(false);

    // Form fields
    const [name,     setName]     = useState('');
    const [telegram, setTelegram] = useState('');
    const [format,   setFormat]   = useState('');
    const [date,     setDate]     = useState('');
    const [time,     setTime]     = useState('');
    const [topic,    setTopic]    = useState('');

    // touched tracks which fields have been blurred or had a submit attempt
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const touch = (field: string) =>
      setTouched((t) => ({ ...t, [field]: true }));

    const touchAll = (fields: string[]) =>
      setTouched((t) => Object.fromEntries([
        ...Object.entries(t),
        ...fields.map((f) => [f, true]),
      ]));

    const errors = {
      name:     validateName(name),
      telegram: validateTelegram(telegram),
      date:     validateDate(date),
    };

    const dir = step > prevStep ? 1 : -1;

    const go = (next: number) => {
      setPrevStep(step);
      setStep(next);
    };

    const handleNext = () => {
      if (step === 0) {
        touchAll(['name', 'telegram']);
        if (errors.name || errors.telegram) return;
      }
      if (step === 1) {
        touchAll(['date']);
        if (!format || errors.date || !time) return;
      }
      if (step < STEPS.length - 1) {
        go(step + 1);
      } else {
        setDone(true);
      }
    };

    if (done) {
      return (
        <div style={{ maxWidth: 390, margin: '0 auto', background: 'var(--ui-bg)', minHeight: '100dvh', fontFamily: 'var(--ui-font)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
          <Confetti count={80} />
          <FadeIn from="none" delay={0.1}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--ui-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CircleCheck width={32} height={32} style={{ color: '#fff' }} />
            </div>
          </FadeIn>
          <FadeIn from="up" delay={0.2}>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ui-text)', marginBottom: 10 }}>
              Всё готово, {name}!
            </div>
          </FadeIn>
          <FadeIn from="up" delay={0.32}>
            <div style={{ fontSize: 14, color: 'var(--ui-text-sub)', lineHeight: 1.6, marginBottom: 32 }}>
              Встреча «{topic || 'без темы'}» запланирована на {date} в {time}.<br />
              Подтверждение придёт в Telegram.
            </div>
          </FadeIn>
          <FadeIn from="up" delay={0.44}>
            <Button size="l" stretched onClick={() => {
              setDone(false); setStep(0); setPrevStep(0);
              setName(''); setTelegram(''); setFormat('');
              setDate(''); setTime(''); setTopic('');
              setTouched({});
            }}>
              Записаться ещё раз
            </Button>
          </FadeIn>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: 390, margin: '0 auto', background: 'var(--ui-bg)', minHeight: '100dvh', fontFamily: 'var(--ui-font)', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <Inset top={20} bottom={0}>
          <FadeIn from="none" duration={0.25}>
            <div style={{ fontSize: 13, color: 'var(--ui-text-hint)', marginBottom: 16 }}>Запись на встречу</div>
          </FadeIn>
          <Stepper steps={STEPS} current={step} />
        </Inset>

        {/* Step content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              variants={slideVariants(dir)}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              style={{ padding: '28px 0 0' }}
            >

              {/* ── Step 1: Знакомство ── */}
              {step === 0 && (
                <Stagger delay={0.04} stagger={0.08} from="up">
                  <Inset vertical>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ui-text)', marginBottom: 6 }}>
                      Привет! 👋
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--ui-text-sub)', lineHeight: 1.6 }}>
                      Расскажите немного о себе, чтобы мы могли лучше подготовиться к встрече.
                    </div>
                  </Inset>
                  <Input
                    header="Ваше имя"
                    placeholder="Алексей Петров"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => touch('name')}
                    error={touched.name ? errors.name : undefined}
                  />
                  <Input
                    header="Telegram"
                    placeholder="@username"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    onBlur={() => touch('telegram')}
                    error={touched.telegram ? errors.telegram : undefined}
                  />
                </Stagger>
              )}

              {/* ── Step 2: О встрече ── */}
              {step === 1 && (
                <Stagger delay={0.04} stagger={0.08} from="up">
                  <Inset vertical>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ui-text)', marginBottom: 6 }}>
                      Детали встречи
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--ui-text-sub)', lineHeight: 1.6 }}>
                      Выберите удобный формат и время — подстроимся под вас.
                    </div>
                  </Inset>
                  <Select
                    header="Формат"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    options={[
                      { value: '',       label: '— Выберите —' },
                      { value: 'video',  label: 'Видеозвонок' },
                      { value: 'voice',  label: 'Голосовой звонок' },
                      { value: 'office', label: 'Офис (Москва)' },
                    ]}
                  />
                  <Input
                    header="Дата"
                    placeholder="05.05.2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onBlur={() => touch('date')}
                    error={touched.date ? errors.date : undefined}
                  />
                  <Select
                    header="Время"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    options={[
                      { value: '',      label: '— Выберите —' },
                      { value: '10:00', label: '10:00' },
                      { value: '11:00', label: '11:00' },
                      { value: '12:00', label: '12:00' },
                      { value: '14:00', label: '14:00' },
                      { value: '15:00', label: '15:00' },
                      { value: '16:00', label: '16:00' },
                    ]}
                  />
                  <Input
                    header="Тема (необязательно)"
                    placeholder="Например: вопросы по тарифу Pro"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </Stagger>
              )}

              {/* ── Step 3: FAQ ── */}
              {step === 2 && (
                <Stagger delay={0.04} stagger={0.07} from="up">
                  <Inset vertical>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ui-text)', marginBottom: 6 }}>
                      Частые вопросы
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--ui-text-sub)', lineHeight: 1.6 }}>
                      Ответы на то, что спрашивают чаще всего.
                    </div>
                  </Inset>
                  <Accordion>
                    {FAQ.map((item) => (
                      <AccordionItem key={item.title} title={item.title}>
                        {item.body}
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Inset vertical>
                    <div style={{ fontSize: 13, color: 'var(--ui-text-hint)', lineHeight: 1.6 }}>
                      Нажимая «Записаться», вы соглашаетесь с тем, что мы свяжемся с вами через Telegram.
                    </div>
                  </Inset>
                </Stagger>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer buttons */}
        <FadeIn from="none" duration={0.2}>
          <Inset top={12} bottom={24} style={{ display: 'flex', gap: 10 }}>
            {step > 0 && (
              <Button size="l" mode="outline" onClick={() => go(step - 1)} stretched>
                Назад
              </Button>
            )}
            <Button size="l" stretched onClick={handleNext}>
              {step < STEPS.length - 1 ? 'Далее' : 'Записаться'}
            </Button>
          </Inset>
        </FadeIn>
      </div>
    );
  },
};
