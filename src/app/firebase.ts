import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from 'firebase/firestore';
import { environment } from '../environments/environment';

export const firebaseApp = getApps().length ? getApp() : initializeApp(environment.firebase);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});
