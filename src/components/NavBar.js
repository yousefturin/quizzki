/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { REButton } from "./Button";
import "./NavBar.css";
import AppIcon from "./utils/AppIcon";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { logout, currentUser, avatarURL} = useAuth();
  const [error, setError] = useState("");
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();
  // This shit was pain in the ass giving me that a users is already a null so had to do that
  const { displayName, email } = currentUser || {};
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  //   fix the logic of the buttn that on every refresh it shows back
  //   no matter what is the size of thescreen
  useEffect(() => {
    showButton();
  }, []);

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

  const handleLogoutAndCloseMenu = () => {
    closeMobileMenu();
    handleLogout();
  };

  return (
    <>
      <nav className="navbarCST">
        <div className="navbarCST-container">
          <Link to="/" className="navbarCST-logo" onClick={closeMobileMenu}>
            Quizzki
            <AppIcon />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {currentUser && (
              <li className="nav-user-info-item-container-wrapper">
                <Link className="nav-user-info-item-container">
                  <div className="nav-user-image-display-contaier">
                  {/* {avatarURL && <img src={avatarURL} alt="User Avatar" />} */}
                    <div className="nav-user-image-holder"></div>
                  </div>
                  <div className="nav-user-name-email-display-container-wrapper">
                    <div className="nav-user-name-display-contaier">
                      {displayName}
                    </div>
                    <div className="nav-user-email-display-contaier">
                      {email}
                    </div>
                  </div>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/rank-hall"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Rank Hall
              </Link>
            </li>
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
                <div className="menu-active-line-spliter">
                  <hr style={{ width: "40%", height: "2px" }} />
                  <h3 style={{ color: "#fff" }}>Or</h3>
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
            {currentUser !== null && (
              <li className="nav-item">
                <Link className="nav-links" onClick={handleLogoutAndCloseMenu}>
                  Log out
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
          {button && !currentUser && (
          <hr className="nav-menu-line-spliter" />
          )}
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
