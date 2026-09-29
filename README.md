# Where's Waldo Backend

This repository contains the REST API for a Where's Waldo photo-tagging game, built as part of [The Odin Project](https://www.theodinproject.com/) curriculum. The backend validates character guesses and stores a leaderboard of the fastest completion times for each scene.

- **Live game:** [whereswaldo-frontend.vercel.app](https://whereswaldo-frontend.vercel.app)
- **Frontend repository:** [github.com/jormaedes/whereswaldo-frontend](https://github.com/jormaedes/whereswaldo-frontend)

## Tech stack

- Node.js and TypeScript
- Express 5
- PostgreSQL
- Prisma ORM 7 with the `@prisma/adapter-pg` adapter

## Prerequisites

- Node.js compatible with the TypeScript and Prisma versions installed in this project
- npm
- A PostgreSQL instance accessible to the backend

## Local setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/jormaedes/whereswaldo-backend.git
   cd whereswaldo-backend
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
  DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME?schema=public"
   PORT=3300
   FRONTEND_URL="https://whereswaldo-frontend.vercel.app"
   ```

   Replace the database URL placeholders with your PostgreSQL credentials and database name. `DATABASE_URL` is required. `PORT` is optional and defaults to `3300`. `FRONTEND_URL` sets the origin allowed by CORS; if omitted, the API allows requests from any origin.

3. Generate the Prisma Client and apply existing migrations:

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

   For local development, `npm run build:prisma:dev` generates the client and runs `prisma migrate dev`, creating a migration when the schema has changed.

4. Start the development server:

   ```bash
   npm run dev
   ```

   The API is available at `http://localhost:3300` by default. The development server watches TypeScript files and restarts when they change.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the server with automatic reload. |
| `npm run build:prisma` | Generate the Prisma Client and apply pending migrations. |
| `npm run build:prisma:dev` | Generate the Prisma Client and run migrations in development mode. |
| `npm run build` | Prepare Prisma and compile TypeScript to `dist/`. Requires a configured, reachable database. |
| `npm start` | Start the compiled application from `dist/server.js`. |

## API

All routes use the `/api` prefix and accept and return JSON.

### Check a character guess

`POST /api/guess`

Checks whether the submitted coordinates match the selected character in a level. `x` and `y` are normalized image coordinates, from `0` to `1`. The check uses Euclidean distance and the radius configured for that character.

Request body:

```json
{
  "levelId": 0,
  "name": "waldo",
  "x": 0.5278,
  "y": 0.4909
}
```

Example:

```bash
curl -X POST http://localhost:3300/api/guess \
  -H 'Content-Type: application/json' \
  -d '{"levelId":0,"name":"waldo","x":0.5278,"y":0.4909}'
```

For a character configured in the level, the response includes whether the guess was correct and the character's target coordinates:

```json
{
  "correct": true,
  "x": 0.5278,
  "y": 0.4909
}
```

If the character name is not configured for the level, the response is `{"correct":false}`. Missing fields or fields with incorrect types return `400 Bad Request`; an unknown level returns `404 Not Found`.

### Register a winner

`POST /api/winner`

Stores a player's name, the scene ID, and completion time in milliseconds in PostgreSQL.

Request body:

```json
{
  "name": "Ada",
  "scene": 0,
  "timeMs": 42850
}
```

Example:

```bash
curl -X POST http://localhost:3300/api/winner \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ada","scene":0,"timeMs":42850}'
```

Returns `201 Created` with the created record, including `id` and `createdAt`. Missing fields or fields with incorrect types return `400 Bad Request`; an unknown scene returns `404 Not Found`.

### Get the leaderboard

`GET /api/levels/:sceneId/winners`

Returns up to 10 winners for the scene, ordered by fastest time first.

```bash
curl http://localhost:3300/api/levels/0/winners
```

The response is an array of winner records. An invalid scene ID returns `400 Bad Request`; a scene with no records returns `[]`.

## Levels and characters

Levels are configured in `src/data/levels.ts`. The current level IDs are `0`, `1`, and `2`. Each level defines its findable characters and their normalized positions. The default hit radius is `0.03`, and the available characters vary by level.

## Database model

The `Winner` model stores:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `Int` | Auto-incrementing identifier. |
| `name` | `String` | Name provided by the player. |
| `scene` | `Int` | Level/scene ID. |
| `timeMs` | `Int` | Completion time in milliseconds. |
| `createdAt` | `DateTime` | Record creation time, set automatically. |

## Development notes

The Prisma schema is in `prisma/schema.prisma`, and migrations are in `prisma/migrations/`. After changing the schema during development, run `npm run build:prisma:dev`. The `npm test` script is currently a placeholder and does not run a test suite.

