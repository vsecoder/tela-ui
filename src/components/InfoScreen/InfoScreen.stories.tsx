import type { Meta, StoryObj } from '@storybook/react';
import { PaperPlane, Sparkles, Diamond } from '@gravity-ui/icons';
import { InfoScreen } from './InfoScreen';
import { Button } from '../Button';
import { AppRoot } from '../AppRoot';

const meta: Meta<typeof InfoScreen> = {
  title: 'UI/InfoScreen',
  component: InfoScreen,
  parameters: { layout: 'fullscreen' },
  decorators: [],
  argTypes: {
    title:    { control: 'text' },
    features: { control: false },
    action:   { control: false },
  },
  args: {
    title: 'Добро пожаловать',
  },
};

export default meta;
type Story = StoryObj<typeof InfoScreen>;

export const Playground: Story = {
  args: {
    action: <Button>Начать</Button>,
  },
};

export const CryptoTransfer: Story = {
  args: {
    title: 'Перевести криптовалюту просто, как отправить сообщение',
    features: [
      {
        icon: <PaperPlane width={28} height={28} />,
        title: 'Отправляйте кому угодно в Telegram',
        description: 'Переводите криптовалюту контактам — прямо в чате',
      },
      {
        icon: <Sparkles width={28} height={28} />,
        title: 'Никаких комиссий',
        description: 'Контакты получат столько, сколько вы отправили',
      },
      {
        icon: <Diamond width={28} height={28} />,
        title: 'Нет кошелька? Не проблема',
        description: 'Создать можно за пару секунд и сразу получить криптовалюту',
      },
    ],
    action: <Button>Выбрать контакт в Telegram</Button>,
  },
};

export const NoFeatures: Story = {
  args: {
    title: 'Добро пожаловать',
    action: <Button>Начать</Button>,
  },
};

export const NoAction: Story = {
  args: {
    title: 'Что-то пошло не так',
    features: [
      {
        icon: <Sparkles width={28} height={28} />,
        title: 'Попробуйте позже',
        description: 'Мы уже работаем над исправлением',
      },
    ],
  },
};

export const Usage: Story = {
  render: () => (
    <InfoScreen
      title="Добро пожаловать"
      features={[
        {
          icon: <PaperPlane width={28} height={28} />,
          title: 'Управляйте хостами из Telegram',
          description: 'Запускайте и останавливайте userbot-хосты прямо в мессенджере',
        },
        {
          icon: <Diamond width={28} height={28} />,
          title: 'Мониторинг в реальном времени',
          description: 'Графики трафика, нагрузки CPU и RAM всегда под рукой',
        },
        {
          icon: <Sparkles width={28} height={28} />,
          title: 'Командная работа',
          description: 'Создавайте группы и делитесь доступом к хостам с коллегами',
        },
      ]}
      action={<Button size="l">Начать работу</Button>}
    />
  ),
};

// Note: InfoScreen — полноэкранный компонент для онбординга, успеха, пустых состояний.
// features=[] допустимо — покажется только title + action.
// action — как правило одна большая Button (size="l").
// Не используй InfoScreen внутри модалки — только как самостоятельный экран.
// Для ошибок с кнопкой "Повторить" — InfoScreen без features.
