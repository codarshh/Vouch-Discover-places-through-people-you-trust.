# FriendPlace — Version 1 Project Specification

> **Core idea:** Google tells you what strangers think. FriendPlace tells you what people you trust think.
>
> **V1 goal:** Build a working social place-discovery web app where users can search real places, connect with friends, mark places they have visited, leave reviews, and see reviews/ratings from their friends.

---

## 1. Product Vision

FriendPlace is a social recommendation platform for restaurants, cafes, hotels, and other places.

Traditional place discovery focuses heavily on aggregate public ratings:

- 4.7 ⭐ from 2,000+ reviews
- 4.5 ⭐ from 800 reviews

The problem is that aggregate ratings do not necessarily represent **your taste**.

FriendPlace adds a trusted social layer:

```text
Google / Places data
        +
Your friends' visits
        +
Your friends' ratings
        +
Your friends' reviews
        ↓
Personalized place discovery
```

### Example

Instead of showing only:

```text
Sushi House
Google Rating: 4.7 ⭐
2,843 reviews
```

FriendPlace should show:

```text
Sushi House

Google: 4.7 ⭐
2,843 reviews

👥 5 friends visited
❤️ Friends' rating: 4.4 ⭐

Rahul ⭐⭐⭐⭐⭐
"Best sushi I've had here."

Priya ⭐⭐⭐⭐
"Great food, but expensive."
```

The product differentiator is **trusted social context**, not another generic restaurant-rating system.

---

# 2. V1 Objective

V1 should prove one core hypothesis:

> **People may find place recommendations more useful when they can see what their friends think instead of relying only on anonymous aggregate ratings.**

V1 must support this complete flow:

```text
Register
   ↓
Create profile
   ↓
Add friends
   ↓
Search for a place
   ↓
View place information
   ↓
See which friends visited
   ↓
See friends' ratings/reviews
   ↓
Mark place as visited
   ↓
Write your own review
   ↓
Your friends can see your review
```

If this loop works reliably, V1 is successful.

---

# 3. V1 Scope

## Included

- User registration
- User login/logout
- User profile
- User search
- Friend requests
- Accept/reject friend requests
- Friend list
- Place search
- Place details
- External place data
- Mark a place as visited
- Create a review
- Edit/delete own review
- View reviews
- Friend-only review context
- Friend visit count
- Friend average rating
- "Visited by friends" filtering
- Basic responsive UI
- PostgreSQL database
- REST API
- Basic validation and security
- Deployment

## Explicitly NOT included

Do not add these to V1:

- AI chatbot
- Machine learning recommendations
- Taste prediction
- GPS visit verification
- Receipt OCR
- Push notifications
- Kafka
- Kubernetes
- Microservices
- Elasticsearch
- Complex recommendation engine
- Restaurant owner dashboard
- Payments
- In-app messaging
- Stories
- Social-media feed
- Advanced analytics

These belong to later versions.

---

# 4. Recommended Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | UI |
| TypeScript | Type safety |
| Vite | Frontend tooling |
| Tailwind CSS | Styling |
| React Router | Routing |
| TanStack Query | Server-state/API management |
| Zod | Client-side validation where useful |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API |
| TypeScript | Type safety |
| Zod | Request validation |
| Argon2 or bcrypt | Password hashing |
| JWT / secure session approach | Authentication |
| HTTP-only cookies | Safer auth token storage |

## Database

| Technology | Purpose |
|---|---|
| PostgreSQL | Primary relational database |
| PostGIS | Optional V1 location support; can be introduced after basic CRUD |

## External Services

| Service | Purpose |
|---|---|
| Google Places API / Google Maps Platform | Place search and place metadata |
| Cloud storage such as S3 | Optional profile images |

## Development / DevOps

| Technology | Purpose |
|---|---|
| Git | Version control |
| GitHub | Repository |
| Docker | Local development/containerization |
| Docker Compose | Local PostgreSQL and optionally backend |
| GitHub Actions | CI/CD |
| Swagger/OpenAPI | API documentation |

