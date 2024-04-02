import axios from 'axios';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from './firebaseConfig';

const testProtected = async () => {
  try {
    const token = await localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/protected-route', {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default testProtected;
