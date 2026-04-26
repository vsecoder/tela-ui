import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Person, Bell, Shield, CreditCard, ChevronRight,
  TrashBin, ArrowRightFromSquare, Key, EnvelopeOpen,
  CircleCheck,
} from '@gravity-ui/icons';
import { List }         from '../../components/List/List';
import { Section }      from '../../components/Section/Section';
import { Cell }         from '../../components/Cell/Cell';
import { Switch }       from '../../components/Switch/Switch';
import { Avatar }       from '../../components/Avatar/Avatar';
import { Badge }        from '../../components/Badge/Badge';
import { Modal }        from '../../components/Modal/Modal';
import { Button }       from '../../components/Button/Button';
import { Inset }        from '../../components/Inset/Inset';
import { Select }       from '../../components/Select/Select';

const meta: Meta = {
  title: 'Examples/Settings',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const ProfileSettings: Story = {
  name: 'Profile & Settings',
  render: () => {
    const [pushEnabled,   setPushEnabled]   = useState(true);
    const [emailEnabled,  setEmailEnabled]  = useState(false);
    const [twoFa,         setTwoFa]         = useState(true);
    const toggle = (set: (v: boolean) => void) => (e: React.ChangeEvent<HTMLInputElement>) => set(e.target.checked);
    const [logoutOpen,    setLogoutOpen]    = useState(false);
    const [deleteOpen,    setDeleteOpen]    = useState(false);
    const [theme,         setTheme]         = useState('system');
    const [lang,          setLang]          = useState('ru');

    return (
      <div style={{
        maxWidth: 390, margin: '0 auto',
        background: 'var(--ui-bg)', minHeight: '100dvh',
        fontFamily: 'var(--ui-font)',
      }}>

        {/* Profile card */}
        <Inset top={28} bottom={16} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <Avatar size={72} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ui-text)' }}>Алексей Петров</div>
            <div style={{ fontSize: 13, color: 'var(--ui-text-sub)', marginTop: 2 }}>@alex_petrov</div>
          </div>
          <Badge variant="accent" size="m">Pro подписка</Badge>
        </Inset>

        <List>
          {/* Account */}
          <Section header="Аккаунт">
            <Cell before={<Person width={18} height={18} />} after={<ChevronRight width={16} height={16} />} onClick={() => {}}>
              Личные данные
            </Cell>
            <Cell before={<Key width={18} height={18} />} after={<ChevronRight width={16} height={16} />} onClick={() => {}}>
              Сменить пароль
            </Cell>
            <Cell
              before={<Shield width={18} height={18} />}
              after={<Switch checked={twoFa} onChange={toggle(setTwoFa)} />}
            >
              Двухфакторная аутентификация
            </Cell>
          </Section>

          {/* Notifications */}
          <Section header="Уведомления">
            <Cell
              before={<Bell width={18} height={18} />}
              after={<Switch checked={pushEnabled} onChange={toggle(setPushEnabled)} />}
            >
              Push-уведомления
            </Cell>
            <Cell
              before={<EnvelopeOpen width={18} height={18} />}
              subtitle="alex@example.com"
              after={<Switch checked={emailEnabled} onChange={toggle(setEmailEnabled)} />}
            >
              Email-рассылка
            </Cell>
          </Section>

          {/* Appearance */}
          <Section header="Оформление">
            <Select
              header="Тема оформления"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              options={[
                { value: 'light',  label: 'Светлая' },
                { value: 'dark',   label: 'Тёмная' },
                { value: 'system', label: 'Системная' },
              ]}
            />
            <Select
              header="Язык интерфейса"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              options={[
                { value: 'ru', label: 'Русский' },
                { value: 'en', label: 'English' },
                { value: 'uk', label: 'Українська' },
              ]}
            />
          </Section>

          {/* Subscription */}
          <Section header="Подписка">
            <Cell
              before={<CreditCard width={18} height={18} />}
              subtitle="Pro · 299 ₽/мес · до 15 мая"
              after={<ChevronRight width={16} height={16} />}
              onClick={() => {}}
            >
              Управление подпиской
            </Cell>
            <Cell
              before={<CircleCheck width={18} height={18} style={{ color: '#16a34a' }} />}
              subtitle="Активирован 1 апр 2026"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                Pro план
                <Badge variant="success" size="s">Активен</Badge>
              </span>
            </Cell>
          </Section>

          {/* Danger zone */}
          <Section header="Опасная зона">
            <Cell
              before={<ArrowRightFromSquare width={18} height={18} style={{ color: 'var(--ui-danger)' }} />}
              style={{ color: 'var(--ui-danger)' }}
              onClick={() => setLogoutOpen(true)}
            >
              Выйти из аккаунта
            </Cell>
            <Cell
              before={<TrashBin width={18} height={18} style={{ color: 'var(--ui-danger)' }} />}
              style={{ color: 'var(--ui-danger)' }}
              onClick={() => setDeleteOpen(true)}
            >
              Удалить аккаунт
            </Cell>
          </Section>
        </List>

        {/* Logout modal */}
        <Modal open={logoutOpen} onClose={() => setLogoutOpen(false)} title="Выйти из аккаунта">
          <Inset vertical>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--ui-text-sub)', lineHeight: 1.5 }}>
              Вы уверены, что хотите выйти? Все активные хосты продолжат работу.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button size="l" mode="danger" onClick={() => setLogoutOpen(false)}>Выйти</Button>
              <Button size="l" mode="outline" onClick={() => setLogoutOpen(false)}>Отмена</Button>
            </div>
          </Inset>
        </Modal>

        {/* Delete modal */}
        <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Удалить аккаунт">
          <Inset vertical>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--ui-text-sub)', lineHeight: 1.5 }}>
              Это действие необратимо. Все ваши хосты, данные и история будут удалены безвозвратно.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button size="l" mode="danger" onClick={() => setDeleteOpen(false)}>Удалить навсегда</Button>
              <Button size="l" mode="outline" onClick={() => setDeleteOpen(false)}>Отмена</Button>
            </div>
          </Inset>
        </Modal>
      </div>
    );
  },
};
