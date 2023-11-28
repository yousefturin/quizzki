import React, { useRef, useState } from "react";
import "../../App.css";
import { Card, Form, Container, Button, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const NameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmlRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmlRef.current.value) {
            return setError("Passwords do not match");
        }
        try {
            setError("");
            setLoading(true);
            await signup(
                emailRef.current.value,
                passwordRef.current.value,
                NameRef.current.value
            );
            navigate("/");
        } catch (error) {
            if (error.message.includes("email address is already in use")) {
                setError(
                    "This email is already in use. Please use a different email address."
                );
            } else {
                // For other errors, you can use a generic message
                setError("Failed to create an account. Please try again later.");
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
                                    Sign Up
                                </h2>
                                {error && (
                                    <Alert className="alert-error-signup">
                                        <p>{error}</p>
                                    </Alert>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="name" className="form-group">
                                        <Form.Label className="Form-lable-text">
                                            Name
                                            <Form.Control type="text" ref={NameRef} required />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group id="email" className="form-group">
                                        <Form.Label className="Form-lable-text">
                                            Email
                                            <Form.Control type="email" ref={emailRef} required />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group id="password" className="form-group">
                                        <Form.Label className="Form-lable-text">
                                            Password
                                            <Form.Control
                                                type="password"
                                                ref={passwordRef}
                                                required
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group id="password-confirm" className="form-group">
                                        <Form.Label className="Form-lable-text">
                                            Password Confirmation
                                            <Form.Control
                                                type="password"
                                                ref={passwordConfirmlRef}
                                                required
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                    <Button
                                        disabled={loading}
                                        className="btn-form-submit"
                                        type="submit"
                                    >
                                        {" "}
                                        Sign Up
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        <div
                            style={{ color: "#fefffe" }}
                            className="under-card-text-signup"
                        >
                            Already have an account?{" "}
                            <Link className="link-text-dispaly-signup" to="/log-in">
                                Log In
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
