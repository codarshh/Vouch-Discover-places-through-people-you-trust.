import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Heart, ArrowUpRight } from 'lucide-react';
import type { Place } from '../../types';
import { RatingDisplay } from '../ui/RatingDisplay';
import { Avatar } from '../ui/Avatar';

export interface PlaceCardProps {
  place: Place;
  className?: string;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`group flex flex-col rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 ${className}`}
    >
      {/* Image container */}
      <Link to={`/places/${place.id}`} className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 block">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse" />
        )}
        <img
          src={place.imageUrl}
          alt={place.name}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Category & Price Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 backdrop-blur-md text-slate-800 shadow-2xs">
            {place.category}
          </span>
          <span className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white shadow-2xs">
            {place.priceLevel}
          </span>
        </div>

        {/* View Details Hover Badge */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-sm">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* Social Overlay banner on bottom of photo */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 pt-6 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5 overflow-hidden">
              {place.friendStats.visitedFriendAvatars.slice(0, 3).map((avatar, idx) => (
                <Avatar
                  key={idx}
                  src={avatar}
                  name={place.friendStats.friendNames[idx] || 'Friend'}
                  size="xs"
                  showRing
                />
              ))}
            </div>
            <span className="font-semibold text-white/95">
              {place.friendStats.friendVisitCount} friends visited
            </span>
          </div>

          <div className="flex items-center gap-1 font-bold bg-emerald-500/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] text-white">
            <Heart className="w-3 h-3 fill-white" />
            <span>{place.friendStats.friendAverageRating.toFixed(1)} friend score</span>
          </div>
        </div>
      </Link>

      {/* Place Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link
              to={`/places/${place.id}`}
              className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1"
            >
              {place.name}
            </Link>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500 mb-2.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="line-clamp-1">{place.address}</span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {place.description}
          </p>
        </div>

        {/* Friend Review Quote Highlight */}
        {place.friendStats.friendNames.length > 0 && (
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs">
            <Users className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-slate-600 line-clamp-1">
              <span className="font-semibold text-slate-900">{place.friendStats.friendNames[0]}</span>
              {' '}vouched for this spot
            </p>
          </div>
        )}

        {/* Footer info: Public vs Friend Rating */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <RatingDisplay
            rating={place.publicRating}
            reviewCount={place.publicReviewCount}
            size="sm"
          />

          <Link
            to={`/places/${place.id}`}
            className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-0.5 transition-colors"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
