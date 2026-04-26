import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Play, Stop, ArrowRotateRight, ArrowRotateLeft,
  Tag, Person, Calendar, CircleInfo, CircleXmark,
  AntennaSignal, Copy, Key, Link as LinkIcon, Shield,
  TrashBin, Terminal, TerminalLine, Server, ChevronRight,
} from '@gravity-ui/icons';
import { List }         from '../../components/List/List';
import { Section }      from '../../components/Section/Section';
import { Cell }         from '../../components/Cell/Cell';
import { ButtonCell }   from '../../components/ButtonCell/ButtonCell';
import { InlineButtons } from '../../components/InlineButtons/InlineButtons';
import { ProgressBar }  from '../../components/ProgressBar/ProgressBar';
import { Input }        from '../../components/Input/Input';
import { Inset }        from '../../components/Inset/Inset';
import { Button }       from '../../components/Button/Button';
import { CodeBlock }    from '../../components/CodeBlock/CodeBlock';
import { Snackbar }     from '../../components/Snackbar/Snackbar';
import { Badge }        from '../../components/Badge/Badge';
import { Navbar }       from '../../components/Navbar/Navbar';
import { Placeholder }  from '../../components/Placeholder/Placeholder';

const MOCK_LOGS = `[2026-04-26 08:14:01] INFO  Starting Hikka userbot...
[2026-04-26 08:14:02] INFO  Loading modules (42 loaded)
[2026-04-26 08:14:03] INFO  Connected to Telegram
[2026-04-26 08:14:03] INFO  Ready. Prefix: .
[2026-04-26 08:20:11] INFO  Command executed: .help
[2026-04-26 08:31:44] WARN  Rate limit hit, sleeping 5s
[2026-04-26 09:05:22] INFO  Module updated: inline
[2026-04-26 09:05:22] INFO  Restart requested`;

const iconProps = { width: 18, height: 18 };

