import React from 'react';
import { Star, Heart, Users } from 'lucide-react';

export interface RatingDisplayProps {
  rating: number; // e.g. 4.8
  reviewCount?: number;
  friendCount?: number;
  variant?: 'friend' | 'public' | 'stars-only';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showNumeric?: boolean;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviewCount,
  friendCount,
  variant = 'public',
  size = 'md',
  className = '',
  showNumeric = true,
}) => {
  const rounded = Math.round(rating * 10) / 10;

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-semibold',
  };

  const renderStars = () => {
    const fullStars = Math.floor(rounded);
    const hasHalf = rounded - fullStars >= 0.4;

    return (
      <div className="flex items-center gap-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className={`${starSizes[size]} fill-amber-400 text-amber-400`} />;
          }
          if (i === fullStars && hasHalf) {
            return (
              <div key={i} className="relative">
                <Star className={`${starSizes[size]} text-slate-200 fill-slate-200`} />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className={`${starSizes[size]} fill-amber-400 text-amber-400`} />
                </div>
              </div>
            );
          }
          return <Star key={i} className={`${starSizes[size]} text-slate-200 fill-slate-200`} />;
        })}
      </div>
    );
  };

  if (variant === 'stars-only') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        {renderStars()}
        {showNumeric && <span className={`font-semibold text-slate-800 ${textSizes[size]}`}>{rounded.toFixed(1)}</span>}
      </div>
    );
  }

  if (variant === 'friend') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-900 ${className}`}
      >
        <div className="flex items-center gap-1 text-emerald-700 font-semibold text-xs tracking-tight">
          <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
          <span>Friends' Rating</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-sm text-emerald-950">{rounded.toFixed(1)}</span>
        </div>
        {friendCount !== undefined && (
          <span className="text-xs text-emerald-700 font-medium border-l border-emerald-300 pl-2 flex items-center gap-1">
            <Users className="w-3 h-3 text-emerald-600" />
            {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
          </span>
        )}
      </div>
    );
  }

  // Public / Google rating
  return (
    <div className={`inline-flex items-center gap-1.5 text-slate-600 ${textSizes[size]} ${className}`}>
      <span className="font-medium text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
        Google
      </span>
      <div className="flex items-center gap-1">
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span className="font-semibold text-slate-900">{rounded.toFixed(1)}</span>
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-slate-400">({reviewCount.toLocaleString()} reviews)</span>
      )}
    </div>
  );
};