---

# 5. High-Level Architecture

```text
                         USER
                           │
                           ▼
                 ┌──────────────────┐
                 │ React + TypeScript│
                 │ Tailwind CSS      │
                 └────────┬─────────┘
                          │ HTTPS
                          ▼
                 ┌──────────────────┐
                 │ Node.js + Express │
                 │ REST API          │
                 └────────┬─────────┘
                          │
            ┌─────────────┼─────────────┐
            │             │             │
            ▼             ▼             ▼
     ┌────────────┐ ┌────────────┐ ┌──────────────┐
     │ PostgreSQL │ │   Cache    │ │ Places API   │
     │            │ │  optional  │ │              │
     └────────────┘ └────────────┘ └──────────────┘
            │
            ▼
     Users / Friends /
     Visits / Reviews /
     Places
```

### Important V1 principle

The external Places API provides **place information**.

Your own database provides the **social information**.

```text
Places API
    ↓
Name
Address
Coordinates
Category
Photos
Public rating
Place ID

Your Database
    ↓
Users
Friends
Visits
Reviews
Friend ratings
```

Do not make the application dependent on importing or copying all external user reviews. Your differentiating review data should be generated by your own users.

---

# 6. Detailed Request Flow

## Place Search

```text
User
 ↓
React Search Page
 ↓
GET /api/places/search?q=sushi
 ↓
Express Controller
 ↓
Place Service
 ↓
Places API
 ↓
Candidate places
 ↓
Database lookup for friend activity
 ↓
Friend statistics
 ↓
Response
 ↓
React UI
```

The backend should combine external place data with your own social data.

---

# 7. V1 User Flow

## New User

```text
Landing Page
     ↓
Sign Up
     ↓
Create Profile
     ↓
Search Users
     ↓
Send Friend Requests
     ↓
Friends Accept
     ↓
Search Places
```

## Place Discovery

```text
Search "Sushi"
       ↓
Place results
       ↓
Select place
       ↓
Place details
       ↓
Check friend activity
       ↓
Show:
- Friends who visited
- Friend average rating
- Friend reviews
```

## Review Flow

```text
Place Details
      ↓
"I've Been Here"
      ↓
Visit recorded
      ↓
"Write Review"
      ↓
Rating 1–5
      ↓
Comment
      ↓
Submit
      ↓
Review visible according to privacy rules
```

---

# 8. V1 Features in Detail

## 8.1 Authentication

### Features

- Register
- Login
- Logout
- Current-user endpoint
- Password hashing
- Authentication middleware

### Endpoints

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Security requirements

Never store plain-text passwords.

Use:

```text
Password
   ↓
Argon2 / bcrypt
   ↓
Password hash
   ↓
PostgreSQL
```

Use secure HTTP-only cookies for authentication where practical.

---

# 9. User Profile

A basic profile should contain:

```text
Name
Username
Email
Profile image (optional)
Created date
```

Example:

```text
Rahul Sharma

@rahul

48 places visited
32 friends
```

Do not build an advanced social profile in V1.

---

# 10. Friend System

The friend system is the core social component.

## User flow

```text
Search user
    ↓
Send request
    ↓
Receiver gets pending request
    ↓
Accept / Reject
    ↓
Accepted → Friendship created
```

### Required features

- Search users
- Send friend request
- View pending requests
- Accept request
- Reject request
- Remove friend
- View friends

### Friendship states

```text
PENDING
ACCEPTED
REJECTED
```

---

# 11. Place Search

Use the external Places API.

The app should support searches such as:

```text
sushi
cafes
pizza
restaurants
hotels
```

The backend should return useful place information such as:

- Place ID
- Name
- Address
- Coordinates
- Category
- Public rating
- Number of public ratings
- Photo reference / image where permitted
- Open/closed information where available

