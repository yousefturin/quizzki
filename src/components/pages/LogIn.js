import React, { useRef, useState } from "react";
import "../../App.css";
import { Card, Form, Container, Button, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function LogIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (error) {
            // Handle specific error cases and provide meaningful error messages
            if (error.code === "auth/invalid-login-credentials") {
                setError("Please check your email and password.");
            } else {
                // For other errors, you can use a generic message
                setError("Failed to log in. Please try again later.");
            }
        }

        setLoading(false);
    }

    return (
        <>
            <div className="contaner-signup-wrapper">
                <Container
                    className="contaner-signup-display"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="card-signup-wrapper" style={{ maxWidth: "400px" }}>
                        <Card>
                            <Card.Body>
                                <h2
                                    className="text-header-signup"
                                    style={{ fontWeight: "bold" }}
                                >
                                    Log In
                                </h2>
                                {error && (
                                    <Alert className="alert-error-signup">
                                        <p>{error}</p>
                                    </Alert>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email" className="form-group">
                                        <Form.Label className="Form-lable-text">
                                            Email
                                            <Form.Control
                                                type="email"
                                                ref={emailRef}
                                                required
                                            //   placeholder="Your Email"
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group id="password" className="form-group">
                                        <Form.Label className="Form-lable-text">
                                            Password
                                            <Form.Control
                                                type="password"
                                                ref={passwordRef}
                                                required
                                            // placeholder="Your Password"
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                    <Button
                                        disabled={loading}
                                        className="btn-form-submit"
                                        type="submit"
                                    >
                                        {" "}
                                        Log In
                                    </Button>
                                </Form>
                                <div className="bottom-text-signup">
                                    <Link
                                        className="link-text-dispaly-signup"
                                        to="/reset-password"
                                        style={{ fontSize: "12px" }}
                                    >
                                        {" "}
                                        Forgot Password?
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                        <div
                            style={{ color: "#fefffe" }}
                            className="under-card-text-signup"
                        >
                            Need an account?{" "}
                            <Link className="link-text-dispaly-signup" to="/sign-up">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
