import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginState } from './store/slices/authSlice';
import app from './utils/firebaseConfig';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp'
import TestPage from './Pages/TestPage';
import { Navigate } from 'react-router-dom';

export default function App() {

  const auth = getAuth(app);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setLoginState(true));
    } else {
      dispatch(setLoginState(false));
    }
  });

  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {isLoggedIn && <Route path="/test" element={<TestPage />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
