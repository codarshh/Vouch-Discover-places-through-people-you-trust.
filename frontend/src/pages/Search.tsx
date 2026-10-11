import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Compass,
  ArrowUpDown,
  X,
  Users,
  Sparkles,
} from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { PlaceCard } from '../components/places/PlaceCard';
import { SearchBar } from '../components/search/SearchBar';
import { CategoryFilter } from '../components/search/CategoryFilter';
import { EmptyState } from '../components/ui/EmptyState';
import type { PlaceCategory, SortOption } from '../types';
import { SAMPLE_PLACES } from '../data/sampleData';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = (searchParams.get('category') as PlaceCategory | 'All') || 'All';
  const initialSort = (searchParams.get('sort') as SortOption) || 'most-friends';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<PlaceCategory | 'All'>(initialCategory);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [minFriendVisits, setMinFriendVisits] = useState<number>(0);

  // Update query params when state changes
  const updateFilters = (newQuery: string, newCat: PlaceCategory | 'All', newSort: SortOption) => {
    const params: Record<string, string> = {};
    if (newQuery) params.q = newQuery;
    if (newCat !== 'All') params.category = newCat;
    if (newSort !== 'most-friends') params.sort = newSort;
    setSearchParams(params);
  };

  const handleQueryChange = (q: string) => {
    setQuery(q);
    updateFilters(q, category, sort);
  };

  const handleCategoryChange = (c: PlaceCategory | 'All') => {
    setCategory(c);
    updateFilters(query, c, sort);
  };

  const handleSortChange = (s: SortOption) => {
    setSort(s);
    updateFilters(query, category, s);
  };

  const resetAllFilters = () => {
    setQuery('');
    setCategory('All');
    setSort('most-friends');
    setMinFriendVisits(0);
    setSearchParams({});
  };

  // Filter & sort logic against local sample data
  const filteredPlaces = useMemo(() => {
    return SAMPLE_PLACES.filter((place) => {
      // Category filter
      if (category !== 'All' && place.category !== category) {
        return false;
      }

      // Min friend visits
      if (minFriendVisits > 0 && place.friendStats.friendVisitCount < minFriendVisits) {
        return false;
      }

      // Text query match against name, address, description, tags, and city
      if (query.trim() !== '') {
        const q = query.toLowerCase();
        const matchesName = place.name.toLowerCase().includes(q);
        const matchesAddress = place.address.toLowerCase().includes(q);
        const matchesCity = place.city.toLowerCase().includes(q);
        const matchesCategory = place.category.toLowerCase().includes(q);
        const matchesTag = place.tags.some((tag) => tag.toLowerCase().includes(q));
        const matchesFriend = place.friendStats.friendNames.some((n) =>
          n.toLowerCase().includes(q)
        );

        if (!matchesName && !matchesAddress && !matchesCity && !matchesCategory && !matchesTag && !matchesFriend) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sort) {
        case 'most-friends':
          return b.friendStats.friendVisitCount - a.friendStats.friendVisitCount;
        case 'highest-friend-rating':
          return b.friendStats.friendAverageRating - a.friendStats.friendAverageRating;
        case 'highest-public-rating':
          return b.publicRating - a.publicRating;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [query, category, sort, minFriendVisits]);

  return (
    <MainLayout>
      <div className="bg-white border-b border-slate-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Local Discovery Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Search & Filter Places
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Find places recommended and visited by friends you actually trust
              </p>
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-700">Sample Dataset:</span> 8 curated spots in New York
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl">
            <SearchBar
              value={query}
              onChange={handleQueryChange}
              onClear={() => handleQueryChange('')}
              placeholder="Search by name, category, dish, tag, or friend who visited..."
            />
          </div>

          {/* Category Pills */}
          <CategoryFilter
            selectedCategory={category}
            onSelectCategory={handleCategoryChange}
          />
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Controls row: Result count + Sorting + Filter chips */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="font-bold text-slate-900">{filteredPlaces.length}</span>
            <span>{filteredPlaces.length === 1 ? 'place found' : 'places found'}</span>
            {(query || category !== 'All' || minFriendVisits > 0) && (
              <button
                onClick={resetAllFilters}
                className="ml-3 text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear filters</span>
              </button>
            )}
          </div>

          {/* Sorting Dropdown & Filter controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort by:</span>
              </label>
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="most-friends">Most Visited by Friends</option>
                <option value="highest-friend-rating">Highest Friends' Rating</option>
                <option value="highest-public-rating">Highest Public Rating</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* Quick Filter: Visited by 3+ friends */}
            <button
              onClick={() => setMinFriendVisits(minFriendVisits === 3 ? 0 : 3)}
              className={`text-xs px-3 py-2 rounded-xl border font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                minFriendVisits === 3
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>3+ Friends</span>
            </button>
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Compass className="w-8 h-8" />}
            title="No places match your search"
            description={
              query
                ? `We couldn't find any spots matching "${query}" in the "${category}" category. Try adjusting your search keywords or resetting filters.`
                : 'No spots match the current category or visit threshold filters.'
            }
            actionLabel="Reset All Filters"
            onAction={resetAllFilters}
            className="my-12"
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
