import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Map, MessageSquare, ArrowRight } from 'lucide-react';
import type { User } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export interface FriendCardProps {
  friend: User;
  className?: string;
}

export const FriendCard: React.FC<FriendCardProps> = ({ friend, className = '' }) => {
  return (
    <div
      className={`p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <Link to={`/users/${friend.id}`} className="flex items-center gap-3 group">
            <Avatar
              src={friend.profileImageUrl}
              name={friend.name}
              size="lg"
              showRing
            />
            <div>
              <h4 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                {friend.name}
              </h4>
              <p className="text-xs text-slate-400">@{friend.username}</p>
              {friend.location && (
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{friend.location}</span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {friend.bio && (
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {friend.bio}
          </p>
        )}

        {/* Stats badges */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-slate-500 text-xs">
              <Map className="w-3.5 h-3.5 text-indigo-500" />
              <span>Visited</span>
            </div>
            <span className="font-extrabold text-sm text-slate-900">{friend.visitedCount} spots</span>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-slate-500 text-xs">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
              <span>Reviews</span>
            </div>
            <span className="font-extrabold text-sm text-slate-900">{friend.reviewsCount} reviews</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
          Connected Friend
        </span>

        <Link to={`/users/${friend.id}`}>
          <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
            Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};
