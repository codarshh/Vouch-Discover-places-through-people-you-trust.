import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Users,
  ArrowRight,
} from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { PlaceCard } from '../components/places/PlaceCard';
import { ReviewCard } from '../components/places/ReviewCard';
import { CategoryFilter } from '../components/search/CategoryFilter';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import type { PlaceCategory } from '../types';
import {
  SAMPLE_PLACES,
  SAMPLE_REVIEWS,
  SAMPLE_FRIENDS,
} from '../data/sampleData';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | 'All'>('All');
  const [quickSearch, setQuickSearch] = useState('');

  // Filter places based on selected category or quick search
  const filteredPlaces = SAMPLE_PLACES.filter((place) => {
    const matchesCategory =
      selectedCategory === 'All' || place.category === selectedCategory;
    const matchesSearch =
      quickSearch.trim() === '' ||
      place.name.toLowerCase().includes(quickSearch.toLowerCase()) ||
      place.address.toLowerCase().includes(quickSearch.toLowerCase()) ||
      place.category.toLowerCase().includes(quickSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Top recommended spots (sorted by friend average score)
  const topRecommended = [...SAMPLE_PLACES].sort(
    (a, b) => b.friendStats.friendAverageRating - a.friendStats.friendAverageRating
  );

  // Visited by friends
  const visitedByFriends = [...SAMPLE_PLACES].sort(
    (a, b) => b.friendStats.friendVisitCount - a.friendStats.friendVisitCount
  );

  return (
    <MainLayout showDemoNotice={false}>
      {/* Top Welcome & Search Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Greeting row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Friend Discovery Feed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Discover places through people you trust
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Showing recommendations from your 6 connected friends in New York
              </p>
            </div>

            {/* Quick Friend Circles avatars */}
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex -space-x-2">
                {SAMPLE_FRIENDS.slice(0, 4).map((friend) => (
                  <Link key={friend.id} to={`/users/${friend.id}`} title={friend.name}>
                    <Avatar
                      src={friend.profileImageUrl}
                      name={friend.name}
                      size="sm"
                      showRing
                    />
                  </Link>
                ))}
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">Your Circle</span>
                <Link to="/friends" className="text-indigo-600 font-medium hover:underline text-[11px]">
                  View all 6 friends →
                </Link>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="max-w-2xl">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Quick search cafes, sushi, cocktails, bakeries..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-24 text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs hover:border-slate-300 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Link to={`/search${quickSearch ? `?q=${encodeURIComponent(quickSearch)}` : ''}`}>
                  <Button size="sm" variant="primary">
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Filter by Category
            </div>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* If quick searching or filtering by category, display filtered grid */}
        {(selectedCategory !== 'All' || quickSearch.trim() !== '') && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedCategory !== 'All' ? `${selectedCategory} Spots` : 'Search Results'}
                </h2>
                <p className="text-xs text-slate-500">
                  {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place found' : 'places found'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory('All');
                  setQuickSearch('');
                }}
              >
                Reset filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </section>
        )}

        {/* Section 1: Top Picks from Your Circle */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Top Picks from Your Circle
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  Highest friend ratings
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Places with high praise and repeat visits from people you trust
              </p>
            </div>

            <Link to="/search?sort=highest-friend-rating">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                See All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRecommended.slice(0, 3).map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </section>

        {/* Section 2: Visited by Most Friends */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Most Visited by Friends
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Active hot spots
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                The favorites where multiple friends have checked in
              </p>
            </div>

            <Link to="/search?sort=most-friends">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visitedByFriends.slice(0, 3).map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </section>

        {/* Section 3: Recent Friend Reviews Feed */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Recent Reviews from Friends
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                  Live insights
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Candid thoughts, dish recommendations, and honest feedback
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SAMPLE_REVIEWS.slice(0, 4).map((review) => (
              <ReviewCard key={review.id} review={review} showPlaceName />
            ))}
          </div>
        </section>

        {/* Section 4: Discovery Invite & Add Friends CTA banner */}
        <section className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-10 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>Expand Your Taste Circle</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Want recommendations for other neighborhoods?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed">
                Connect with more friends who love food and travel. The more trusted friends you add, the richer your discovery map becomes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link to="/friends">
                <Button size="md" className="bg-white text-indigo-900 hover:bg-slate-100">
                  Manage Friends
                </Button>
              </Link>
              <Link to="/friends/requests">
                <Button
                  size="md"
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Pending Requests (2)
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
