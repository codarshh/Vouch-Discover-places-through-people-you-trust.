export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImageUrl?: string;
  bio?: string;
  location?: string;
  joinedDate: string;
  visitedCount: number;
  reviewsCount: number;
  friendsCount: number;
}

export interface PlaceFriendStats {
  friendVisitCount: number;
  friendAverageRating: number;
  friendReviewCount: number;
  visitedFriendAvatars: string[];
  friendNames: string[];
}

export interface Place {
  id: string;
  externalPlaceId: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  category: PlaceCategory;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  imageUrl: string;
  galleryImages: string[];
  description: string;
  hours: string;
  phone?: string;
  website?: string;
  publicRating: number;
  publicReviewCount: number;
  friendStats: PlaceFriendStats;
  tags: string[];
}

export type PlaceCategory =
  | 'Cafe'
  | 'Restaurant'
  | 'Bakery'
  | 'Bar & Pub'
  | 'Rooftop'
  | 'Hotel'
  | 'Bookstore'
  | 'Dessert';

export interface FriendVisit {
  id: string;
  userId: string;
  placeId: string;
  visitedAt: string;
  user?: User;
  note?: string;
}

export interface Review {
  id: string;
  userId: string;
  placeId: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  updatedAt?: string;
  user: User;
  placeName?: string;
  likesCount?: number;
}

export interface FriendshipRequest {
  id: string;
  requesterId: string;
  receiverId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  user: User; // The requester or receiver profile
  mutualFriendsCount: number;
}

export type SortOption =
  | 'most-friends'
  | 'highest-friend-rating'
  | 'highest-public-rating'
  | 'alphabetical';