const meta: Meta = {
  title: 'Examples/Host Dashboard',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const HostPage: Story = {
  name: 'Host Page',
  render: () => {
    const [action,    setAction]    = useState<string | null>(null);
    const [password,  setPassword]  = useState('');
    const [cmdInput,  setCmdInput]  = useState('');
    const [cmdLog,    setCmdLog]    = useState('');
    const [snackbar,  setSnackbar]  = useState<string | null>(null);

    const cpuPercent  = 34;
    const memPercent  = 71;
    const diskPercent = 48;

    const thresholdColor = (pct: number) =>
      pct > 80 ? 'danger' as const : pct > 60 ? 'warning' as const : 'accent' as const;

    const handleAction = (a: string) => {
      setAction(a);
      setTimeout(() => { setAction(null); setSnackbar(`Команда «${a}» отправлена`); }, 1200);
    };

    const handleRunCmd = () => {
      if (!cmdInput.trim()) return;
      setCmdLog((prev) => prev ? `${prev}\n$ ${cmdInput}\nOK` : `$ ${cmdInput}\nOK`);
      setCmdInput('');
    };

    return (
      <div style={{ maxWidth: 390, margin: '0 auto', background: 'var(--ui-bg)', minHeight: '100dvh', fontFamily: 'var(--ui-font)' }}>
        {snackbar && <Snackbar onClose={() => setSnackbar(null)} duration={3000}>{snackbar}</Snackbar>}

        {/* Page header */}
        <Inset top={14} bottom={10} style={{ borderBottom: '1px solid var(--ui-border)', textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--ui-text)' }}>prod-01</div>
        </Inset>

        <List>
          {/* 1. Управление */}
          <InlineButtons>
            <InlineButtons.Item text={action === 'start'   ? 'Запуск…'    : 'Запустить'} onClick={() => handleAction('start')}><Play {...iconProps} /></InlineButtons.Item>
            <InlineButtons.Item text={action === 'stop'    ? 'Стоп…'      : 'Стоп'}      onClick={() => handleAction('stop')}><Stop {...iconProps} /></InlineButtons.Item>
            <InlineButtons.Item text={action === 'restart' ? 'Перезапуск…': 'Перезапуск'} onClick={() => handleAction('restart')}><ArrowRotateRight {...iconProps} /></InlineButtons.Item>
          </InlineButtons>
          <Section>
            <ButtonCell before={<ArrowRotateLeft {...iconProps} />} onClick={() => setSnackbar('Открытие формы продления…')}>
              Продлить
            </ButtonCell>
          </Section>

          {/* 2. Информация */}
          <Section header="Информация">
            <Cell subtitle="Название" before={<Tag {...iconProps} />}>prod-01</Cell>
            <Cell subtitle="Userbot"  before={<Person {...iconProps} />}>hikka-stable</Cell>
            <Cell subtitle="Период"   before={<Calendar {...iconProps} />}>01.04.2026 — 01.05.2026</Cell>
            <Cell subtitle="Статус"   before={<CircleInfo {...iconProps} />}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                running
                <Badge variant="success" size="s">Активен</Badge>
              </span>
            </Cell>
            <ButtonCell before={<ArrowRotateRight {...iconProps} />} onClick={() => setSnackbar('Статус обновлён')}>
              Обновить статус
            </ButtonCell>
          </Section>

          {/* 3. Ресурсы */}
          <Section header="Ресурсы">
            <Cell subtitle={`${cpuPercent}%`}>
              <div style={{ width: '100%' }}>
                <span style={{ fontSize: 15 }}>CPU</span>
                <div style={{ marginTop: 6 }}><ProgressBar value={cpuPercent} color={thresholdColor(cpuPercent)} size="s" /></div>
              </div>
            </Cell>
            <Cell subtitle="365 МБ / 512 МБ">
              <div style={{ width: '100%' }}>
                <span style={{ fontSize: 15 }}>Память</span>
                <div style={{ marginTop: 6 }}><ProgressBar value={memPercent} color={thresholdColor(memPercent)} size="s" /></div>
              </div>
            </Cell>
            <Cell subtitle="4,8 ГБ / 10 ГБ">
              <div style={{ width: '100%' }}>
                <span style={{ fontSize: 15 }}>Диск</span>
                <div style={{ marginTop: 6 }}><ProgressBar value={diskPercent} color={thresholdColor(diskPercent)} size="s" /></div>
              </div>
            </Cell>
            <Cell subtitle="RX 1,2 МБ / TX 0,4 МБ" before={<AntennaSignal {...iconProps} />}>
              Сеть
            </Cell>
            <ButtonCell before={<ArrowRotateRight {...iconProps} />} onClick={() => setSnackbar('Ресурсы обновлены')}>
              Обновить
            </ButtonCell>
            <Cell subtitle="Обновляется каждые 15 сек" before={<CircleInfo {...iconProps} />}>
              Обновлено в 09:14:22
            </Cell>
          </Section>

          {/* 4. Панель управления */}
          <Section header="Панель управления">
            <Cell subtitle="Логин" before={<Person {...iconProps} />}>12-47</Cell>
            <ButtonCell
              before={<Copy {...iconProps} />}
              onClick={() => { void navigator.clipboard.writeText('12-47'); setSnackbar('Логин скопирован'); }}
            >
              Скопировать логин
            </ButtonCell>
            <Input
              header="Новый пароль"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
            <ButtonCell before={<Key {...iconProps} />} onClick={() => setPassword(Math.random().toString(36).slice(2, 12))}>
              Сгенерировать пароль
            </ButtonCell>
            {password && (
              <ButtonCell
                before={<Copy {...iconProps} />}
                onClick={() => { void navigator.clipboard.writeText(password); setSnackbar('Пароль скопирован'); }}
              >
                Скопировать пароль
              </ButtonCell>
            )}
            <ButtonCell before={<Shield {...iconProps} />} onClick={() => { setPassword(''); setSnackbar('Пароль обновлён'); }}>
              Обновить пароль
            </ButtonCell>
            <Cell subtitle="URL панели" multiline before={<LinkIcon {...iconProps} />}>https://prod-01.hikka.host/</Cell>
            <ButtonCell before={<LinkIcon {...iconProps} />} onClick={() => setSnackbar('Открытие панели…')}>
              Открыть панель
            </ButtonCell>
          </Section>

          {/* 5. Логи */}
          <Section header="Логи">
            <ButtonCell before={<ArrowRotateRight {...iconProps} />} onClick={() => setSnackbar('Логи обновлены')}>
              Обновить логи
            </ButtonCell>
            <Cell subtitle="Обновляются каждые 30 сек" before={<CircleInfo {...iconProps} />}>
              Обновлено в 09:05:22
            </Cell>
            <CodeBlock lang="bash" showHeader={false} code={MOCK_LOGS} />
          </Section>

          {/* 6. Терминал */}
          <Section header="Терминал">
            <Input
              header="Команда"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="ping 8.8.8.8"
            />
            <ButtonCell before={<TerminalLine {...iconProps} />} onClick={handleRunCmd}>
              Выполнить
            </ButtonCell>
            <ButtonCell before={<Terminal {...iconProps} />} onClick={() => setCmdLog('')}>
              Очистить
            </ButtonCell>
            {cmdLog && <CodeBlock lang="bash" showHeader={false} code={cmdLog} />}
          </Section>

          {/* 7. Переустановка и удаление */}
          <Section header="Переустановка и удаление">
            <ButtonCell before={<ArrowRotateRight {...iconProps} />} onClick={() => setSnackbar('Открытие формы переустановки…')}>
              Переустановить
            </ButtonCell>
            <ButtonCell before={<TrashBin {...iconProps} />} onClick={() => setSnackbar('Удаление поставлено в очередь')}>
              Удалить хост
            </ButtonCell>
          </Section>
        </List>
      </div>
    );
  },
};

export const HostList: Story = {
  name: 'Host List',
  render: () => {
    const [nav, setNav] = useState('hosts');

    const hosts = [
      { id: 'h1', name: 'prod-01',     region: 'EU West',    status: 'running', uptime: '14д 6ч',  variant: 'success' as const },
      { id: 'h2', name: 'prod-02',     region: 'US East',    status: 'running', uptime: '8д 2ч',   variant: 'success' as const },
      { id: 'h3', name: 'staging-01',  region: 'EU West',    status: 'stopped', uptime: '—',       variant: 'neutral' as const },
      { id: 'h4', name: 'monitor-bot', region: 'Asia South', status: 'error',   uptime: '3ч',      variant: 'danger'  as const },
    ];

    const STATUS_LABEL: Record<string, string> = { running: 'Активен', stopped: 'Остановлен', error: 'Ошибка' };

    return (
      <div style={{ maxWidth: 390, margin: '0 auto', background: 'var(--ui-bg)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--ui-font)' }}>
        <Inset top={16} bottom={4}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ui-text)' }}>Хосты</div>
          <div style={{ fontSize: 13, color: 'var(--ui-text-sub)', marginTop: 2 }}>
            {hosts.filter(h => h.status === 'running').length} активных из {hosts.length}
          </div>
        </Inset>

        <div style={{ flex: 1, overflow: 'auto' }}>
          <List>
            <Section>
              {hosts.map((h) => (
                <Cell
                  key={h.id}
                  before={
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--ui-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ui-text-sub)' }}>
                      <Server width={18} height={18} />
                    </div>
                  }
                  subtitle={h.region}
                  after={
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <Badge variant={h.variant} size="s">{STATUS_LABEL[h.status]}</Badge>
                      {h.status === 'running' && <span style={{ fontSize: 11, color: 'var(--ui-text-hint)' }}>{h.uptime}</span>}
                    </div>
                  }
                  onClick={() => {}}
                >
                  {h.name}
                </Cell>
              ))}
            </Section>
          </List>
        </div>

        <Navbar
          activeId={nav}
          onChange={setNav}
          items={[
            { id: 'hosts',  label: 'Хосты',  icon: <Server width={22} height={22} /> },
            { id: 'create', label: 'Создать', icon: <ChevronRight width={22} height={22} /> },
          ]}
        />
      </div>
    );
  },
};

export const NoHost: Story = {
  name: 'No Host',
  render: () => (
    <div style={{ maxWidth: 390, margin: '0 auto', background: 'var(--ui-bg)', minHeight: '100dvh', fontFamily: 'var(--ui-font)' }}>
      <Placeholder
        header="Хосты не найдены"
        description="Создайте первый хост, чтобы начать пользоваться платформой"
      >
        <Button size="l" style={{ marginTop: 16 }}>Создать хост</Button>
      </Placeholder>
    </div>
  ),
};