The external provider should remain the source of truth for external place metadata.

---

# 12. Place Details

A place details page should contain:

```text
Place Name
Photo
Category
Address
External rating
Number of ratings
Opening status
Distance (if location is available)
```

Then the FriendPlace layer:

```text
Friends who visited
Friend average rating
Friend reviews
Visit count
```

Example:

```text
Sushi House

Google: 4.7 ⭐

Japanese • ₹₹

5 friends visited

Friend rating: 4.4 ⭐

Rahul ⭐⭐⭐⭐⭐
"Best sushi I've tried here."

Priya ⭐⭐⭐⭐
"Great food but slightly expensive."
```

---

# 13. Visit Tracking

V1 should use explicit user action.

Button:

```text
I've Been Here
```

When clicked:

```http
POST /api/places/:id/visit
```

Record:

```text
user_id
place_id
visited_at
```

### Do NOT implement GPS verification in V1.

Manual check-in is enough to validate the product concept.

---

# 14. Reviews

A user who has visited a place can create a review.

### Review fields

```text
rating
comment
created_at
updated_at
```

### Rating

```text
1 = Terrible
2 = Bad
3 = Okay
4 = Good
5 = Excellent
```

### Review requirements

- Rating is required
- Rating must be between 1 and 5
- Comment has a reasonable maximum length
- User can edit their own review
- User can delete their own review
- User cannot edit another user's review

---

# 15. Friend Reviews

This is the most important V1 feature.

For each place, calculate:

```text
Number of friends who visited
Average friend rating
Friend review list
```

Example:

```text
3 friends visited

Rahul → 5
Priya → 4
Aman → 3

Average = 4.0
```

Display:

```text
❤️ Friends' rating: 4.0 / 5
```

---

# 16. V1 Friend Score

Keep the first algorithm simple.

```text
Friend Rating =
SUM(friend ratings) / NUMBER OF FRIEND RATINGS
```

Example:

```text
Friend A = 5
Friend B = 4
Friend C = 4

Friend Rating = 13 / 3
              = 4.33
```

Do not introduce machine learning yet.

---

# 17. Search Filters

Minimum useful filters:

```text
All
Friends visited
```

Optional basic filters:

```text
Open now
Rating
Category
Price
```

The most important filter is:

```text
Friends visited
```

---

# 18. Frontend Pages

V1 should contain approximately these pages.

```text
/
├── Landing Page
│
├── /login
│
├── /register
│
├── /home
│
├── /search
│
├── /places/:id
│
├── /friends
│
├── /friends/requests
│
├── /users/:id
│
└── /profile
```

---

# 19. Frontend Components

Suggested reusable components:

```text
components/
├── Navbar
├── SearchBar
├── PlaceCard
├── PlaceList
├── PlaceDetails
├── FriendCard
├── FriendList
├── FriendRequestCard
├── ReviewCard
├── ReviewForm
├── RatingInput
├── Avatar
├── Button
├── Modal
├── LoadingState
├── ErrorState
└── EmptyState
```

---

# 20. Database Schema

V1 should use a relational model.

## Entity relationship

```text
                 ┌─────────────┐
                 │    USERS    │
                 └──────┬──────┘
                        │
             ┌──────────┼──────────┐
             │          │          │
             ▼          ▼          ▼
       FRIENDSHIPS    VISITS    REVIEWS
             │          │          │
             │          └────┬─────┘
             │               │
             │               ▼
             │         ┌─────────────┐
             └────────►│   PLACES    │
                       └─────────────┘
```

---

# 21. Users Table

```sql
users
-----------------------------
id
name
username
email
password_hash
profile_image_url
created_at
updated_at
```

Constraints:

```text
id → PRIMARY KEY
email → UNIQUE
username → UNIQUE
```

---

# 22. Places Table

```sql
places
-----------------------------
id
external_place_id
name
address
latitude
longitude
category
created_at
updated_at
```

