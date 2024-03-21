import AuthTest from "./pages/AuthTest"
import Login from "./pages/LoginForm";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

export default function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {isLoggedIn && <Route path="/authtest" element={<AuthTest />} />}
      </Routes>
    </div>
  )
}
