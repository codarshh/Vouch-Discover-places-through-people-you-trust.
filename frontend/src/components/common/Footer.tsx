import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-xs text-slate-600 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 inline-flex">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30">
                <MapPin className="w-4 h-4 fill-white/20 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                FriendPlace
              </span>
            </Link>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Google tells you what strangers think. <strong className="text-slate-900 font-semibold">FriendPlace tells you what people you trust think.</strong> Discover cafes, restaurants, hotels, and memorable spots through the people who actually share your taste.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-indigo-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Authentic recommendations from friends, free of bots & sponsored noise</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Explore App
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/home" className="hover:text-indigo-600 transition-colors">
                  Discover Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-indigo-600 transition-colors">
                  Search Places
                </Link>
              </li>
              <li>
                <Link to="/friends" className="hover:text-indigo-600 transition-colors">
                  Friends Network
                </Link>
              </li>
              <li>
                <Link to="/friends/requests" className="hover:text-indigo-600 transition-colors">
                  Friend Requests
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-indigo-600 transition-colors">
                  My Profile Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Product & Scope */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Project Info
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-600 transition-colors">
                  Landing Page
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-600 transition-colors">
                  Login Preview
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-600 transition-colors">
                  Registration Preview
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs bg-indigo-50 text-indigo-700 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  Phase 1 UI Foundation
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {CURRENT_YEAR} FriendPlace (Vouch). Built with React 19, TypeScript & Tailwind CSS v4.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for authentic local discovery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
