import React from 'react';
import type { PlaceCategory } from '../../types';
import { CATEGORIES } from '../../data/sampleData';
import { Coffee, Utensils, Croissant, Wine, Sun, BookOpen, Cake, Hotel, Sparkles } from 'lucide-react';

export interface CategoryFilterProps {
  selectedCategory: PlaceCategory | 'All';
  onSelectCategory: (category: PlaceCategory | 'All') => void;
  className?: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  All: <Sparkles className="w-3.5 h-3.5" />,
  Cafe: <Coffee className="w-3.5 h-3.5" />,
  Restaurant: <Utensils className="w-3.5 h-3.5" />,
  Bakery: <Croissant className="w-3.5 h-3.5" />,
  'Bar & Pub': <Wine className="w-3.5 h-3.5" />,
  Rooftop: <Sun className="w-3.5 h-3.5" />,
  Bookstore: <BookOpen className="w-3.5 h-3.5" />,
  Dessert: <Cake className="w-3.5 h-3.5" />,
  Hotel: <Hotel className="w-3.5 h-3.5" />,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  className = '',
}) => {
  const allCategories: { label: PlaceCategory | 'All'; count?: number }[] = [
    { label: 'All', count: CATEGORIES.reduce((acc, curr) => acc + curr.count, 0) },
    ...CATEGORIES,
  ];

  return (
    <div className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none ${className}`}>
      {allCategories.map((cat) => {
        const isSelected = selectedCategory === cat.label;
        const icon = categoryIcons[cat.label] || <Sparkles className="w-3.5 h-3.5" />;

        return (
          <button
            key={cat.label}
            onClick={() => onSelectCategory(cat.label)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer select-none ${
              isSelected
                ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <span className={isSelected ? 'text-white' : 'text-slate-400'}>{icon}</span>
            <span>{cat.label}</span>
            {cat.count !== undefined && (
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected ? 'bg-indigo-500/80 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
