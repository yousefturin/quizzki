import React from "react";
import { Link } from "react-router-dom";
import "../Error.css";

function Error() {
  return (
    <>
      <section className="page-404">
          <h1 className="page-404-text-header">404</h1>
          <div className="page-404-background-bg"></div>
          <div className="page-404-content-box">
            <h3>Look like you're lost</h3>
            <p>the page you are looking for not available!</p>
            <div className="page-404-link-wrapper">
              <Link to="/" className="link-404">
                Go to Home
              </Link>
            </div>
          </div>
      </section>
    </>
  );
}

export default Error;