The `external_place_id` identifies the place in the external Places provider.

Do not create duplicate internal records for the same external place.

---

# 23. Friendships Table

```sql
friendships
-----------------------------
id
requester_id
receiver_id
status
created_at
updated_at
```

Foreign keys:

```text
requester_id → users.id
receiver_id → users.id
```

Important rule:

```text
requester_id != receiver_id
```

Prevent users from becoming friends with themselves.

---

# 24. Visits Table

```sql
visits
-----------------------------
id
user_id
place_id
visited_at
created_at
```

Foreign keys:

```text
user_id → users.id
place_id → places.id
```

Consider a unique constraint if V1 should allow only one visit record per user/place.

If multiple visits are useful later, remove that restriction and treat visits as historical events.

---

# 25. Reviews Table

```sql
reviews
-----------------------------
id
user_id
place_id
rating
comment
created_at
updated_at
```

Constraints:

```text
rating >= 1
rating <= 5
```

Recommended V1 rule:

```text
One active review per user per place
```

The user can edit it later.

---

# 26. Optional Review Likes

This is optional and can be added after the core V1 flow.

```sql
review_likes
-----------------------------
id
user_id
review_id
created_at
```

Do not let this delay the main product.

---

# 27. REST API

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## Users

```http
GET /api/users/search?q=rahul
GET /api/users/:id
```

## Friends

```http
GET    /api/friends
GET    /api/friends/requests

POST   /api/friends/request/:userId
POST   /api/friends/requests/:requestId/accept
POST   /api/friends/requests/:requestId/reject

DELETE /api/friends/:userId
```

## Places

```http
GET /api/places/search?q=sushi
GET /api/places/:id
```

## Visits

```http
POST /api/places/:id/visit
GET  /api/places/:id/friends
```

## Reviews

```http
POST   /api/places/:id/reviews
GET    /api/places/:id/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

---

# 28. Backend Architecture

Use a layered structure rather than putting everything in route files.

```text
Request
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
Repository / Database
  ↓
Response
```

Example:

```text
GET /api/places/:id
        ↓
places.routes.ts
        ↓
places.controller.ts
        ↓
places.service.ts
        ↓
places.repository.ts
        ↓
PostgreSQL
```

External API calls should also live in services rather than controllers.

---

# 29. Backend Folder Structure

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── env.ts
│   │   └── database.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── users.controller.ts
│   │   ├── friends.controller.ts
│   │   ├── places.controller.ts
│   │   ├── visits.controller.ts
│   │   └── reviews.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── users.service.ts
│   │   ├── friends.service.ts
│   │   ├── places.service.ts
│   │   ├── visits.service.ts
│   │   └── reviews.service.ts
│   │
│   ├── repositories/
│   │   ├── users.repository.ts
│   │   ├── friendships.repository.ts
│   │   ├── places.repository.ts
│   │   ├── visits.repository.ts
│   │   └── reviews.repository.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── friends.routes.ts
│   │   ├── places.routes.ts
│   │   ├── visits.routes.ts
│   │   └── reviews.routes.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── rate-limit.middleware.ts
│   │
│   ├── schemas/
│   │   ├── auth.schema.ts
│   │   ├── review.schema.ts
│   │   └── user.schema.ts
│   │
│   ├── utils/
│   │   ├── password.ts
│   │   └── response.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
├── package.json
├── tsconfig.json
└── .env.example
```

---

# 30. Frontend Folder Structure

```text
frontend/
│
├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── lib/
│   ├── assets/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

# 31. Recommended Project Structure

```text
friendplace/
│
├── frontend/
│
├── backend/
│
├── docs/
│   ├── PROJECT_V1.md
│   └── architecture.md
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── LICENSE
```

---

# 32. Environment Variables

Create:

```text
.env
```

Example:

```env
NODE_ENV=development

PORT=5000

DATABASE_URL=

JWT_SECRET=

