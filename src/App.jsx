import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp'
import TestPage from './Pages/TestPage';
import { Navigate } from 'react-router-dom';

export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
