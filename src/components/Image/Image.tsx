import type { FC } from 'react';
import { cn } from '../cn';

interface ImageProps {
  src?: string;
  alt?: string;
  /** Width and height in pixels. */
  size?: number;
  className?: string;
}

/** Inline image with optional fixed square dimensions. */
export const Image: FC<ImageProps> = ({ src, alt = '', size, className }) => (
  <img src={src} alt={alt} width={size} height={size} className={cn('ui-image', className)} />
);