GOOGLE_PLACES_API_KEY=

FRONTEND_URL=http://localhost:5173
```

Never commit real secrets.

Commit:

```text
.env.example
```

but not:

```text
.env
```

---

# 33. Docker Plan

For V1, keep Docker simple.

Recommended:

```text
Docker Compose
│
├── PostgreSQL
│
└── Backend (optional)
```

You can run the React development server directly with Vite during development.

Example:

```text
Browser
   ↓
localhost:5173
   ↓
React/Vite

localhost:5000
   ↓
Express

localhost:5432
   ↓
PostgreSQL
```

Docker can later contain the complete application.

---

# 34. API Security

Minimum requirements:

- Hash passwords
- Authenticate protected routes
- Validate request bodies
- Validate URL parameters
- Validate query parameters
- Rate-limit authentication endpoints
- Configure CORS
- Use secure HTTP-only cookies
- Never expose password hashes
- Users can edit/delete only their own reviews
- Users can modify only their own friend requests
- Prevent self-friend requests
- Prevent duplicate friendships
- Prevent invalid ratings

Useful packages/tools:

```text
Zod
Helmet
express-rate-limit
Argon2 / bcrypt
```

---

# 35. Privacy Requirements

Because FriendPlace deals with social relationships and visit information, privacy must be designed from V1.

Users should not expose exact location history.

V1 should expose only:

```text
"Rahul visited this place."
```

not:

```text
"Rahul was physically located here from 7:32 PM to 9:15 PM."
```

Basic privacy rules:

```text
Friend visit information → Friends only
Friend reviews → Based on intended visibility
Profile → Basic public information
Email → Never publicly displayed
```

Exact privacy controls can become more advanced in V2.

---

# 36. V1 Recommendation Logic

Do not build machine learning.

Use simple deterministic logic.

For a place:

```text
friend_count
friend_average_rating
```

Example:

```text
Friend A → 5
Friend B → 4
Friend C → 4

friend_count = 3
friend_average = 4.33
```

Display:

```text
👥 3 friends visited
❤️ Friends' rating: 4.3
```

If sorting places, start with:

```text
1. Friends who visited
2. Friend rating
3. Number of friends
4. External rating
5. Distance
```

Do not claim this is an AI recommendation system.

---

# 37. Example Place Ranking

Suppose:

```text
Restaurant A
Friends: 5
Friend rating: 4.4
Google: 4.6

Restaurant B
Friends: 1
Friend rating: 5.0
Google: 4.8

Restaurant C
Friends: 3
Friend rating: 4.2
Google: 4.5
```

For a user who values trusted friends, V1 can prioritize:

```text
A
C
B
```

because the system has more social evidence for A and C.

The exact ranking formula can be improved in V2.

---

# 38. Testing Strategy

## Backend

Use:

```text
Jest or Vitest
Supertest
```

Test:

```text
Registration
Login
Authentication
Friend request
Friend acceptance
Place retrieval
Visit creation
Review creation
Review update
Review deletion
Authorization
```

## Frontend

Use:

```text
Vitest
React Testing Library
```

Test important UI behavior:

```text
Login form
Search results
Place details
Review form
Friend request UI
Loading states
Error states
```

---

# 39. API Documentation

Use OpenAPI/Swagger.

Document:

```text
Authentication
Users
Friends
Places
Visits
Reviews
```

Every endpoint should document:

```text
Method
URL
Authentication
Request body
Parameters
Success response
Error responses
```

Example:

```http
POST /api/places/:id/reviews
```

Request:

```json
{
  "rating": 5,
  "comment": "Excellent sushi."
}
```

Response:

```json
{
  "id": "review_id",
  "rating": 5,
  "comment": "Excellent sushi."
}
```

---

# 40. Development Phases

## Phase 0 — Planning

### Goal

Finalize:

- Product name
- Database schema
- API contract
- Wireframes
- GitHub repository
- Environment setup

Checklist:

- [ ] Create GitHub repository
- [ ] Create README
- [ ] Create project folders
- [ ] Create database ER diagram
- [ ] Create API list
- [ ] Create basic UI wireframes

---

# Phase 1 — Frontend Foundation

### Goal

Build the basic UI without backend integration.

Build:

- [ ] Landing page
- [ ] Login page
- [ ] Register page
- [ ] Home page
- [ ] Search page
- [ ] Place card
- [ ] Place details page
- [ ] Friend list
- [ ] Profile page
- [ ] Review card
- [ ] Review form

At this stage, use mock data.

---

# Phase 2 — Backend Foundation

### Goal

Create a working REST API.

Build:

- [ ] Node.js project
- [ ] Express server
- [ ] TypeScript
- [ ] Environment configuration
- [ ] Error handling
- [ ] Request validation
- [ ] PostgreSQL connection
- [ ] Database migrations/schema
- [ ] Basic logging

---

# Phase 3 — Authentication

Build:

- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Current user
- [ ] Password hashing
- [ ] Auth middleware
- [ ] Protected routes

Test:

```text
Register → Login → Access protected endpoint
```

---

# Phase 4 — Friend System

Build:

- [ ] Search users
- [ ] Send friend request
- [ ] Pending requests
- [ ] Accept request
- [ ] Reject request
- [ ] Remove friend
- [ ] Friend list

Test:

```text
User A
 ↓
