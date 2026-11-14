import { useState } from 'react';
import { Car } from 'lucide-react';
import type { RidePlatform } from '../types/ride';

export function PlatformLogo({ platform, size = 36 }: { platform: RidePlatform; size?: number }) {
  const configs: Record<RidePlatform, { bg: string; fg: string; label: string }> = {
    zig: { bg: '#0052CC', fg: '#FFFFFF', label: 'Z' },
    gojek: { bg: '#00880D', fg: '#FFFFFF', label: 'G' },
    tada: { bg: '#0284C7', fg: '#FFFFFF', label: 'T' },
    ryde: { bg: '#D97706', fg: '#FFFFFF', label: 'R' },
  };

  const { bg, fg, label } = configs[platform];

  return (
    <div
      style={{ width: size, height: size, backgroundColor: bg, color: fg }}
      className="rounded-lg flex items-center justify-center font-bold tracking-tight shrink-0 select-none"
      aria-hidden="true"
    >
      {platform === 'zig' && (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M5 7h14L5 17h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {platform === 'gojek' && (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4">
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
        </svg>
      )}
      {platform === 'tada' && (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M6 7h12M12 7v11" strokeLinecap="round" />
        </svg>
      )}
      {platform === 'ryde' && (
        <span className="text-sm font-extrabold leading-none">{label}</span>
      )}
    </div>
  );
}

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({ src, alt, className = '', fallbackTitle }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 text-slate-200 p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Car className="w-7 h-7 text-blue-400 mb-2" aria-hidden="true" />
        {fallbackTitle && <span className="text-xs font-medium text-slate-300 max-w-[18ch]">{fallbackTitle}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
