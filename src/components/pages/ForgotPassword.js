import React, { useRef, useState } from "react";
import { Card, Form, Container, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../App.css";

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your MailBox for the reset password Link");
        } catch {
            setError("Failed to reset password");
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
                                <h2
                                    className="text-header-signup"
                                    style={{ fontWeight: "bold" }}
                                >
                                    Password Reset
                                </h2>
                                {message && <Alert className="alert-success-signup">{message}</Alert>}
                                {error && (
                                    <Alert className="alert-error-signup">
                                        <p>{error}</p>
                                    </Alert>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email" className="form-group">
                                        <Form.Label className="Form-label-text">
                                            Email
                                            <Form.Control type="email" ref={emailRef} required />
                                        </Form.Label>
                                    </Form.Group>
                                    <Button
                                        disabled={loading}
                                        className="btn-form-submit"
                                        type="submit"
                                    >
                                        {" "}
                                        Reset Password
                                    </Button>
                                </Form>
                                <div className="bottom-text-signup">
                                    <Link
                                        className="link-text-display-signup"
                                        style={{ fontSize: "12px" }}
                                        to="/log-in"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                        <div
                            style={{ color: "var(--primaryBg)" }}
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
