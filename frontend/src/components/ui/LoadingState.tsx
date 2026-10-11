import React from 'react';

export interface LoadingStateProps {
  count?: number;
  type?: 'cards' | 'reviews' | 'list';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  count = 3,
  type = 'cards',
  className = '',
}) => {
  if (type === 'cards') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse ${className}`}>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <div className="h-48 bg-slate-200 w-full" />
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-5 bg-slate-200 rounded w-1/2" />
                <div className="h-4 bg-slate-200 rounded w-12" />
              </div>
              <div className="h-3.5 bg-slate-100 rounded w-3/4" />
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div className="h-6 bg-slate-100 rounded-lg w-28" />
                <div className="h-6 bg-slate-100 rounded-lg w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'reviews') {
    return (
      <div className={`space-y-4 animate-pulse ${className}`}>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 bg-slate-200 rounded w-32" />
                <div className="h-3 bg-slate-100 rounded w-20" />
              </div>
              <div className="h-4 bg-slate-200 rounded w-16" />
            </div>
            <div className="h-3.5 bg-slate-100 rounded w-full" />
            <div className="h-3.5 bg-slate-100 rounded w-4/5" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-3 animate-pulse ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="h-3 bg-slate-100 rounded w-1/2" />
          </div>
          <div className="h-8 bg-slate-100 rounded-xl w-24" />
        </div>
      ))}
    </div>
  );
};
