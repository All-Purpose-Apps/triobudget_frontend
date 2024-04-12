import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

// Firebase imports
import { getAuth, onAuthStateChanged, getIdToken, signOut } from 'firebase/auth';
import app from '../utils/firebaseConfig';

// Redux actions
import { setLoginState } from '../store/slices/authSlice';
import { getUser } from '../store/slices/userSlice';

// Page & Component imports
import Transactions from '../components/Transactions';
import TopNavBar from '../components/TopNavBar';

function App() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
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
      <Row>
        <Col className="p-0">
          <TopNavBar />
        </Col>
      </Row>
      <Row>
        <Col>
          <Transactions />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
