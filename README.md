# Emaily

A full-stack SaaS application for creating and sending email surveys to collect feedback. Users authenticate with Google, purchase credits, create surveys, and track yes/no responses from recipients.

## Features

- Google OAuth 2.0 authentication
- Credit-based system (purchase credits via Stripe to send surveys)
- Create surveys with custom title, subject, body, and recipient list
- Send surveys via email using SendGrid
- Track yes/no responses per survey

## Tech Stack

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- Passport.js (Google OAuth 2.0)
- Stripe (payments)
- SendGrid (email delivery)
- cookie-session

**Frontend**
- React + Redux
- React Router DOM
- Materialize CSS
- Axios
- react-stripe-checkout

## Project Structure

```
server/
├── index.js              # Express server entry point
├── config/
│   ├── keys.js           # Dev/prod config switcher
│   └── prod.js           # Production env var mappings
├── models/
│   ├── User.js           # User schema (googleId, credits)
│   ├── Survey.js         # Survey schema
│   └── Recipient.js      # Recipient schema (email, responded)
├── routes/
│   ├── authRoutes.js     # Google OAuth endpoints
│   ├── billingRoutes.js  # Stripe payment endpoint
│   └── surveyRoutes.js   # Survey CRUD endpoints
├── middlewares/
│   ├── requireLogin.js   # Auth guard middleware
│   └── requireCredits.js # Credit check middleware
├── services/
│   ├── passport.js       # Google OAuth strategy
│   ├── Mailer.js         # SendGrid email service
│   └── emailTemplate/
│       └── surveyTemplate.js
└── client/               # React frontend (Create React App)
    └── src/
        ├── actions/
        ├── reducers/
        └── components/
```

## Prerequisites

- Node.js v10.15.3+
- npm 5.0.3+
- MongoDB (local or Atlas)
- Google OAuth credentials
- Stripe account
- SendGrid account

## Setup

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd server
npm install
npm install --prefix client
```

### 2. Configure environment variables

Create `config/dev.js` for local development:

```js
module.exports = {
  googleClientID: 'YOUR_GOOGLE_CLIENT_ID',
  googleClientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  mongoURI: 'YOUR_MONGODB_URI',
  cookieKey: 'YOUR_COOKIE_ENCRYPTION_KEY',
  stripePublishableKey: 'pk_test_...',
  stripeSecretKey: 'sk_test_...',
  sendGridKey: 'YOUR_SENDGRID_API_KEY',
};
```

Create `client/.env.development` for the frontend:

```env
REACT_APP_STRIPE_KEY=pk_test_...
```

For **production**, set these as environment variables (used in `config/prod.js`):

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `MONGO_URI` | MongoDB connection string |
| `COOKIE_KEY` | Session cookie encryption key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `SEND_GRID_KEY` | SendGrid API key |

## Running the App

```bash
# Full stack development (backend on :5000, frontend on :3000)
npm run dev

# Backend only (with auto-reload)
npm run server

# Frontend only
npm run client

# Production
npm start
```

## API Endpoints

### Auth
| Method | Path | Description |
|---|---|---|
| GET | `/auth/google` | Initiate Google OAuth login |
| GET | `/auth/google/callback` | OAuth callback |
| GET | `/api/current_user` | Return current authenticated user |
| GET | `/api/logout` | Log out |

### Billing
| Method | Path | Description |
|---|---|---|
| POST | `/api/stripe` | Process payment and add 5 credits ($5 USD) |

### Surveys
| Method | Path | Description |
|---|---|---|
| POST | `/api/surveys` | Create and send a survey (costs 1 credit) |

**POST /api/surveys body:**
```json
{
  "title": "Customer Feedback",
  "subject": "Do you like our product?",
  "body": "Please take a moment to give us feedback.",
  "recipients": "user1@example.com, user2@example.com"
}
```

## Frontend Routes

| Path | Description |
|---|---|
| `/` | Landing page |
| `/surveys` | Dashboard (requires login) |
| `/surveys/new` | Create new survey (requires login + credits) |

## Deployment (Heroku)

The `heroku-postbuild` script in `package.json` automatically builds the React client on deploy. Set all production environment variables in your Heroku app settings before deploying.

```bash
heroku create
heroku config:set GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... # etc.
git push heroku master
```
