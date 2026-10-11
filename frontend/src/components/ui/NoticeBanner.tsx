import React from 'react';
import { Info, AlertCircle, Sparkles, X } from 'lucide-react';

export interface NoticeBannerProps {
  variant?: 'info' | 'warning' | 'demo';
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({
  variant = 'demo',
  title,
  message,
  onDismiss,
  className = '',
}) => {
  const styles = {
    demo: {
      bg: 'bg-indigo-50/90 border-indigo-200/80 text-indigo-950',
      icon: <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />,
      titleColor: 'text-indigo-900',
    },
    info: {
      bg: 'bg-sky-50 border-sky-200 text-sky-950',
      icon: <Info className="w-4 h-4 text-sky-600 shrink-0" />,
      titleColor: 'text-sky-900',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-950',
      icon: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />,
      titleColor: 'text-amber-900',
    },
  };

  const current = styles[variant];

  return (
    <div
      className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm backdrop-blur-xs ${current.bg} ${className}`}
    >
      <div className="mt-0.5">{current.icon}</div>
      <div className="flex-1">
        {title && <h4 className={`font-semibold mb-0.5 ${current.titleColor}`}>{title}</h4>}
        <p className="leading-relaxed opacity-90">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1 -mt-1 cursor-pointer"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
