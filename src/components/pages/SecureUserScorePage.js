import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigation } from "../../contexts/NavigationContext";
import { useRedirect } from "../../contexts/RedirectContext";

function SecureUserScorePage() {

    const { setNavigation } = useNavigation();
    const navigate = useNavigate();
    const { userNameRe, userScoreRe, userCategoryRe, clearRedirectedParams }= useRedirect();


    async function handleCompetition() {
        // In normal way first navigation must be to log-in || sign-up but the app is wrapped in
        // AuthProvider which does not allow user to access any page without login, so to navigate to needed URL is enough to trigger AuthProvider
    try {
        setNavigation(`/quiz-test/${userCategoryRe}`);
        navigate(`/quiz-test/${userCategoryRe}`);
        //clean the values from last redirection
        clearRedirectedParams();
    } catch (error) {
        // Handle signup errors here
        console.error("Signup error:", error);
    }
    }

    return (
        <div className="container-question-wrapper">
            <Container
                className="container-question-display"
                style={{ minHeight: "92vh" }}
            >
                <div className="card-question-wrapper">
                    <Card>
                        <Card.Body>
                            <div className="wrapper-start-container">
                                <h1 style={{ alignSelf: "flex-start",textAlign:"left" ,fontWeight:"100" ,color:"#4A4A4A"}}>
                                Hey, you! <br /> <strong style={{color:"var(--primaryDarkBg)"}} >{userNameRe.toLowerCase()} </strong> scored an impressive <strong style={{color:"var(--primaryDarkBg)"}} >{userScoreRe}</strong>
                                    {" "}in the <strong style={{color:"var(--primaryDarkBg)"}} >{userCategoryRe}</strong> category! 
                                </h1>
                                <h4 style={{ alignSelf: "flex-start",marginTop:"1.125rem" }}>
                                What about a friendly
                                    competition? Try to beat their score!
                                </h4>
                                <img
                                    src="/images/image-winner-2.svg"
                                    alt="Rules illustration"
                                    className="image-winner-controller"
                                />
                            </div>

                            <Button
                                onClick={handleCompetition}
                                className="btn-form-submit"
                            >
                                Start competition
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default SecureUserScorePage
