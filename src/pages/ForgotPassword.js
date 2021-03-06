import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";

import logo from "../assets/Untitled-1.png";

import "../css/ForgotPassword.css";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (e) {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center grid-right"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div>
          <Card>
            <Card.Body>
              <div id="logo-login">
                <img src={logo} alt="logo" style={{ Width: "200px" }} />
              </div>
              <h2 className="text-center mb-4">Password Reset</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Reset Password
                </Button>
              </Form>
              <div className="w-100 text-center mt-2">
                <Link to="/">Login</Link>
              </div>
              <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}
