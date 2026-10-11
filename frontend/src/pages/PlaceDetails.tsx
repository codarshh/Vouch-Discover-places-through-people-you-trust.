import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Phone,
  Globe,
  Heart,
  Users,
  Star,
  CheckCircle,
  ArrowLeft,
  MessageSquare,
  ExternalLink,
  X,
} from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { ReviewCard } from '../components/places/ReviewCard';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { NoticeBanner } from '../components/ui/NoticeBanner';
import { EmptyState } from '../components/ui/EmptyState';
import {
  SAMPLE_PLACES,
  SAMPLE_REVIEWS,
  SAMPLE_FRIENDS,
  SAMPLE_FRIEND_VISITS,
} from '../data/sampleData';

export const PlaceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const place = SAMPLE_PLACES.find((p) => p.id === id);

  // Local UI demonstration states
  const [hasVisited, setHasVisited] = useState(false);
  const [visitedNotice, setVisitedNotice] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmittedNotice, setReviewSubmittedNotice] = useState<string | null>(null);

  // Active gallery photo
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!place) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <EmptyState
            icon={<MapPin className="w-8 h-8" />}
            title="Place not found"
            description="We couldn't locate the place you requested in our sample database."
            actionLabel="Return to Search"
            onAction={() => navigate('/search')}
          />
        </div>
      </MainLayout>
    );
  }

  // Reviews for this place
  const placeReviews = SAMPLE_REVIEWS.filter((r) => r.placeId === place.id);

  // Friends who visited this place
  const friendVisits = SAMPLE_FRIEND_VISITS.filter((v) => v.placeId === place.id);

  const handleToggleVisited = () => {
    const nextState = !hasVisited;
    setHasVisited(nextState);
    if (nextState) {
      setVisitedNotice(
        `Marked as visited! (Demo state — backend visit tracking will be persisted in Phase 6).`
      );
    } else {
      setVisitedNotice(`Removed visit mark.`);
    }
    setTimeout(() => setVisitedNotice(null), 5000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReviewModal(false);
    setReviewSubmittedNotice(
      `Review received! (Demo state — backend review storage & validation is scheduled for Phase 7).`
    );
    setTimeout(() => setReviewSubmittedNotice(null), 6000);
  };

  return (
    <MainLayout>
      {/* Back button & breadcrumbs */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-slate-500">
          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Search</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-400">Category:</span>
            <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              {place.category}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Toast Notifier */}
        {visitedNotice && (
          <NoticeBanner
            variant="demo"
            message={visitedNotice}
            onDismiss={() => setVisitedNotice(null)}
          />
        )}

        {reviewSubmittedNotice && (
          <NoticeBanner
            variant="demo"
            message={reviewSubmittedNotice}
            onDismiss={() => setReviewSubmittedNotice(null)}
          />
        )}

        {/* Place Header: Title, Category, Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-200/80">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {place.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                {place.priceLevel}
              </span>
              <span className="text-xs text-slate-400">• {place.city}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {place.name}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{place.address}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Mark as Visited Button */}
            <Button
              variant={hasVisited ? 'primary' : 'outline'}
              size="md"
              leftIcon={<CheckCircle className="w-4 h-4" />}
              onClick={handleToggleVisited}
            >
              {hasVisited ? "I've Been Here (Marked)" : "Mark as Visited"}
            </Button>

            {/* Write a Review Button */}
            <Button
              variant="outline"
              size="md"
              leftIcon={<MessageSquare className="w-4 h-4" />}
              onClick={() => setShowReviewModal(true)}
            >
              Write Review
            </Button>
          </div>
        </div>

        {/* Dual Rating Banner: Visual Distinction between Friend Trust vs Public Google */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-slate-50 border-2 border-indigo-200/90 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: Friend Trust Score (Dominant) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  Friends' Trust Score
                </span>
                <span className="text-xs text-slate-400">Based on your circle</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-indigo-950">
                  {place.friendStats.friendAverageRating.toFixed(1)}
                </span>
                <div className="space-y-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    {place.friendStats.friendReviewCount} friend reviews • {place.friendStats.friendVisitCount} visits
                  </p>
                </div>
              </div>

              {/* Visited Friend Avatars */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex -space-x-2">
                  {place.friendStats.visitedFriendAvatars.map((avatar, idx) => (
                    <Avatar
                      key={idx}
                      src={avatar}
                      name={place.friendStats.friendNames[idx] || 'Friend'}
                      size="sm"
                      showRing
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-600 font-medium">
                  {place.friendStats.friendNames.join(', ')} visited this place
                </span>
              </div>
            </div>

            {/* Right: Public Aggregate (Clearly labeled sample data) */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 uppercase tracking-wider">
                  Public Aggregate Rating
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                  Google Places Data
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">{place.publicRating}</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-400">
                  ({place.publicReviewCount.toLocaleString()} public reviews)
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Public ratings show the general sentiment of thousands of strangers, while FriendPlace highlights opinions from people who share your personal taste.
              </p>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="space-y-3">
          <div className="h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-2xs">
            <img
              src={place.galleryImages[activePhotoIndex] || place.imageUrl}
              alt={place.name}
              className="w-full h-full object-cover transition-all"
            />
          </div>

          {place.galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {place.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`h-20 w-28 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activePhotoIndex === idx
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${place.name} thumbnail`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two-column layout: Details & Hours vs Reviews & Friends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Friends Reviews & Visited list */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description & Tags */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">About this place</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{place.description}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {place.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Friends' Reviews Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                    <span>Friends' Reviews ({placeReviews.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Honest feedback from people in your network
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReviewModal(true)}
                >
                  Add Your Review
                </Button>
              </div>

              {placeReviews.length > 0 ? (
                <div className="space-y-4">
                  {placeReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<MessageSquare className="w-6 h-6" />}
                  title="No friend reviews yet"
                  description="Be the first among your friends to write an honest review for this spot!"
                  actionLabel="Write Review"
                  onAction={() => setShowReviewModal(true)}
                />
              )}
            </div>
          </div>

          {/* Sidebar: Details, Location, Friends Who Visited */}
          <div className="space-y-6">
            {/* Friends who visited widget */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Friends Who Visited ({friendVisits.length})</span>
              </h3>

              {friendVisits.length > 0 ? (
                <div className="space-y-3">
                  {friendVisits.map((visit) => {
                    const friend = SAMPLE_FRIENDS.find((f) => f.id === visit.userId);
                    if (!friend) return null;
                    return (
                      <Link
                        key={visit.id}
                        to={`/users/${friend.id}`}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Avatar
                            src={friend.profileImageUrl}
                            name={friend.name}
                            size="sm"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors block">
                              {friend.name}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              @{friend.username}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] text-slate-500 font-medium">
                          {visit.visitedAt}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-500">None of your friends have logged a visit here yet.</p>
              )}
            </div>

            {/* Practical Information */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Details & Hours</h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">Hours</span>
                    <span>{place.hours}</span>
                  </div>
                </div>

                {place.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 block">Phone</span>
                      <span>{place.phone}</span>
                    </div>
                  </div>
                )}

                {place.website && (
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 block">Website</span>
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        Visit Official Site
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Map placeholder */}
              <div className="pt-2">
                <div className="h-32 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center p-3 text-slate-400">
                  <MapPin className="w-5 h-5 mb-1 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-600">Map Location</span>
                  <span className="text-[11px] text-slate-400">{place.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal Form UI */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Write a Review</h3>
                <p className="text-xs text-slate-500">For {place.name}</p>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <NoticeBanner
              variant="demo"
              message="UI Demonstration: Submitting will validate your input. Backend review persistence will be connected in Phase 7."
            />

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Your Rating (1 to 5 stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      aria-label={`Rate ${star} star`}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= reviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200 fill-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-extrabold text-slate-900 text-sm">
                    {reviewRating} of 5 stars
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="review-comment"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Your thoughts & recommendations
                </label>
                <textarea
                  id="review-comment"
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="What was great? Any dishes or drinks to recommend? How was the atmosphere or Wi-Fi?"
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Submit Review (Demo)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default PlaceDetails;
