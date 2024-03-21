import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDlc6tJcvPWMu_vra61TjYMPkfgZ1OLulU',
  authDomain: 'triobudget.firebaseapp.com',
  projectId: 'triobudget',
  storageBucket: 'triobudget.appspot.com',
  messagingSenderId: '1045692393299',
  appId: '1:1045692393299:web:480aef687351bc71f523a6',
  measurementId: 'G-KWDJ44W8NH',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth(app);

export { auth };
