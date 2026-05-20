import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Initialize MongoClient
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("tutors-finder");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        collectionNames: {
            user: "users",
            session: "sessions",
            account: "accounts",
            verification: "verifications"
        }
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "dummy_client_id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy_client_secret"
        }
    }
});
export default auth;