Request
 ↓
User B
 ↓
Accept
 ↓
Friends
```

---

# Phase 5 — Places API

Build:

- [ ] External Places API integration
- [ ] Search endpoint
- [ ] Place details endpoint
- [ ] Save useful place metadata
- [ ] Map/location fields if needed
- [ ] Handle API failures
- [ ] Handle API rate/usage limits

Important:

Keep external API credentials on the backend.

Do not expose secret API keys in frontend code unless the provider explicitly requires a client-side key and it is properly restricted.

---

# Phase 6 — Visits

Build:

- [ ] "I've Been Here" button
- [ ] Create visit
- [ ] Prevent invalid duplicate records if required
- [ ] Show friends who visited
- [ ] Show visit count

Test:

```text
User A visits place
 ↓
User B opens place
 ↓
User B sees:
"1 friend visited"
```

---

# Phase 7 — Reviews

Build:

- [ ] Create review
- [ ] View reviews
- [ ] Edit own review
- [ ] Delete own review
- [ ] Rating validation
- [ ] Comment validation
- [ ] Authorization

Then combine:

```text
Place
+
Friends
+
Visits
+
Reviews
```

---

# Phase 8 — Friend Recommendation Layer

Build:

- [ ] Friend visit count
- [ ] Friend average rating
- [ ] Friend review display
- [ ] Friends-visited filter
- [ ] Basic social ranking

Example:

```text
5 friends visited
Friend rating: 4.4
```

This is the milestone where the app becomes meaningfully different from a generic place-search application.

---

# Phase 9 — Integration & Polish

Build:

- [ ] Connect all frontend pages to real API
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Responsive design
- [ ] Mobile-friendly layout
- [ ] Form validation
- [ ] Authentication persistence
- [ ] Clean UI
- [ ] Accessibility basics

---

# Phase 10 — Testing

Checklist:

- [ ] Authentication tests
- [ ] Friend system tests
- [ ] Review tests
- [ ] Authorization tests
- [ ] API integration tests
- [ ] Frontend component tests
- [ ] Manual end-to-end testing

---

# Phase 11 — Docker & Deployment

Build:

- [ ] Dockerfile for backend
- [ ] Docker Compose
- [ ] PostgreSQL container for development
- [ ] Production environment variables
- [ ] Build frontend
- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Configure managed PostgreSQL
- [ ] Configure domain
- [ ] HTTPS
- [ ] GitHub Actions

---

# 41. V1 Development Checklist

## Project Setup

- [ ] GitHub repository created
- [ ] README created
- [ ] Frontend created
- [ ] Backend created
- [ ] TypeScript configured
- [ ] PostgreSQL configured
- [ ] `.env.example` created
- [ ] `.gitignore` configured

## Authentication

- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Password hashing
- [ ] Auth middleware
- [ ] Protected routes
- [ ] Current user

## Users

- [ ] User profile
- [ ] Search users
- [ ] View user

## Friends

- [ ] Send request
- [ ] Accept request
- [ ] Reject request
- [ ] Remove friend
- [ ] List friends
- [ ] Pending requests

## Places

- [ ] Search places
- [ ] Place details
- [ ] External place ID
- [ ] External rating
- [ ] Address
- [ ] Category
- [ ] Photo
- [ ] Open status

## Visits

- [ ] Mark visited
- [ ] Store visit
- [ ] Show friend visits
- [ ] Show friend count

## Reviews

- [ ] Create review
- [ ] Rating
- [ ] Comment
- [ ] View reviews
- [ ] Edit review
- [ ] Delete review
- [ ] Authorization

## Friend Recommendation

- [ ] Friend count
- [ ] Friend average rating
- [ ] Friend review display
- [ ] Friends visited filter
- [ ] Basic ranking

## Security

- [ ] Password hashing
- [ ] Input validation
- [ ] Rate limiting
- [ ] CORS
- [ ] Security headers
- [ ] Secure authentication
- [ ] Authorization checks
- [ ] Secrets protected

## Testing

- [ ] Backend tests
- [ ] API tests
- [ ] Frontend tests
- [ ] Manual testing
- [ ] Error cases tested

## Deployment

- [ ] Production build
- [ ] Docker
- [ ] Database deployed
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] HTTPS
- [ ] Environment variables
- [ ] CI/CD
- [ ] Production testing

---

# 42. V1 Definition of Done

V1 is complete only when a real user can perform this:

```text
1. Register
       ↓
