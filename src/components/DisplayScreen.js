import React from "react";
import "../App.css";
import { REButton } from "./Button";
import "./DisplayScreen.css";
import { Link } from "react-router-dom";

function DisplayScreen() {
    return (
        <div className="dispaly-container">
            <div class="gradient-background">
                <div class="gradient"></div>
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
                        <i class="far fa-arrow-alt-circle-right" />
                    </REButton>
                </Link>
            </div>
        </div>
    );
}

export default DisplayScreen;
