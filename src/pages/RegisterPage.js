import React, { useState } from "react";
import api from "../utils/api"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("")
  const [signupError, setSignupError] = useState("")
  const navigate = useNavigate()

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (password !== passwordConfirm) {
        throw new Error("Password doesn't match")
      }
      const response = await api.post('/users/signup', { name, email, password})
      if(response.status ===200) {
        navigate('/')
      } else {
        throw new Error(`redirect failed due to ${response.data.error}`)
      }
    } catch (err) {
      setPasswordError(err.message)
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

        <Button className="button-primary" type="submit" onClick={submitHandler}>
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
