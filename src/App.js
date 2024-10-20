import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null)

  const getUser = async () => {
    try {
      const accessToken = sessionStorage.getItem("jwt")
      const refreshToken = localStorage.getItem("refreshToken")
      if (accessToken || refreshToken) {
        const response = await api.get("/users/auth")
        setUser(response.data.user)
      } else throw new Error("Invalid token")
      
    } catch (err) {
      setUser(null)
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage setUser={setUser} />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
