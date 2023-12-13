/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { REButton } from "./Button";
import AppIcon from "./utils/AppIcon";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { logout, currentUser } = useAuth();
  const [avatarSVG, setAvatarSVG] = useState(""); // State to store the user's image URL
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [extendedContainer, setExtendedContainer] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  // This shit was pain in the ass giving me that a users is already a null so had to do that
  const { displayName, email, photoURL, uid } = currentUser || {};

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  //   fix the logic of the button that on every refresh it shows back
  //   no matter what is the size of the screen
  useEffect(() => {
    showButton();
  }, []);

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

        // Set the SVG content in the state
        setAvatarSVG(svgContent);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    // Call the fetchAvatar function when the component mounts
    fetchAvatar();
  }, [photoURL]);

  window.addEventListener("resize", showButton);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/log-in");
    } catch {
      setError("Failed to log out");
    }
  }

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const handleContainer = () => setExtendedContainer(!extendedContainer);

  // when closing the menu with button the container will be closed
  const handleContainerClick = () => {
    setExtendedContainer(false);
    handleClick();
  };
  // when logging out the menu will close then the logo out will be handled
  const handleLogoutAndCloseMenu = () => {
    closeMobileMenu();
    handleLogout();
  };

  // when cancel and open the Menu back the container will be closed.
  const handleContainerCloseMobileMenu = () => {
    closeMobileMenu();
    setShowBlock(false);
  };

  useEffect(() => {
    if (currentUser !== null && extendedContainer) {
      setShowBlock(true);
    } else {
      setShowBlock(false);
    }
  }, [currentUser, extendedContainer]);

  return (
    <>
      <nav className="navbarCST">
        <div className="navbarCST-container">
          <Link to="/" className="navbarCST-logo" onClick={closeMobileMenu}>
            Quizzki
            <AppIcon />
          </Link>
          <div className="menu-icon" onClick={handleContainerClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul
            className={click ? "nav-menu active" : "nav-menu"}
            style={{ width: currentUser ? "75vw" : "50vw" }}
          >
            {currentUser && (
              <li
                className={
                  extendedContainer
                    ? "nav-user-info-item-container-wrapper active"
                    : "nav-user-info-item-container-wrapper"
                }
                style={{ transition: "all 1s ease" }}
              >
                <Link
                  className="nav-user-info-item-container"
                  onClick={handleContainer}
                >
                  <div className="nav-user-image-display-container">
                    <div className="nav-user-image-holder">
                      <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(
                          avatarSVG
                        )}`}
                        alt="User Avatar"
                        className="image-size-controller"
                      />
                    </div>
                  </div>
                  <div
                    className={
                      extendedContainer
                        ? "nav-user-name-email-display-container-wrapper active"
                        : "nav-user-name-email-display-container-wrapper"
                    }
                    style={{ transition: "all 1s ease" }}
                  >
                    <div>
                      <div className="nav-user-name-display-container">
                        {displayName}
                      </div>
                      <div className="nav-user-email-display-container">
                        {email}
                      </div>
                    </div>
                    {showBlock && (
                      <>
                        <hr className="horizontal-line-separator" />

                        <li className="nav-item-user">
                          <Link
                            className="nav-links"
                            to={`/users/${uid}`}
                            onClick={handleContainerCloseMobileMenu}
                          >
                            Profile
                          </Link>
                        </li>
                      </>
                    )}
                    {showBlock && (
                      <li className="nav-item-user">
                        <Link
                          className="nav-links"
                          onClick={handleLogoutAndCloseMenu}
                        >
                          Log out
                        </Link>
                      </li>
                    )}
                  </div>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                to="/quiz-test"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Games
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                to="/rank-hall"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Rank Hall
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                to="/information/how-to-play"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Game Rules
              </Link>
            </li> */}
            {currentUser ? null : (
              <li className="nav-item">
                <Link
                  to="/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            )}
            {currentUser ? null : (
              <li>
                <div className="menu-active-line-splitter">
                  <hr style={{ width: "40%", height: "2px" }} />
                  <h3 style={{ color: "var(--primary)" }}>Or</h3>
                  <hr style={{ width: "40%", height: "2px" }} />
                </div>
              </li>
            )}
            {currentUser ? null : (
              <li className="nav-item">
                <Link
                  to="/log-in"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
              </li>
            )}
          </ul>
          {button && !currentUser && (
            <Link to="/sign-up" style={{ paddingRight: "10px" }}>
              {" "}
              <REButton buttonStyle="btn--outline">SIGN UP</REButton>
            </Link>
          )}
          {button && !currentUser && <hr className="nav-menu-line-splitter" />}
          {button && !currentUser && (
            <Link to="/log-in">
              {" "}
              <REButton buttonStyle="btn--outline">LOG IN</REButton>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
