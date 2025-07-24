import React, { ComponentProps, ReactNode } from 'react';

interface ImageComponentProps extends ComponentProps<'img'> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  loading?: 'eager' | 'lazy'; // For lazy loading
  fallback?: ReactNode; // Fallback content if image fails
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void; // On load callback
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void; // On error callback
}

export function ImageComponent({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fallback = null,
  onLoad,
  onError,
  ...props
}: ImageComponentProps) {
  return (
    <img 
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className} `}
      loading={loading}
      onLoad={(e) => {
        if (onLoad) onLoad(e);
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
        if (fallback) {
          (e.target as HTMLImageElement).parentElement!.innerHTML = fallback as string;
        }
        if (onError) onError(e);
      }}
      {...props}
    />
  );
}