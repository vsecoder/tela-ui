import { useRef, useState } from 'react';
import type { DragEvent, FC } from 'react';
import {
  File, FileCode, FileText, FileZipper,
  FileLetterP, FileLetterW, FileLetterX,
  Picture, Video, MusicNote,
  CircleXmark, ArrowUpFromSquare,
} from '@gravity-ui/icons';
import { cn } from '../cn';

export interface FileUploadProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
  label?: string;
  hint?: string;
}

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** i;
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[i]}`;
};

const getFileIcon = (file: File) => {
  const { type, name } = file;
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  const p = { width: 24, height: 24 };

  if (type.startsWith('image/'))                                    return <Picture {...p} />;
  if (type.startsWith('video/'))                                    return <Video {...p} />;
  if (type.startsWith('audio/'))                                    return <MusicNote {...p} />;
  if (type === 'application/pdf')                                   return <FileLetterP {...p} />;
  if (['doc', 'docx'].includes(ext))                               return <FileLetterW {...p} />;
  if (['xls', 'xlsx', 'csv'].includes(ext))                        return <FileLetterX {...p} />;
  if (type === 'application/zip'
    || type === 'application/x-zip-compressed'
    || type === 'application/x-rar-compressed'
    || ['zip', 'rar', 'tar', 'gz', '7z'].includes(ext))            return <FileZipper {...p} />;
  if (type.startsWith('text/')
    || ['json', 'yaml', 'yml', 'toml', 'ini', 'md'].includes(ext)) return <FileText {...p} />;
  if (['js', 'ts', 'tsx', 'jsx', 'py', 'sh', 'rs',
       'go', 'java', 'cpp', 'c', 'cs', 'php'].includes(ext))      return <FileCode {...p} />;
  return <File {...p} />;
};

export const FileUpload: FC<FileUploadProps> = ({
  value,
  onChange,
  accept,
  disabled,
  label = 'Выберите файл',
  hint,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    onChange?.(files[0]);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!disabled) setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (!disabled) handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="ui-file-upload">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="ui-file-upload__input"
        onChange={(e) => handleFiles(e.target.files)}
        tabIndex={-1}
      />

      {value ? (
        <div className="ui-file-upload__preview">
          <span className="ui-file-upload__preview-icon">
            {getFileIcon(value)}
          </span>
          <div className="ui-file-upload__preview-info">
            <span className="ui-file-upload__preview-name">{value.name}</span>
            <span className="ui-file-upload__preview-size">{formatSize(value.size)}</span>
          </div>
          {!disabled && (
            <button
              type="button"
              className="ui-file-upload__remove"
              onClick={() => {
                onChange?.(null);
                if (inputRef.current) inputRef.current.value = '';
              }}
              aria-label="Удалить файл"
            >
              <CircleXmark width={18} height={18} />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          className={cn('ui-file-upload__zone', dragging && 'ui-file-upload__zone--drag')}
          onClick={() => inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <ArrowUpFromSquare width={24} height={24} className="ui-file-upload__zone-icon" />
          <span className="ui-file-upload__zone-label">{label}</span>
          {hint && <span className="ui-file-upload__zone-hint">{hint}</span>}
        </button>
      )}
    </div>
  );
};
