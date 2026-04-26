import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'UI/FileUpload',
  component: FileUpload,
  argTypes: {
    label:    { control: 'text' },
    hint:     { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Выберите файл',
    hint: 'PNG, JPG, PDF до 10 МБ',
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Empty: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

const makeFile = (name: string, type: string, size: number) =>
  new File(['x'.repeat(size)], name, { type });

const Controlled = ({ file }: { file: File }) => {
  const [value, setValue] = useState<File | null>(file);
  return <FileUpload value={value} onChange={setValue} label="Выберите файл" />;
};

export const WithImage: Story = {
  render: () => <Controlled file={makeFile('screenshot.png', 'image/png', 1_420_000)} />,
};

export const WithCode: Story = {
  render: () => <Controlled file={makeFile('main.py', 'text/x-python', 3_210)} />,
};

export const WithArchive: Story = {
  render: () => <Controlled file={makeFile('backup.zip', 'application/zip', 8_500_000)} />,
};

export const WithPDF: Story = {
  render: () => <Controlled file={makeFile('document.pdf', 'application/pdf', 245_000)} />,
};

export const WithVideo: Story = {
  render: () => <Controlled file={makeFile('clip.mp4', 'video/mp4', 52_000_000)} />,
};

export const Usage: Story = {
  render: () => {
    const [key, setKey] = useState<File | null>(null);
    return (
      <>
        <FileUpload
          value={key}
          onChange={setKey}
          label="Загрузить публичный SSH-ключ"
          hint="Файл .pub — например id_rsa.pub или id_ed25519.pub"
        />
      </>
    );
  },
};

// Note: FileUpload — один файл за раз (нет multiple).
// label — короткое название поля (что загружается).
// hint — пояснение о формате/размере (показывается под дроп-зоной).
// value/onChange — controlled; управляй состоянием снаружи.
// disabled когда загрузка заблокирована (например, ожидание предыдущей операции).
// Для SSH-ключей проверяй расширение .pub после загрузки.
