import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface Database {
  users: UserTable;
  friendships: FriendshipTable;
  places: PlaceTable;
  visits: VisitTable;
  reviews: ReviewTable;
}

export interface UserTable {
  id: Generated<string>;
  name: string;
  username: string;
  email: string;
  password_hash: string;
  profile_image_url: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface FriendshipTable {
  id: Generated<string>;
  requester_id: string;
  receiver_id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export type Friendship = Selectable<FriendshipTable>;
export type NewFriendship = Insertable<FriendshipTable>;
export type FriendshipUpdate = Updateable<FriendshipTable>;

export interface PlaceTable {
  id: Generated<string>;
  external_place_id: string;
  name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  category: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export type Place = Selectable<PlaceTable>;
export type NewPlace = Insertable<PlaceTable>;
export type PlaceUpdate = Updateable<PlaceTable>;

export interface VisitTable {
  id: Generated<string>;
  user_id: string;
  place_id: string;
  visited_at: Date;
  created_at: Generated<Date>;
}

export type Visit = Selectable<VisitTable>;
export type NewVisit = Insertable<VisitTable>;
export type VisitUpdate = Updateable<VisitTable>;

export interface ReviewTable {
  id: Generated<string>;
  user_id: string;
  place_id: string;
  rating: number;
  comment: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export type Review = Selectable<ReviewTable>;
export type NewReview = Insertable<ReviewTable>;
export type ReviewUpdate = Updateable<ReviewTable>;
