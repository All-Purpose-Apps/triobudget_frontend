import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, getAuth, getIdToken, signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginState } from './store/slices/authSlice';
import app from './utils/firebaseConfig';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp'
import Transactions from './Pages/Transactions';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import TopNavBar from './components/TopNavBar';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from './components/SideBar';

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

  // Sign out function
  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out successfully');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <Container fluid>
      {isLoggedIn && <Navigate to='/test' />}
      <Row>
        <Col className="p-0">
          <TopNavBar handleSignOut={handleSignOut} />
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <SideBar />
        </Col>
        <Col>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {isLoggedIn && <Route path="/test" element={<Transactions />} />}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}
