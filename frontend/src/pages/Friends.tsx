import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, UserPlus, Sparkles } from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { FriendCard } from '../components/friends/FriendCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { SAMPLE_FRIENDS, SAMPLE_FRIEND_REQUESTS } from '../data/sampleData';

export const Friends: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = SAMPLE_FRIENDS.filter((friend) => {
    const q = searchTerm.toLowerCase();
    return (
      friend.name.toLowerCase().includes(q) ||
      friend.username.toLowerCase().includes(q) ||
      (friend.bio && friend.bio.toLowerCase().includes(q)) ||
      (friend.location && friend.location.toLowerCase().includes(q))
    );
  });

  return (
    <MainLayout>
      <div className="bg-white border-b border-slate-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Your Trusted Social Graph</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Connected Friends ({SAMPLE_FRIENDS.length})
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                People whose visits and recommendations shape your discovery feed
              </p>
            </div>

            {/* Friend Requests Link */}
            <Link to="/friends/requests">
              <Button
                variant="outline"
                size="md"
                leftIcon={<UserPlus className="w-4 h-4 text-indigo-600" />}
              >
                <span>Pending Requests</span>
                <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                  {SAMPLE_FRIEND_REQUESTS.length}
                </span>
              </Button>
            </Link>
          </div>

          {/* Search Friends Bar */}
          <div className="max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search friends by name, username, bio..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 hover:bg-white focus:bg-white focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {filteredFriends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title="No friends found"
            description={`We couldn't find any connected friends matching "${searchTerm}". Try a different keyword.`}
            actionLabel="Clear Search"
            onAction={() => setSearchTerm('')}
            className="my-10"
          />
        )}

        {/* Suggestion banner */}
        <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-indigo-950">
                Grow your trusted circle
              </h4>
              <p className="text-xs text-indigo-700/80">
                You have {SAMPLE_FRIEND_REQUESTS.length} friend requests waiting for your review.
              </p>
            </div>
          </div>

          <Link to="/friends/requests">
            <Button size="sm" variant="primary">
              Review Requests
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Friends;
