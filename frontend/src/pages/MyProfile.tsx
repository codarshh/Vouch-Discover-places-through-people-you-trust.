import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Edit3,
  Map,
  MessageSquare,
  Save,
  X,
} from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { Avatar } from '../components/ui/Avatar';
import { PlaceCard } from '../components/places/PlaceCard';
import { ReviewCard } from '../components/places/ReviewCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { NoticeBanner } from '../components/ui/NoticeBanner';
import {
  CURRENT_DEMO_USER,
  SAMPLE_PLACES,
  SAMPLE_REVIEWS,
} from '../data/sampleData';

export const MyProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState(CURRENT_DEMO_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [bio, setBio] = useState(userProfile.bio || '');
  const [location, setLocation] = useState(userProfile.location || '');
  const [activeTab, setActiveTab] = useState<'visited' | 'reviews'>('visited');
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Filter sample visited places and reviews for Alex Chen
  const myVisitedPlaces = SAMPLE_PLACES.slice(0, 4);
  const myReviews = SAMPLE_REVIEWS.slice(0, 2);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      name,
      bio,
      location,
    }));
    setIsEditing(false);
    setToastNotice(
      'Profile updated in local session state! (Real user profile persistence will be handled in Phase 3/4).'
    );
    setTimeout(() => setToastNotice(null), 5000);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Phase 1 Demo Banner */}
        <NoticeBanner
          variant="demo"
          title="Demo Profile Session"
          message="Authentication is postponed in Phase 1. You are viewing the demo account for Alex Chen. Profile edits below update local session state."
        />

        {toastNotice && (
          <NoticeBanner
            variant="info"
            message={toastNotice}
            onDismiss={() => setToastNotice(null)}
          />
        )}

        {/* Profile Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <Avatar
                src={userProfile.profileImageUrl}
                name={userProfile.name}
                size="xl"
                showRing
                className="w-20 h-20 sm:w-24 sm:h-24 text-2xl"
              />

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {userProfile.name}
                  </h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Demo Account
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-400">@{userProfile.username}</p>

                {userProfile.bio && (
                  <p className="text-sm text-slate-700 max-w-xl leading-relaxed pt-1">
                    {userProfile.bio}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-2">
                  {userProfile.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {userProfile.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {userProfile.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="self-center sm:self-start shrink-0 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Edit3 className="w-4 h-4" />}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 block">Spots Visited</span>
              <span className="text-xl font-extrabold text-slate-900">{myVisitedPlaces.length}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 block">Reviews Written</span>
              <span className="text-xl font-extrabold text-slate-900">{myReviews.length}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 block">Connected Friends</span>
              <span className="text-xl font-extrabold text-slate-900">{userProfile.friendsCount}</span>
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
            <span>My Visited Places ({myVisitedPlaces.length})</span>
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
            <span>My Reviews ({myReviews.length})</span>
          </button>
        </div>

        {/* Tab 1: Visited places */}
        {activeTab === 'visited' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myVisitedPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myReviews.map((review) => (
                <ReviewCard key={review.id} review={review} showPlaceName />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Edit Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                aria-label="Close edit profile modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <Input
                label="Full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Brooklyn, NY"
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell your friends what places and food you love..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" leftIcon={<Save className="w-4 h-4" />}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default MyProfile;