2. Login
       ↓
3. Find another user
       ↓
4. Send friend request
       ↓
5. Friend accepts
       ↓
6. Search "Sushi"
       ↓
7. Find a real restaurant
       ↓
8. Open restaurant
       ↓
9. See friend's visit/review
       ↓
10. Mark restaurant as visited
       ↓
11. Give rating
       ↓
12. Write review
       ↓
13. Friend can see the review
```

If any major part of this flow is broken, V1 is not finished.

---

# 43. V1 Demo Scenario

For your portfolio/demo, create two or three test users.

Example:

```text
Adarsh
Rahul
Priya
```

### Rahul

Visits:

```text
Sushi House
Rating: 5
"Excellent sushi."
```

### Priya

Visits:

```text
Sushi House
Rating: 4
"Good food, expensive."
```

### Adarsh

Searches:

```text
Sushi near me
```

The result should say:

```text
Sushi House

⭐ 4.7 Google

👥 2 friends visited
❤️ Friends' rating: 4.5

Rahul ⭐⭐⭐⭐⭐
"Excellent sushi."

Priya ⭐⭐⭐⭐
"Good food, expensive."
```

This is the ideal V1 demo.

---

# 44. V2 Roadmap

After V1 works, consider:

```text
V2
│
├── Friend Score
├── Taste similarity
├── Personalized ranking
├── Advanced filters
├── Map view
├── Photos
├── Better profile
├── Notifications
├── Review likes
├── Collections
└── Saved places
```

---

# 45. V3 Roadmap

After the product is stable:

```text
V3
│
├── ML recommendation engine
├── User taste profile
├── Recommendation explanations
├── Visit verification
├── Receipt OCR
├── Fraud/spam detection
├── Redis caching
├── Advanced search
├── Analytics
├── Observability
└── Production scaling
```

---

# 46. Future Recommendation System

Do not implement this in V1.

Eventually:

```text
                    USER
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
     Friends       History      Preferences
        │             │             │
        └─────────────┼─────────────┘
                      ▼
              Recommendation
                  Engine
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
      Friend       Taste       Distance
       Score     Similarity
          │           │           │
          └───────────┼───────────┘
                      ▼
              Ranked Places
