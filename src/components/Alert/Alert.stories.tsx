import type { Meta, StoryObj } from '@storybook/react';
import { CircleCheck, CircleXmark, TriangleExclamationFill, CircleInfo } from '@gravity-ui/icons';
import { Alert } from './Alert';
import { List } from '../List';
import { Section } from '../Section';
import { Inset } from '../Inset';

const iconProps = { width: 18, height: 18 };

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {},
  argTypes: {
    variant:  { control: 'radio', options: ['info', 'success', 'warning', 'danger'] },
    title:    { control: 'text' },
    children: { control: 'text' },
    icon:     { control: false, table: { disable: true } },
    onClose:  { control: false, table: { disable: true } },
  },
  args: {
    variant:  'info',
    title:    'Информация',
    children: 'Это информационное сообщение для пользователя.',
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {};

export const Info: Story = {
  args: {
    variant:  'info',
    icon:     <CircleInfo {...iconProps} />,
    title:    'Доступно обновление',
    children: 'Версия 2.5.0 готова к установке. Перезапустите хост для применения.',
  },
};

export const Success: Story = {
  args: {
    variant:  'success',
    icon:     <CircleCheck {...iconProps} />,
    title:    'Хост запущен',
    children: 'prod-01 успешно запущен и доступен по адресу 192.168.1.101.',
  },
};

export const Warning: Story = {
  args: {
    variant:  'warning',
    icon:     <TriangleExclamationFill {...iconProps} />,
    title:    'Высокая нагрузка',
    children: 'CPU использован на 91%. Рекомендуется ограничить активные модули.',
  },
};

export const Danger: Story = {
  args: {
    variant:  'danger',
    icon:     <CircleXmark {...iconProps} />,
    title:    'Ошибка подключения',
    children: 'Не удалось подключиться к серверу. Проверьте параметры сети.',
  },
};

export const Closeable: Story = {
  args: {
    variant:  'warning',
    icon:     <TriangleExclamationFill {...iconProps} />,
    title:    'Закончится место на диске',
    children: 'Осталось менее 500 МБ. Очистите логи или увеличьте хранилище.',
    onClose:  () => {},
  },
};

export const TextOnly: Story = {
  args: {
    variant:  'info',
    children: 'Без иконки и заголовка — просто короткое сообщение.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <List>
      <Section header="Варианты">
        <Inset vertical>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Alert variant="info"    icon={<CircleInfo {...iconProps} />}               title="Информация" onClose={() => {}}>Версия 2.5.0 готова к установке.</Alert>
            <Alert variant="success" icon={<CircleCheck {...iconProps} />}              title="Готово">Хост успешно запущен.</Alert>
            <Alert variant="warning" icon={<TriangleExclamationFill {...iconProps} />} title="Внимание" onClose={() => {}}>CPU выше 90%.</Alert>
            <Alert variant="danger"  icon={<CircleXmark {...iconProps} />}              title="Ошибка">Не удалось подключиться к серверу.</Alert>
          </div>
        </Inset>
      </Section>
    </List>
  ),
};

// Note: Alert — инлайн-баннер внутри страницы, в отличие от Snackbar (всплывающего).
// Используй внутри <Inset vertical> или с margin для отступов от краёв.
// icon не обязателен, title не обязателен — можно только children.
// onClose делает Alert закрываемым, без него — постоянный.
