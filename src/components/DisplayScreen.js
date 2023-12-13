import React from "react";
import { REButton } from "./Button";
import { Link } from "react-router-dom";
import "./App.css";
import "./DisplayScreen.css";

function DisplayScreen() {
    return (
        <div className="display-container">
            <div className="gradient-background">
                <div className="gradient"></div>
            </div>

            <h1> Quizzki</h1>
            <p>Test your knowledge!</p>
            <div className="display-btns">
                <Link to="/quiz-test" className="btn-mobile">
                    <REButton
                        className="btns"
                        buttonStyle="btn--outline"
                        buttonSize="btn--large"
                    >
                        GET STARTED
                    </REButton>
                </Link>
                <Link to="/information/how-to-play" className="btn-mobile">
                    <REButton
                        className="btns"
                        buttonStyle="btn--primary"
                        buttonSize="btn--large"
                    >
                        READ MORE
                        <i className="far fa-arrow-alt-circle-right" />
                    </REButton>
                </Link>
            </div>
        </div>
    );
}

export default DisplayScreen;
