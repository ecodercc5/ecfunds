import admin from "firebase-admin";

admin.initializeApp({ projectId: "ecfunds-e965c" });

const firestore = admin.firestore();

firestore.settings({ ignoreUndefinedProperties: true });

export { admin, firestore };
