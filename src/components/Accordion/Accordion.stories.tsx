import type { Meta, StoryObj } from '@storybook/react';
import { CircleQuestion, Persons, Server } from '@gravity-ui/icons';
import { Accordion, AccordionItem } from './Accordion';
import { AccordionCell } from './AccordionCell';
import { Section } from '../Section';

const meta: Meta<typeof AccordionItem> = {
  title: 'UI/Accordion',
  component: AccordionItem,
  argTypes: {
    title:       { control: 'text' },
    defaultOpen: { control: 'boolean' },
    before:      { control: false },
    children:    { control: 'text' },
  },
  args: {
    title: 'Что такое Платформа?',
    defaultOpen: false,
    children: 'Платформа — платформа для управления userbot-хостингом прямо из Telegram.',
  },
};

export default meta;
type Story = StoryObj<typeof AccordionItem>;

export const Playground: Story = {
  render: (args) => (
    <Accordion>
      <AccordionItem {...args} />
    </Accordion>
  ),
};

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Что такое Платформа?">
        Платформа — платформа для управления userbot-хостингом прямо из Telegram.
        Запускайте, настраивайте и мониторьте своих ботов без командной строки.
      </AccordionItem>
      <AccordionItem title="Как добавить новый хост?" defaultOpen>
        Перейдите в раздел «Группы», выберите нужную группу и нажмите «Создать хост».
        Выберите сервер, userbot и укажите параметры — готово за пару кликов.
      </AccordionItem>
      <AccordionItem title="Сколько это стоит?">
        Базовый план бесплатный. Расширенные возможности доступны по подписке.
        Подробнее — в разделе «Тарифы».
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Accordion>
      <AccordionItem title="Группы" before={<Persons width={20} height={20} />}>
        Группы объединяют несколько хостов под одним управлением.
        Приглашайте участников по ссылке.
      </AccordionItem>
      <AccordionItem title="Серверы" before={<Server width={20} height={20} />}>
        Серверы — физическая инфраструктура для запуска хостов.
        Доступны несколько регионов с разной нагрузкой.
      </AccordionItem>
    </Accordion>
  ),
};

export const Usage: Story = {
  render: () => (
    <div style={{ padding: 16 }}>
      <Accordion>
        <AccordionItem title="Конфигурация" defaultOpen>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14 }}>
              {[
                ['Сервер', 'prod-01 (eu-west-1)'],
                ['Тип', 'Hikka userbot'],
                ['Python', '3.11.4'],
                ['Запущен', '14 апр 2026, 09:12'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ui-text)' }}>
                  <span style={{ color: 'var(--ui-text-hint)' }}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </AccordionItem>
          <AccordionItem title="Переменные окружения">
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--ui-text-hint)', lineHeight: 1.8 }}>
              {'API_ID=12345678\nAPI_HASH=••••••••••••\nSTRING_SESSION=••••••'}
            </div>
          </AccordionItem>
          <AccordionItem title="Логи (последние 3 строки)">
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--ui-text-hint)', lineHeight: 1.7 }}>
              {'[INFO] Hikka v2.4.0 started\n[INFO] Connected to Telegram\n[OK] All modules loaded (42)'}
            </div>
          </AccordionItem>
        </Accordion>
    </div>
  ),
};

export const Single: Story = {
  name: 'Single Open',
  render: () => (
    <Accordion single>
      <AccordionItem title="Конфигурация" defaultOpen>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14 }}>
          {[
            ['Сервер', 'prod-01 (eu-west-1)'],
            ['Python', '3.11.4'],
            ['Запущен', '14 апр 2026, 09:12'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ui-text)' }}>
              <span style={{ color: 'var(--ui-text-hint)' }}>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </AccordionItem>
      <AccordionItem title="Переменные окружения">
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--ui-text-hint)', lineHeight: 1.8 }}>
          {'API_ID=12345678\nAPI_HASH=••••••••••••\nSTRING_SESSION=••••••'}
        </div>
      </AccordionItem>
      <AccordionItem title="Логи">
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'var(--ui-text-hint)', lineHeight: 1.7 }}>
          {'[INFO] Hikka v2.4.0 started\n[INFO] Connected to Telegram\n[OK] All modules loaded (42)'}
        </div>
      </AccordionItem>
    </Accordion>
  ),
};

// Note: AccordionItem/Accordion — вне Section, в Inset или с padding.
// AccordionCell — вариант для размещения внутри Section (без Accordion-обёртки).
// defaultOpen=true для первого важного элемента.
// Не вкладывай List/Section внутрь AccordionItem — только текст и простые элементы.
// FAQ и документация — основные сценарии использования.

export const FAQ: Story = {
  render: () => (
    <Section header="Часто задаваемые вопросы">
      <AccordionCell title="Как восстановить доступ к аккаунту?" before={<CircleQuestion width={20} height={20} />}>
        Напишите в поддержку через @SupportBot — укажите Telegram ID и описание проблемы.
        Мы ответим в течение 24 часов.
      </AccordionCell>
      <AccordionCell title="Можно ли перенести хост на другой сервер?">
        Да. В настройках хоста выберите «Сменить сервер». Перенос занимает до 5 минут,
        хост временно недоступен.
      </AccordionCell>
      <AccordionCell title="Какие userbots поддерживаются?">
        На данный момент поддерживаются Hikka и совместимые форки.
        Список расширяется — следите за обновлениями.
      </AccordionCell>
      <AccordionCell title="Есть ли API для разработчиков?">
        Да, REST API доступен по адресу api.example.com. Документация — в разделе Docs.
      </AccordionCell>
    </Section>
  ),
};
