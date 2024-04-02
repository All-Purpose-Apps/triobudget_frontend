import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, getAuth, getIdToken } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginState } from './store/slices/authSlice';
import app from './utils/firebaseConfig';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp'
import Transactions from './Pages/Transactions';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function App() {

  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLoginState(true));
        getIdToken(user, true).then((idToken) => {
          localStorage.setItem('token', idToken)
        });
      } else {
        dispatch(setLoginState(false));
      }
    });
  }, [auth, dispatch]);

  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);

  return (
    <div>
      {isLoggedIn && <Navigate to='/test' />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isLoggedIn && <Route path="/test" element={<Transactions />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
