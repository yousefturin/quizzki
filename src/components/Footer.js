import React from "react";
import { REButton } from "./Button";
import "./Footer.css";
import { Link } from "react-router-dom";
import AppIcon from "./utils/AppIcon";

function Footer() {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join the Community newsletter to receive our best methods of
                    encryption.
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                        <input
                            className="footer-input"
                            name="email"
                            type="email"
                            placeholder="Your Email"
                        />
                        <REButton buttonStyle="btn--outline">Subscribe</REButton>
                    </form>
                </div>
            </section>
            <div class="footer-links">
                <div className="footer-link-wrapper">
                    <div class="footer-link-items">
                        <h2>Company</h2>
                        <Link to="/company/about-us">About Us</Link>
                        <Link to="/company/legal">Legal</Link>
                        <Link to="/">Careers</Link>
                        <Link to="/">Terms & Conditions</Link>
                        <Link to="/">Terms of Service</Link>
                    </div>
                    <div class="footer-link-items">
                        <h2>Contact Us</h2>
                        <Link to="/">Contact</Link>
                        <Link to="/">Support</Link>
                        <Link to="/">Advertise with us</Link>
                        <Link to="/">Apply for Mentor</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div class="footer-link-items">
                        <h2>Social Media</h2>
                        <Link
                            to="https://www.instagram.com/yusefturin/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </Link>
                        <Link
                            to="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Facebook
                        </Link>
                        <Link
                            to="https://www.youtube.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Youtube
                        </Link>
                        <Link
                            to="https://twitter.com/yusefturin"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Twitter
                        </Link>
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to="/" className="social-logo">
                            Quizzki   <AppIcon/>
                        </Link>
                    </div>
                    <small className="website-rights">
                        Quizzki &copy; {getCurrentYear()}{" "}
                    </small>
                    <div className="social-icons">
                        <Link
                            class="social-icon-link facebook"
                            to="https://www.facebook.com/"
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <i class="fab fa-facebook-f" />
                        </Link>
                        <Link
                            class="social-icon-link instagram"
                            to="https://www.instagram.com/yusefturin/"
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <i class="fab fa-instagram" />
                        </Link>
                        <Link
                            class="social-icon-link youtube"
                            to="https://www.youtube.com/"
                            target="_blank"
                            aria-label="Youtube"
                        >
                            <i class="fab fa-youtube" />
                        </Link>
                        <Link
                            class="social-icon-link twitter"
                            to="https://twitter.com/yusefturin"
                            target="_blank"
                            aria-label="Twitter"
                        >
                            <i class="fab fa-twitter" />
                        </Link>
                        <Link
                            class="social-icon-link twitter"
                            to="https://www.linkedin.com/in/yusef-rayyan-j1999/"
                            target="_blank"
                            aria-label="LinkedIn"
                        >
                            <i class="fab fa-linkedin" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;
