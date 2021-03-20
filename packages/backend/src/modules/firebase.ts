import admin from "firebase-admin";

admin.initializeApp({ projectId: "ecfunds-e965c" });

const firestore = admin.firestore();
const auth = admin.auth();

firestore.settings({ ignoreUndefinedProperties: true });

export { admin, firestore, auth };
