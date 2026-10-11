import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Search, Users, User, Compass, Menu, X, Sparkles, UserPlus } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { CURRENT_DEMO_USER } from '../../data/sampleData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Discover', path: '/home', icon: Compass },
    { label: 'Search Places', path: '/search', icon: Search },
    { label: 'Friends', path: '/friends', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link
              to="/home"
              className="flex items-center gap-2.5 group transition-transform active:scale-98"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                <MapPin className="w-5 h-5 fill-white/20 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  FriendPlace
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 -mt-1 hidden sm:block">
                  Trust Network
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Section: Search trigger, Demo Badge, User Profile */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/search"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-500 hover:bg-white hover:border-slate-300 transition-all shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search cafes, bars, spots...</span>
              <kbd className="ml-2 font-mono text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-400">
                /
              </kbd>
            </Link>

            {/* Friend Requests Shortcut */}
            <Link
              to="/friends/requests"
              className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
              title="Friend Requests"
            >
              <UserPlus className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </Link>

            {/* Demo User Pill */}
            <Link
              to="/profile"
              className={`flex items-center gap-2.5 p-1 pl-1.5 pr-3 rounded-full border transition-all ${
                isActive('/profile')
                  ? 'border-indigo-300 bg-indigo-50/80'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Avatar
                src={CURRENT_DEMO_USER.profileImageUrl}
                name={CURRENT_DEMO_USER.name}
                size="sm"
                showRing
              />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {CURRENT_DEMO_USER.name}
                </span>
                <span className="text-[10px] text-indigo-600 font-medium leading-none">
                  Demo Account
                </span>
              </div>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/search"
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="px-2 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center gap-2 text-xs text-indigo-700">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Phase 1 UI Foundation — Demo Mode Active</span>
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Landing Page</span>
            </Link>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <Link
              to="/friends/requests"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                <UserPlus className="w-4 h-4 text-slate-400" />
                <span>Friend Requests</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                2 new
              </span>
            </Link>

            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>My Profile (Alex Chen)</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Login Preview
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              Register Preview
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
