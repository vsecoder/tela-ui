import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Cell } from '../Cell';
import { Section } from '../Section';
import { AppRoot } from '../AppRoot';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title:    { control: 'text' },
    open:     { control: false },
    onClose:  { control: false },
    children: { control: false },
  },
  args: {
    title: 'Заголовок',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть модалку</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <Section>
            <Cell subtitle="Подзаголовок">Содержимое модалки</Cell>
          </Section>
          <Button mode="outline" onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={() => setOpen(false)}>Подтвердить</Button>
        </Modal>
      </>
    );
  },
};

export const Confirm: Story = {
  args: { title: 'Подтверждение' },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть модалку</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <Section>
            <Cell subtitle="Это действие нельзя отменить">Удалить хост?</Cell>
          </Section>
          <Button mode="outline" onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={() => setOpen(false)}>Удалить</Button>
        </Modal>
      </>
    );
  },
};

export const WithLongContent: Story = {
  args: { title: 'Выбор сервера' },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Список серверов</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <Section>
            {Array.from({ length: 12 }, (_, i) => (
              <Cell key={i} subtitle={`eu-west-${i + 1}.hikka.host`} onClick={() => setOpen(false)}>
                {`Server #${i + 1}`}
              </Cell>
            ))}
          </Section>
        </Modal>
      </>
    );
  },
};

export const NoTitle: Story = {
  args: { title: undefined },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Без заголовка</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <Section>
            <Cell>Просто контент без заголовка</Cell>
          </Section>
        </Modal>
      </>
    );
  },
};

export const Usage: Story = {
  render: () => {
    const [chooseOpen, setChooseOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [server, setServer] = useState('');
    const servers = ['prod-01 (eu-west-1)', 'prod-02 (us-east-1)', 'staging-01 (ap-south-1)'];
    return (
      <div style={{ display: 'flex', gap: 8, padding: 16, flexWrap: 'wrap' }}>
        <Button onClick={() => setChooseOpen(true)}>Выбрать сервер</Button>
        <Button mode="outline" onClick={() => setDeleteOpen(true)}>Удалить хост</Button>

        <Modal open={chooseOpen} onClose={() => setChooseOpen(false)} title="Выбор сервера">
          <Section>
            {servers.map((s) => (
              <Cell key={s} hint={server === s ? '✓' : ''} onClick={() => { setServer(s); setChooseOpen(false); }}>{s}</Cell>
            ))}
          </Section>
          {server && <Button mode="outline" onClick={() => setChooseOpen(false)}>Отмена</Button>}
        </Modal>

        <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Удалить хост?">
          <Section>
            <Cell subtitle="Это действие нельзя отменить">prod-01 будет безвозвратно удалён</Cell>
          </Section>
          <Button mode="outline" onClick={() => setDeleteOpen(false)}>Отмена</Button>
          <Button onClick={() => setDeleteOpen(false)}>Удалить</Button>
        </Modal>
      </div>
    );
  },
};

// Note: Modal — bottomsheet с drag-to-close. Управляй через open + onClose.
// Прямые children Button получают margin: 0 16px автоматически.
// Кнопки внутри Modal: сначала outline "Отмена", потом основное действие.
// Деструктивное действие — обычная Button (не danger mode) — название кнопки говорит само за себя.
// Не открывай Modal поверх другого Modal — используй вложенный ActionMenu.