```

A future ranking formula could consider:

```text
Friend influence
+
Taste similarity
+
Recency
+
Distance
+
Public rating
+
Number of trusted friends
```

But V1 should remain deterministic and understandable.

---

# 47. Important Product Rules

## Rule 1

Do not become another Google Maps clone.

Your differentiator is:

```text
Friends + Visits + Reviews
```

## Rule 2

Do not add AI just to say the project has AI.

AI should solve a real recommendation problem later.

## Rule 3

Do not build microservices for V1.

Use one backend.

## Rule 4

Do not build Kubernetes for V1.

Docker is enough.

## Rule 5

Do not build a complicated ML recommendation model before you have users and review data.

You need data before sophisticated recommendations make sense.

## Rule 6

Do not sacrifice the core user experience for infrastructure.

The user should be able to discover a place and understand:

> "What do my friends think about it?"

within seconds.

---

# 48. Portfolio Value

If implemented properly, V1 demonstrates:

```text
Frontend
✓ React
✓ TypeScript
✓ Responsive UI
✓ State management
✓ API integration

Backend
✓ Node.js
✓ Express
✓ REST APIs
✓ Authentication
✓ Authorization
✓ Validation

Database
✓ PostgreSQL
✓ Relational modeling
✓ Foreign keys
✓ Constraints
✓ SQL

External Integration
✓ Places API
✓ API error handling

Engineering
✓ Git/GitHub
✓ Testing
✓ Docker
✓ API documentation
✓ Deployment
```

The project becomes substantially stronger once V2 adds recommendation logic and V3 adds production-oriented infrastructure.

---

# 49. Suggested Git Commit Strategy

Use meaningful commits.

```text
feat: initialize React frontend
feat: initialize Express backend
feat: add PostgreSQL connection
feat: implement user registration
feat: implement user login
feat: add authentication middleware
feat: add user search
feat: implement friend requests
feat: integrate Places API
feat: add place details
feat: implement place visits
feat: implement reviews
feat: add friend rating
feat: add friends visited filter
test: add authentication tests
test: add review API tests
docs: add API documentation
chore: add Docker configuration
ci: add GitHub Actions workflow
```

Avoid commits such as:

```text
update
final
final2
done
changes
new
```

---

# 50. Final V1 Architecture

```text
                           INTERNET
                              │
                              ▼
                    ┌───────────────────┐
                    │ React + TypeScript│
                    │ Tailwind CSS      │
                    └─────────┬─────────┘
                              │
                            HTTPS
                              │
                              ▼
                    ┌───────────────────┐
                    │ Node.js + Express │
                    │ REST API          │
                    └─────────┬─────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
      ┌─────────────┐   ┌────────────┐  ┌──────────────┐
      │ PostgreSQL  │   │   Places   │  │ Auth /       │
      │             │   │    API     │  │ Security     │
      │ Users       │   │            │  │              │
      │ Friends     │   └────────────┘  └──────────────┘
      │ Places      │
      │ Visits      │
      │ Reviews     │
      └──────┬──────┘
             │
             ▼
      ┌──────────────────┐
      │ Friend Context   │
      │                  │
      │ Friend Visits    │
      │ Friend Reviews   │
      │ Friend Rating    │
      └────────┬─────────┘
               │
               ▼
      ┌──────────────────┐
      │ Personalized     │
      │ Place Results    │
      └──────────────────┘
```

---

# 51. Final V1 Principle

The project does **not** need to know everything about a restaurant.

It needs to answer one question better than a normal place-search application:

> **"Do people I trust actually like this place?"**

If V1 can answer that question quickly, reliably, and with real user data, you have a solid foundation for V2 and V3.
