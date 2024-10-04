import admin from 'firebase-admin'
import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
})

const db = admin.firestore()

export { db }