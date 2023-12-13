import React, { useRef, useState } from "react";
import { Card, Form, Container, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

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
            <div className="container-signup-wrapper">
                <Container
                    className="container-signup-display"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="card-signup-wrapper" style={{ maxWidth: "400px" }}>
                        <Card>
                            <Card.Body>
                                <div className="wrapper-start-container">
                                    <h2
                                        className="text-header-signup"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Log In
                                    </h2>
                                    <img
                                        src="/images/image-login-1.svg"
                                        alt="Rules illustration"
                                        className="image-login-controller"
                                    />
                                </div>

                                {error && (
                                    <Alert className="alert-error-signup">
                                        <p>{error}</p>
                                    </Alert>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email" className="form-group">
                                        <Form.Label className="Form-label-text">
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
                                        <Form.Label className="Form-label-text">
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
                                        className="link-text-display-signup"
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
                            style={{ color: "var(--primary)" }}
                            className="under-card-text-signup"
                        >
                            Need an account?{" "}
                            <Link className="link-text-display-signup" to="/sign-up">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
