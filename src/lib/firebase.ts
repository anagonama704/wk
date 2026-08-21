import * as admin from "firebase-admin";

function getPrivateKey(): string {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) {
    throw new Error("FIREBASE_PRIVATE_KEY is not set");
  }
  return key.replace(/\\n/g, "\n");
}

function initializeFirebase(): admin.firestore.Firestore {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: getPrivateKey(),
      }),
    });
  }
  return admin.firestore();
}

let firestore: admin.firestore.Firestore | null = null;

export function getDb(): admin.firestore.Firestore {
  if (!firestore) {
    firestore = initializeFirebase();
  }
  return firestore;
}
