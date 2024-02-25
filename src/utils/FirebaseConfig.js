import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNpqpO1zU1iRt5wD5NkmCHBylqUn80s40",
  authDomain: "aisaas-socket.firebaseapp.com",
  projectId: "aisaas-socket",
  storageBucket: "aisaas-socket.appspot.com",
  messagingSenderId: "161444792146",
  appId: "1:161444792146:web:c4fe652c395b28ff969c8b"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);