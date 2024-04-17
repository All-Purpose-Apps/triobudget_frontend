import App from './Pages/App';
import Home from './Pages/EntryPoint';
import MobileComingSoon from './Pages/MobileComingSoon';
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

export default function Routing() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authSlice.isLoggedIn);
    const [loading, setLoading] = useState(true);
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [mongoUser, setMongoUser] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                getIdToken(user, true).then(idToken => {
                    localStorage.setItem('token', idToken);
                    localStorage.setItem('uid', user.uid);
                    setFirebaseUser(user);
                    dispatch(setLoginState(true));
                    dispatch(getUser(user.uid)).then(mongoUser => {
                        setMongoUser(mongoUser.payload)
                    });
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (isMobile) {
        return <MobileComingSoon />;
    }

    if (loading && firebaseUser === null && mongoUser === null) {
        return (
            <Container className="text-center p-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    else {
        return (
            <div><Routes>
                <Route path="/" element={isLoggedIn ?
                    <Navigate replace to="/transactions" /> : <Home />} />
                <Route path="/transactions/*" element={isLoggedIn ?
                    <App handleSignOut={handleSignOut} firebaseUser={firebaseUser} mongoUser={mongoUser} /> : <Navigate replace to="/" />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes></div>
        )
    }
}
