import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Users,
  Map,
  MessageSquare,
  ArrowLeft,
  UserCheck,
  UserPlus,
  Star,
} from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { Avatar } from '../components/ui/Avatar';
import { PlaceCard } from '../components/places/PlaceCard';
import { ReviewCard } from '../components/places/ReviewCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { NoticeBanner } from '../components/ui/NoticeBanner';
import {
  SAMPLE_FRIENDS,
  SAMPLE_PLACES,
  SAMPLE_REVIEWS,
  SAMPLE_FRIEND_VISITS,
  CURRENT_DEMO_USER,
} from '../data/sampleData';

export const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find user (or fallback to demo user if id is user-current)
  const user =
    id === 'user-current'
      ? CURRENT_DEMO_USER
      : SAMPLE_FRIENDS.find((f) => f.id === id);

  const [activeTab, setActiveTab] = useState<'visited' | 'reviews'>('visited');
  const [friendshipState, setFriendshipState] = useState<'friends' | 'pending' | 'none'>(
    id === 'user-current' ? 'none' : 'friends'
  );
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  if (!user) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title="User Profile Not Found"
            description="The requested user profile does not exist in our sample dataset."
            actionLabel="Return to Friends"
            onAction={() => navigate('/friends')}
          />
        </div>
      </MainLayout>
    );
  }

  // Find visited places by this user
  const userVisits = SAMPLE_FRIEND_VISITS.filter((v) => v.userId === user.id);
  const visitedPlaceIds = new Set(userVisits.map((v) => v.placeId));
  const visitedPlaces = SAMPLE_PLACES.filter((p) => visitedPlaceIds.has(p.id));

  // Find reviews written by this user
  const userReviews = SAMPLE_REVIEWS.filter((r) => r.userId === user.id);

  // Compute average score given by this user
  const avgGivenRating =
    userReviews.length > 0
      ? (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1)
      : '5.0';

  const handleFriendshipAction = () => {
    if (friendshipState === 'friends') {
      setToastNotice(
        `UI Demonstration: Unfriending is disabled in Phase 1. Real friend management is scheduled for Phase 4.`
      );
    } else {
      setFriendshipState('pending');
      setToastNotice(
        `UI Demonstration: Friend request sent to ${user.name}. (Backend friendship persistence will be added in Phase 4).`
      );
    }
  };

  return (
    <MainLayout>
      {/* Back button */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <Link
            to="/friends"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Friends</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {toastNotice && (
          <NoticeBanner
            variant="info"
            message={toastNotice}
            onDismiss={() => setToastNotice(null)}
          />
        )}

        {/* Profile Card Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <Avatar
                src={user.profileImageUrl}
                name={user.name}
                size="xl"
                showRing
                className="w-20 h-20 sm:w-24 sm:h-24 text-2xl"
              />

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {user.name}
                  </h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Trusted Taste Maker
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-400">@{user.username}</p>

                {user.bio && (
                  <p className="text-sm text-slate-700 max-w-xl leading-relaxed pt-1">
                    {user.bio}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-2">
                  {user.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {user.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {user.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Friend action button */}
            {id !== 'user-current' && (
              <div className="self-center sm:self-start shrink-0">
                <Button
                  variant={friendshipState === 'friends' ? 'outline' : 'primary'}
                  size="md"
                  leftIcon={
                    friendshipState === 'friends' ? (
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )
                  }
                  onClick={handleFriendshipAction}
                >
                  {friendshipState === 'friends'
                    ? 'Connected Friend'
                    : friendshipState === 'pending'
                    ? 'Request Sent (Demo)'
                    : 'Add Friend'}
                </Button>
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 block">Places Visited</span>
              <span className="text-xl font-extrabold text-slate-900">{user.visitedCount}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 block">Reviews Written</span>
              <span className="text-xl font-extrabold text-slate-900">{user.reviewsCount}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 block">Avg Given Rating</span>
              <span className="text-xl font-extrabold text-amber-500 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                {avgGivenRating}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 block">Friend Network</span>
              <span className="text-xl font-extrabold text-slate-900">{user.friendsCount}</span>
            </div>
          </div>
        </div>

        {/* Tab Controls: Visited Places vs Written Reviews */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('visited')}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'visited'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Visited Places ({visitedPlaces.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Reviews ({userReviews.length})</span>
          </button>
        </div>

        {/* Tab 1: Visited Places */}
        {activeTab === 'visited' && (
          <div>
            {visitedPlaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visitedPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Map className="w-8 h-8" />}
                title="No visited spots on record"
                description={`${user.name} hasn't logged any visits in the sample dataset yet.`}
              />
            )}
          </div>
        )}

        {/* Tab 2: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {userReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} showPlaceName />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<MessageSquare className="w-8 h-8" />}
                title="No reviews written"
                description={`${user.name} hasn't written any reviews in this sample set yet.`}
              />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default UserProfile;
