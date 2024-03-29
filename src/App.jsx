import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp'

export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
