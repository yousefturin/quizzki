import React, { useRef, useState, useEffect } from "react";
import { Card, Form, Container, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Profile() {
  const NameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [avatarSVG, setAvatarSVG] = useState("");
  const navigate = useNavigate();
  const { photoURL, } = currentUser || {};

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    // Check if the update email is !== to current email if true place the updateEmail to array promises
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const handleInputChange = () => {
    // Check if any of the input values are different from their original values
    const isChanged =
      NameRef.current.value !== currentUser.displayName ||
      emailRef.current.value !== currentUser.email ||
      passwordRef.current.value !== "" || // Assuming an empty password input means no change
      passwordConfirmRef.current.value !== ""; // Assuming an empty password confirmation input means no change

    setIsFormChanged(isChanged);
  };

  useEffect(() => {
    const nameInput = NameRef.current;
    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;
    const passwordConfirmInput = passwordConfirmRef.current;

    // Attach the change event listener to each input field
    nameInput.addEventListener('input', handleInputChange);
    emailInput.addEventListener('input', handleInputChange);
    passwordInput.addEventListener('input', handleInputChange);
    passwordConfirmInput.addEventListener('input', handleInputChange);

    // Clean up the event listeners when the component unmounts
    return () => {
      nameInput.removeEventListener('input', handleInputChange);
      emailInput.removeEventListener('input', handleInputChange);
      passwordInput.removeEventListener('input', handleInputChange);
      passwordConfirmInput.removeEventListener('input', handleInputChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.displayName, currentUser.email]);
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        // Fetch the SVG content from the API
        const response = await fetch(
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${photoURL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch avatar");
        }

        // Get the SVG content as text
        const svgContent = await response.text();

        // Add width and height attributes to the SVG content

        // Set the SVG content in the state
        setAvatarSVG(svgContent);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    // Call the fetchAvatar function when the component mounts
    fetchAvatar();
  }, [photoURL]);

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
                    Profile
                  </h2>
                  <div className="nav-user-image-display-container">
                    <div className="nav-user-image-holder" style={{marginBlock:"2rem"}}>
                      <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(
                          avatarSVG
                        )}`}
                        alt="User Avatar"
                        className="image-profile-size-controller"
                      />
                    </div>
                  </div>
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
                      <Form.Control
                        type="text"
                        ref={NameRef}
                        disabled
                        defaultValue={currentUser.displayName}
                      />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group id="email" className="form-group">
                    <Form.Label className="Form-label-text">
                      Email
                      <Form.Control
                        type="email"
                        ref={emailRef}
                        defaultValue={currentUser.email}
                      />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group id="password" className="form-group">
                    <Form.Label className="Form-label-text">
                      Password
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        placeholder="Leave blank to keep the same"
                      />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group id="password-confirm" className="form-group">
                    <Form.Label className="Form-label-text">
                      Password Confirmation
                      <Form.Control
                        type="password"
                        ref={passwordConfirmRef}
                        placeholder="Leave blank to keep the same"
                      />
                    </Form.Label>
                  </Form.Group>
                  <Button
                    disabled={loading || !isFormChanged}
                    className="btn-form-submit"
                    type="submit"
                    style={{
                        backgroundColor:!isFormChanged?"gray": "#663399",
                    }}
                  >
                    {" "}
                    Update Profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div
              style={{ color: "#fefffe" }}
              className="under-card-text-signup"
            >
              <Link className="link-text-display-signup" to="/">
                Cancel{" "}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
