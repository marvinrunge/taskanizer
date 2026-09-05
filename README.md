# taskanizer

Taskanizer is an Angular 20 and Ionic task application backed by Firebase
Authentication and Cloud Firestore.

## Firebase setup

1. Create a Firebase web app.
2. Enable Email/Password authentication.
3. Create a Cloud Firestore database.
4. Add the web app configuration to both files in `src/environments/`.
5. Restrict Firestore access to the signed-in user's task collection:
   `users/{userId}/tasks/{taskId}`.

## Development

```sh
npm install
npm start
```

Run `npm run build` for a production build and `npm test` for the unit tests.