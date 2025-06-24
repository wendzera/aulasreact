import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOWg6fh6ypq-JPd3GNRJfPF5u8HN3kOe8",
  authDomain: "projeto-web-eb847.firebaseapp.com",
  projectId: "projeto-web-eb847",
  storageBucket: "projeto-web-eb847.firebasestorage.app",
  messagingSenderId: "673549513852",
  appId: "1:673549513852:web:bd9312e03a27fe4d8905f9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
