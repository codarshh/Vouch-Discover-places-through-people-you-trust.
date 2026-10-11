import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, CheckCircle, MessageSquare } from 'lucide-react';
import type { Review } from '../../types';
import { Avatar } from '../ui/Avatar';
import { RatingDisplay } from '../ui/RatingDisplay';

export interface ReviewCardProps {
  review: Review;
  showPlaceName?: boolean;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  showPlaceName = false,
  className = '',
}) => {
  const [likes, setLikes] = useState(review.likesCount || 0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleToggleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:border-slate-300 transition-all ${className}`}
    >
      {/* Reviewer Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <Link to={`/users/${review.user.id}`}>
            <Avatar
              src={review.user.profileImageUrl}
              name={review.user.name}
              size="md"
              showRing
            />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <Link
                to={`/users/${review.user.id}`}
                className="font-bold text-sm sm:text-base text-slate-900 hover:text-indigo-600 transition-colors"
              >
                {review.user.name}
              </Link>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
                <CheckCircle className="w-2.5 h-2.5" />
                <span>Verified Visit</span>
              </span>
            </div>

            <p className="text-xs text-slate-400">@{review.user.username} • {review.createdAt}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-xl">
          <RatingDisplay rating={review.rating} variant="stars-only" size="sm" />
        </div>
      </div>

      {/* Place name tag if shown on feed */}
      {showPlaceName && review.placeName && (
        <div className="mb-2.5">
          <Link
            to={`/places/${review.placeId}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Reviewed at {review.placeName}</span>
          </Link>
        </div>
      )}

      {/* Comment */}
      <p className="text-sm text-slate-700 leading-relaxed mb-4">
        "{review.comment}"
      </p>

      {/* Footer / Interaction demonstration */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={handleToggleLike}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
            hasLiked
              ? 'bg-indigo-50 text-indigo-700'
              : 'hover:bg-slate-100 text-slate-500'
          }`}
          title="Mark review as helpful"
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-indigo-600' : ''}`} />
          <span>{likes} {likes === 1 ? 'helpful vote' : 'helpful votes'}</span>
        </button>

        <span className="text-[11px] text-slate-400">
          Trusted review from your circle
        </span>
      </div>
    </div>
  );
};
