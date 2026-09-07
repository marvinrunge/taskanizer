# taskanizer

Taskanizer is an Angular 20 and Ionic task application backed by Firebase
Authentication and Cloud Firestore.

## Firebase setup

1. Create a Firebase web app.
2. Enable Email/Password authentication.
3. Create a Cloud Firestore database.
4. Add the web app configuration to both files in `src/environments/`.
5. Deploy the included per-user Firestore rules with
   `firebase deploy --only firestore:rules`.

## Development

```sh
npm install
npm start
```

Run `npm run build` for a production build and `npm test` for the unit tests.

Production builds install an Angular service worker and use Firestore's
persistent IndexedDB cache. Previously loaded tasks remain available offline,
and edits made while offline are queued until Firebase reconnects.

## GitHub Pages

The `Deploy Taskanizer to GitHub Pages` workflow tests and publishes `www` on
pushes to `master`. Before running it, select **GitHub Actions** as the Pages
source and define these repository variables:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`