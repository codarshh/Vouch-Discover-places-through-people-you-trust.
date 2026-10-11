import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  Compass,
  Sparkles,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PlaceCard } from '../components/places/PlaceCard';
import { Avatar } from '../components/ui/Avatar';
import { Footer } from '../components/common/Footer';
import { Navbar } from '../components/common/Navbar';
import { SAMPLE_PLACES, SAMPLE_FRIENDS } from '../data/sampleData';

export const Landing: React.FC = () => {
  const featuredPlaces = SAMPLE_PLACES.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs sm:text-sm font-semibold shadow-2xs">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>A trusted social discovery layer for places</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Google tells you what strangers think.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                FriendPlace tells you what people you trust think.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Stop sifting through bot reviews and random aggregate scores. Discover cafes, restaurants, hotels, and memorable spots through the visits and honest ratings of your real friends.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link to="/home" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto shadow-md shadow-indigo-600/20"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Places
                </Button>
              </Link>
              <Link to="/search" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  leftIcon={<Compass className="w-4 h-4" />}
                >
                  Search Your Circle
                </Button>
              </Link>
            </div>

            {/* Social Trust avatar line */}
            <div className="pt-4 flex items-center justify-center gap-3 text-xs text-slate-500">
              <div className="flex -space-x-2">
                {SAMPLE_FRIENDS.slice(0, 4).map((f) => (
                  <Avatar key={f.id} src={f.profileImageUrl} name={f.name} size="xs" showRing />
                ))}
              </div>
              <span>
                Joined by over <strong className="text-slate-800 font-semibold">1,200+ food & coffee lovers</strong> sharing verified spots
              </span>
            </div>
          </div>

          {/* Interactive Visual Comparison: Strangers vs Friends */}
          <div className="mt-14 lg:mt-20 max-w-4xl mx-auto">
            <div className="p-1 rounded-3xl bg-gradient-to-b from-indigo-200/60 via-slate-200/50 to-slate-200/20 shadow-lg">
              <div className="bg-white rounded-[22px] p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    The Difference
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    Anonymous Aggregate vs. Trusted Social Context
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {/* Traditional Google View */}
                  <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/80 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-3">
                        <span className="uppercase tracking-wider">Generic Review Directory</span>
                        <span>Strangers</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-800">Blue Sparrow Roasters</h4>
                      <p className="text-xs text-slate-500">Williamsburg, NY • Cafe</p>

                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="font-bold text-slate-900 text-sm">4.4</span>
                        <span className="text-xs text-slate-400">(1,420 strangers)</span>
                      </div>

                      <div className="mt-4 space-y-2 text-xs text-slate-500 italic">
                        <p className="p-2.5 rounded-lg bg-white border border-slate-200/70">
                          "Coffee was okay. Parking was hard to find." — User94819
                        </p>
                        <p className="p-2.5 rounded-lg bg-white border border-slate-200/70">
                          "Five stars! Best ever!" — anonymous_reviewer
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      No personal taste overlap or trusted context
                    </div>
                  </div>

                  {/* FriendPlace View */}
                  <div className="p-6 rounded-2xl border-2 border-indigo-500/80 bg-gradient-to-b from-indigo-50/60 to-white flex flex-col justify-between space-y-4 shadow-sm">
                    <div>
                      <div className="flex items-center justify-between text-xs text-indigo-700 font-semibold mb-3">
                        <span className="uppercase tracking-wider">FriendPlace Experience</span>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                          People You Trust
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-slate-900">Blue Sparrow Roasters</h4>
                      <p className="text-xs text-slate-500">Williamsburg, NY • Cafe</p>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          <span className="font-extrabold text-indigo-950 text-base">4.8</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100/90 px-2 py-1 rounded-lg">
                          <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                          <span>5 friends visited</span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs flex items-start gap-2.5">
                          <Avatar src={SAMPLE_FRIENDS[0].profileImageUrl} name="Priya Patel" size="xs" />
                          <div className="text-xs">
                            <span className="font-bold text-slate-900">Priya:</span>{' '}
                            <span className="text-slate-700">"Washed Ethiopian pour-over is magic. Sit by the skylight!"</span>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs flex items-start gap-2.5">
                          <Avatar src={SAMPLE_FRIENDS[1].profileImageUrl} name="Rahul Verma" size="xs" />
                          <div className="text-xs">
                            <span className="font-bold text-slate-900">Rahul:</span>{' '}
                            <span className="text-slate-700">"Incredible acoustic design. Super fast Wi-Fi for laptop work."</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-indigo-100 text-[11px] text-indigo-700 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                      Curated recommendations tailored to people whose taste you respect
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How FriendPlace Works */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Simple & Genuine
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
              How FriendPlace Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Three straightforward steps to finding the spots your friends already love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-4 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-lg shadow-2xs">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Connect with Real Friends</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add the people whose recommendations you actually ask for on WhatsApp, Telegram, or dinner conversations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-4 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-lg shadow-2xs">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Explore Their Vouched Spots</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Search cafes, restaurants, or bars and immediately see how many friends have been there, their ratings, and their candid notes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-4 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-lg shadow-2xs">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Log Visits & Honest Reviews</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mark places you've visited, leave 1-5 star ratings with helpful comments, and help your friends find their next favorite spot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Places Showcase */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Sample Recommendations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Popular with Your Circle
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Hand-picked spots with strong friend trust scores.
              </p>
            </div>

            <Link to="/search">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View All Spots
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Product Vision Banner */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-indigo-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Anti-Hype • Authentic Social Recommendations</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to find places vetted by people whose taste you actually trust?
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Experience the Phase 1 interactive UI prototype. Browse realistic friend recommendations, test search & category filters, and inspect place details.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/home">
              <Button size="lg" className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600">
                Launch Discover App
              </Button>
            </Link>
            <Link to="/friends">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-slate-700 bg-slate-800 hover:bg-slate-700">
                View Friends Circle
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
