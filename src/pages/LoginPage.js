import React from "react";
import api from "../utils/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginPage = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("")
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    setLoginError("")
    try {
      const response = await api.post("/users/login", { email, password });
      if (response.status === 200) {
        setUser(response.data.user)
        sessionStorage.setItem("jwt", response.data.token)
        navigate("/");
      } else {
        throw new Error(`${response.data.error}`);
      }
    } catch (err) {
      setLoginError(err.error)
    }
  };

  if (user) {
    return <Navigate to="/" />
  }
  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={loginHandler}>
        <h1>로그인</h1>
        {loginError && <div>{loginError}</div>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
