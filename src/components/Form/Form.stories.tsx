import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { List } from '../List';
import { Section } from '../Section';
import { Input } from '../Input';
import { Select } from '../Select';
import { Inset } from '../Inset';

const meta: Meta<typeof Form> = {
  title: 'UI/Form',
  component: Form,
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [],
};
export default meta;
type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  name: 'Basic Form',
  render: () => {
    const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);
    return (
      <List>
        <Section header="Новый хост">
          <Form
            initialValues={{ name: '', region: '' }}
            onSubmit={(values) => setSubmitted(values)}
          >
            <Form.Field name="name">
              <Input header="Имя хоста" placeholder="prod-01" />
            </Form.Field>
            <Form.Field name="region">
              <Select
                header="Регион"
                options={[
                  { value: '', label: '— Выберите —' },
                  { value: 'eu-west-1', label: 'EU West (Нидерланды)' },
                  { value: 'us-east-1', label: 'US East (Вирджиния)' },
                  { value: 'ap-south-1', label: 'Asia Pacific' },
                ]}
                placeholder="Выберите регион"
              />
            </Form.Field>
            <Inset vertical>
              <Form.Submit>Создать хост</Form.Submit>
            </Inset>
          </Form>
        </Section>
        {submitted && (
          <Section header="Отправлено">
            <Inset vertical>
              <pre style={{ fontSize: 12, color: 'var(--ui-text-hint)', margin: 0 }}>
                {JSON.stringify(submitted, null, 2)}
              </pre>
            </Inset>
          </Section>
        )}
      </List>
    );
  },
};

export const WithValidation: Story = {
  name: 'With Validation',
  render: () => {
    const [submitted, setSubmitted] = useState<string | null>(null);
    return (
      <List>
        <Section header="Смена пароля">
          <Form
            initialValues={{ current: '', next: '', confirm: '' }}
            validate={(values) => ({
              current: values.current.length < 1 ? 'Введите текущий пароль' : '',
              next: values.next.length < 6 ? 'Минимум 6 символов' : '',
              confirm: values.confirm !== values.next ? 'Пароли не совпадают' : '',
            })}
            onSubmit={() => setSubmitted('Пароль успешно изменён')}
          >
            <Form.Field name="current">
              <Input header="Текущий пароль" placeholder="••••••" />
            </Form.Field>
            <Form.Field name="next">
              <Input header="Новый пароль" placeholder="Минимум 6 символов" />
            </Form.Field>
            <Form.Field name="confirm">
              <Input header="Повторите пароль" placeholder="••••••" />
            </Form.Field>
            <Inset vertical>
              <Form.Submit>Изменить пароль</Form.Submit>
            </Inset>
          </Form>
        </Section>
        {submitted && (
          <Section>
            <Inset vertical>
              <span style={{ color: '#16a34a', fontSize: 14 }}>{submitted}</span>
            </Inset>
          </Section>
        )}
      </List>
    );
  },
};
