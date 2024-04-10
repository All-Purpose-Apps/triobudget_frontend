import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

// Firebase imports
import { getAuth, onAuthStateChanged, getIdToken, signOut } from 'firebase/auth';
import app from './utils/firebaseConfig';

// Redux actions
import { setLoginState } from './store/slices/authSlice';
import { getUser } from './store/slices/userSlice';

// Page & Component imports
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Transactions from './Pages/Transactions';
import TopNavBar from './components/TopNavBar';
import SideBar from './components/SideBar';

function App() {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const isLoggedIn = useSelector(state => state.authSlice.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        getIdToken(user, true).then(idToken => {
          localStorage.setItem('token', idToken);
          localStorage.setItem('uid', user.uid);
          dispatch(setLoginState(true));
          dispatch(getUser(user.uid));
        });
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        dispatch(setLoginState(false));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container fluid>
      {isLoggedIn && <Navigate replace to="/transactions" />}
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
            {isLoggedIn ? <Route path="/transactions" element={<Transactions />} /> : <Route path="*" element={<Navigate replace to="/" />} />}
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
