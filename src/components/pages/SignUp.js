import React, { useRef, useState } from "react";
import { Card, Form, Container, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useNavigation } from "../../contexts/NavigationContext";

export default function SignUp() {
    const NameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { redirectPath } = useNavigation();
    // const [avatarRef, setAvatarRef] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }
        try {
            // Generate a random text to get a seed for the api to place an image
            const randomSeed = Math.random().toString(36).substring(7);


            setError("");
            setLoading(true);
            await signup(
                emailRef.current.value,
                passwordRef.current.value,
                NameRef.current.value,
                randomSeed
            );
            if (redirectPath){
                navigate(redirectPath);
            }else{
                navigate("/");
            }
            
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
                                        Sign Up
                                    </h2>
                                    <img
                                        src="/images/image-signup-1.svg"
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
                                    <Form.Group id="name" className="form-group">
                                        <Form.Label className="Form-label-text">
                                            Name
                                            <Form.Control type="text" ref={NameRef} required />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group id="email" className="form-group">
                                        <Form.Label className="Form-label-text">
                                            Email
                                            <Form.Control type="email" ref={emailRef} required />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group id="password" className="form-group">
                                        <Form.Label className="Form-label-text">
                                            Password
                                            <Form.Control
                                                type="password"
                                                ref={passwordRef}
                                                required
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group id="password-confirm" className="form-group">
                                        <Form.Label className="Form-label-text">
                                            Password Confirmation
                                            <Form.Control
                                                type="password"
                                                ref={passwordConfirmRef}
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
                            style={{ color: "var(--primaryBg)" }}
                            className="under-card-text-signup"
                        >
                            Already have an account?{" "}
                            <Link className="link-text-display-signup" to="/log-in">
                                Log In
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
