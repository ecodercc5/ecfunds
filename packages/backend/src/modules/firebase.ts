import admin from "firebase-admin";
import serviceAccount from "../firebase_config.json";

if (process.env.CONTEXT === "dev") {
  admin.initializeApp({ projectId: "ecfunds-e965c" });
} else {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const firestore = admin.firestore();
const auth = admin.auth();

console.log(process.env);

firestore.settings({ ignoreUndefinedProperties: true });

export { admin, firestore, auth };
