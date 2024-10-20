import React, { useState } from "react";
import api from "../utils/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const signupHandler = async (event) => {
    event.preventDefault();
    setPasswordError("")
    setSignupError("")
    try {
      if (password !== passwordConfirm) {
        setPasswordError("Password doesn't match");
        throw new Error("Password doesn't match");
      }
      const response = await api.post("/users/signup", {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        navigate("/");
      } else {
        throw new Error(`signup failed: ${response.data.error}`);
      }
    } catch (err) {
      setSignupError(err.error);
    }
  };

  return (
    <div className="display-center">
      <Form className="login-box">
        <h1>회원가입</h1>
        {signupError && <div>{signupError}</div>}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter your name"
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
          {passwordError && <div>{passwordError}</div>}
        </Form.Group>

        <div className="button-box">
          <Button
            className="button-primary"
            type="submit"
            onClick={signupHandler}
          >
            회원가입
          </Button>
          <span>
            Already have an account?
            {" "} 
            <Button variant="secondary">
              <Link to="/login" className="custom-link">Login</Link>
            </Button>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
