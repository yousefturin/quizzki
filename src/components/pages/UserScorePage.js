import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigation } from "../../contexts/NavigationContext";

// Decrypt function
const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(
        encryptedData,
        "6d846aa20bfa240f7000b4b616de5d77c30fb268"
    );
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
};

const UserScorePage = () => {
    const location = useLocation();
    const urlParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    
    const { setNavigation } = useNavigation();
    
    const navigate = useNavigate();
    // Decrypt data
    const decryptedDisplayName = decryptData(urlParams.get("displayName"));
    const decryptedScore = decryptData(urlParams.get("score"));
    const decryptedIdTest = decryptData(urlParams.get("idTest"));



    useEffect(() => {
        // ***This shit must work correctly as the documentation says, and as CGPT,
        // but i keep getting RunTime error when changing the expectedParams in the browser URL

        // ***When i user is logged in and clicks the container of his 
        // account image it again gives the runtime error with salt error
        const expectedParams = ["displayName", "score", "idTest"];
        console.log("shit iam here")
        // Check if all expected parameters are present in the URL
        const urlParamNames = Array.from(urlParams.keys());
        const missingParams = expectedParams.filter(param => !urlParamNames.includes(param));
    
        // Check if decrypted data is valid
        if (missingParams.length > 0 || !decryptedDisplayName || !decryptedScore || !decryptedIdTest) {
            console.error("Invalid decrypted data or missing parameters. Redirecting to the error page.");
            navigate("/error"); // Redirect to the error page
        } else {
            console.log("Decrypted Display Name:", decryptedDisplayName);
            console.log("Decrypted Score:", decryptedScore);
            console.log("Decrypted idTest:", decryptedIdTest);
        }
            // Log values for debugging
            console.log("urlParams:", urlParamNames);
            // Cleanup function
            return () => {
                clearInterval(decryptedDisplayName, decryptedScore, decryptedIdTest, urlParams);
        };
    }, [decryptedDisplayName, decryptedScore, decryptedIdTest, navigate, urlParams]);


    async function handleCompetition() {
        // In normal way first navigation must be to log-in || sign-up but the app is wrapped in
        // AuthProvider which does not allow user to access any page without login, so to navigate to needed URL is enough to trigger AuthProvider
    try {
        setNavigation(`/quiz-test/${decryptedIdTest}`);
        navigate(`/quiz-test/${decryptedIdTest}`);
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
                                Hey, you! <br /> <strong style={{color:"var(--primaryDarkBg)"}} >{decryptedDisplayName.toLowerCase()} </strong> scored an impressive <strong style={{color:"var(--primaryDarkBg)"}} >{decryptedScore}</strong>
                                    {" "}in the <strong style={{color:"var(--primaryDarkBg)"}} >{decryptedIdTest}</strong> category! 
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
};

export default UserScorePage;
