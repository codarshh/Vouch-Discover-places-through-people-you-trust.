import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, Check, X, Users, MapPin } from 'lucide-react';
import { MainLayout } from '../layouts/MainLayout';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { NoticeBanner } from '../components/ui/NoticeBanner';
import { SAMPLE_FRIEND_REQUESTS } from '../data/sampleData';

interface RequestActionState {
  [requestId: string]: 'accepted' | 'declined';
}

export const FriendRequests: React.FC = () => {
  const [actions, setActions] = useState<RequestActionState>({});
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const handleAction = (requestId: string, action: 'accepted' | 'declined', name: string) => {
    setActions((prev) => ({ ...prev, [requestId]: action }));
    setToastNotice(
      `UI Demonstration: Friend request from ${name} marked as ${action}. (Backend friendship persistence will be enabled in Phase 4).`
    );
  };

  const pendingRequests = SAMPLE_FRIEND_REQUESTS.filter(
    (req) => !actions[req.id]
  );

  return (
    <MainLayout>
      <div className="bg-white border-b border-slate-200/80 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            to="/friends"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Friends List</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Friend Requests
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Manage incoming connections to share trusted recommendations
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 self-start sm:self-auto">
              {pendingRequests.length} Pending
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <NoticeBanner
          variant="demo"
          message="Notice: Friend request accept/reject actions are frontend UI demonstrations. Backend friendship state will be implemented in Phase 4."
        />

        {toastNotice && (
          <NoticeBanner
            variant="info"
            message={toastNotice}
            onDismiss={() => setToastNotice(null)}
          />
        )}

        {/* Requests List */}
        {SAMPLE_FRIEND_REQUESTS.length > 0 ? (
          <div className="space-y-4">
            {SAMPLE_FRIEND_REQUESTS.map((request) => {
              const actionState = actions[request.id];

              return (
                <div
                  key={request.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    actionState
                      ? 'border-slate-200 bg-slate-50/60 opacity-80'
                      : 'border-slate-200 bg-white shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* User info */}
                    <div className="flex items-start sm:items-center gap-3.5">
                      <Avatar
                        src={request.user.profileImageUrl}
                        name={request.user.name}
                        size="lg"
                        showRing
                      />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/users/${request.user.id}`}
                            className="font-bold text-base text-slate-900 hover:text-indigo-600 transition-colors"
                          >
                            {request.user.name}
                          </Link>
                          <span className="text-xs text-slate-400">@{request.user.username}</span>
                        </div>

                        {request.user.bio && (
                          <p className="text-xs text-slate-600 line-clamp-1">
                            {request.user.bio}
                          </p>
                        )}

                        <div className="flex items-center gap-3 text-xs text-slate-500 pt-0.5">
                          {request.user.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {request.user.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-indigo-500" />
                            {request.mutualFriendsCount} mutual friends
                          </span>
                          <span className="text-slate-400">• {request.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2.5 sm:self-center shrink-0">
                      {actionState === 'accepted' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                          <Check className="w-3.5 h-3.5" />
                          Accepted (Demo)
                        </span>
                      ) : actionState === 'declined' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                          <X className="w-3.5 h-3.5" />
                          Declined (Demo)
                        </span>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="primary"
                            leftIcon={<Check className="w-3.5 h-3.5" />}
                            onClick={() =>
                              handleAction(request.id, 'accepted', request.user.name)
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<X className="w-3.5 h-3.5" />}
                            onClick={() =>
                              handleAction(request.id, 'declined', request.user.name)
                            }
                          >
                            Decline
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<UserPlus className="w-8 h-8" />}
            title="No pending requests"
            description="You don't have any pending friend requests at the moment."
            actionLabel="Browse Friends"
            onAction={() => {}}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default FriendRequests;
