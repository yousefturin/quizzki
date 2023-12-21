/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import questionsData from "../../db/db_easy_level.json";
import { Card, Container, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useQuiz } from "../../contexts/QuizContext";
import { usePageVisibility } from "react-page-visibility";
import axios from "axios";
import Footer from "../Footer";
import "../App.css";
import { Link, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useNavigation } from "../../contexts/NavigationContext";
import { useButtonState } from "../../contexts/ButtonStateContext";
import ShareButton from "../ShareButton";

export default function QuizTest() {
  const { idTest } = useParams();
  const { selectedCard } = useQuiz();
  const [questionsData, setQuestionsData] = useState([]);
  const { redirectPath, clearNavigation } = useNavigation();

  const { setButtonState } = useButtonState();

  // dynamically importing the location of database for questions
  useEffect(() => {
    const fetchQuestionsData = async () => {
      if (selectedCard?.fileLocation) {
        try {
          const module = await import(`../../db/${selectedCard.fileLocation}`);
          if (module && module.default && module.default.questions) {
            setQuestionsData(module.default);
          } else {
            console.error("Invalid questions data structure");
          }
        } catch (error) {
          console.error("Error loading questions data:", error);
        }
      }
    };

    fetchQuestionsData();
  }, [selectedCard]);

  // State variables to manage game state and user progress
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [userAnswer, setUserAnswer] = useState(null);

  const [isCorrect, setIsCorrect] = useState(null); // State to track if user's answer is correct
  const [gameOver, setGameOver] = useState(false); // State to track if the game is over
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started

  // Time-related state variables
  const [remainingTime, setRemainingTime] = useState(3000000000); // Remaining time for each question
  const [score, setScore] = useState(0); // User's score
  const [timeUp, setTimeUp] = useState(false); // State variable to track the cause of game over
  const [tabOpened, setTabOpened] = useState(false); // State variable to track if the user onend a tab in teh browser

  // Accessing current user information using the useAuth hook
  const { currentUser } = useAuth();
  const { displayName, email } = currentUser || {};

  const [urlSpan, setUrlSpan] = useState(null);
  // Variable to store the question timer
  let questionTimer;

  const isPageVisible = usePageVisibility();

  // Effect to check if the user playing the view port on the background
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isPageVisible && gameStarted) {
        // Without the start of teh game the GameOver will be shown even if the game did not start.
        setTabOpened(true); // Set the state variable to True so it indicate a tab onend
        setGameOver(true); // Set the state variable to True so it triggers teh game over
        clearInterval(questionTimer);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPageVisible]);

  //#region getRandomQuestion
  // Function to get a random question and reset relevant states
  const getRandomQuestion = () => {
    // Check if the questions are mounted
    if (questionsData.questions) {
      // Check if all questions have been used
      let availableQuestions = questionsData.questions.filter(
        (question) => !usedQuestionIds.includes(question.id)
      );

      // If all questions have been used, reset the used question IDs
      if (availableQuestions.length === 0) {
        setUsedQuestionIds([]);
        availableQuestions = questionsData.questions; // Reset available questions
      }

      // Select a random question from the available ones
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const randomQuestion = availableQuestions[randomIndex];

      // Update state variables
      setCurrentQuestion(randomQuestion);
      setUserAnswer(null);
      setIsCorrect(null);
      setRemainingTime(30000000);

      // Add the used question ID to the list    ***The number of added id is getting to more 6 zeros which may have effect on performance
      setUsedQuestionIds((prevIds) => [...prevIds, randomQuestion.id]);
    }
  };
  //#endregion

  //#region asynchronous start timer instant
  // Effect to start the question timer when the game has started or restarted
  useEffect(() => {
    if (gameStarted && !gameOver) {
      questionTimer = setInterval(() => {
        setRemainingTime((prevTime) => {
          const updatedTime = prevTime - 1;

          if (updatedTime === 0) {
            setTimeUp(true); // If the game timer zero set state timer to true for displaying times up.
            setGameOver(true);
            clearInterval(questionTimer); // Clear the timer when time is up
          }
          return updatedTime;
        });
      }, 1000);

      // Clear the timer when the component unmounts or when the game ends
      return () => {
        clearInterval(questionTimer);
      };
    }
  }, [gameStarted, gameOver]);

  //#endregion

  //#region handleUserSelection
  // Function to handle user's selection of an answer option
  const handleUserSelection = (selectedOption) => {
    const isAnswerCorrect = selectedOption === currentQuestion.answer;

    setUserAnswer(selectedOption);
    setIsCorrect(isAnswerCorrect);

    // Update score and get a new question based on correctness of the answer
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
      setTimeUp(false); // On each question set the timeUp to false if the answer is correct
      getRandomQuestion();
    } else {
      // End the game if the answer is incorrect
      setGameOver(true);
      clearInterval(questionTimer);
    }
  };
  //#endregion

  //#region startGame
  // Function to handle the start button click, initiating the game
  const handleStartButton = () => {
    setGameStarted(true);
    getRandomQuestion();
    // clearNavigation();
  };
  //#endregion

  //#region restartGame
  // Function to restart the game, resetting relevant states
  const restartGame = () => {
    clearInterval(questionTimer);
    setTabOpened(false); // Resetting open tabs state to false
    // storeUserData(); // Store user data after restart of the game

    // Resetting relevant states
    getRandomQuestion();
    setGameOver(false);
    setScore(0);

    setTimeUp(false); // Reset TimeUp to false after each restart click so it does not show up even if you click wrong answer.

    setGameStarted(true); // Set gameStarted to true to restart the timer
  };
  //#endregion
  const handleReadRulesButton = () => {
    setButtonState(true);
  };
  //#region asynchronous get new Question after component mounts
  // Effect to get a random question when the rendered and inserted into the DOM for first time.
  useEffect(() => {
    console.log("Component mounted");
    getRandomQuestion();
    const displayTimer = setInterval(() => {
      clearNavigation();
    }, 100000);
    return () => {
      clearInterval(displayTimer);
    };
  }, []);
  //#endregion

  //#region asynchronous Post the data to the API end point
  // Effect to Post user data after each time a gameOver is triggered
  useEffect(() => {
    if (gameOver) {
      storeUserData();
      storeUserDataInURL(displayName, score, idTest);
    }
  }, [gameStarted, gameOver]);

  //#region send http Post to store teh data
  const storeUserData = async () => {
    try {
      const currentTime = new Date().toLocaleString();
      const apiUrl =
        "https://quizzkiapi-quizzki.onrender.com/v0/api/Quizzki/PostUserData";
      const apiKey = "4111ad3f15115c1a4c60c3c0e73abdbbbffb435b";
      await axios.post(
        apiUrl,
        {
          displayName,
          time: currentTime,
          score,
          email,
        },
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      // console.log(response.data);
    } catch (error) {
      console.error("Error storing user data", error);
    }
  };
  //#endregion

  // Encrypt function
  const encryptData = (data) => {
    const encrypted = CryptoJS.AES.encrypt(
      data,
      "6d846aa20bfa240f7000b4b616de5d77c30fb268"
    );
    return encrypted.toString();
  };

  // Function to store user data in URL parameters to be accessed as share score on gameOver events
  const storeUserDataInURL = (displayName, score, idTest) => {
    console.log(" this is inside the game quiz:idTest", idTest.toString());
    // Encrypt data before constructing the URL
    // Displayed Name is already string but incase there is no restrictions
    // on username input it is converted to string, the score needs to be converted since CryptoJS only accept string format
    const encryptedDisplayName = encryptData(displayName.toString());
    const encryptedScore = encryptData(score.toString());
    const encryptedIdTest = encryptData(idTest.toString());
    const root = window.location.origin;
    const queryParams = `?displayName=${encodeURIComponent(
      encryptedDisplayName
    )}&score=${encodeURIComponent(encryptedScore)}&idTest=${encodeURIComponent(
      encryptedIdTest
    )}`;
    const url = `${root}/records/score/${queryParams}`;
    setUrlSpan(url);
    console.log(url);
  };
  const [showContainer, setShowContainer] = useState(false);
  const handleShareContainer = () => {
    setShowContainer(!showContainer);
  };
  const handleCopyText = () => {
    try {
      navigator.clipboard.writeText(urlSpan);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Unable to copy text to clipboard", err);
    }
  };



  if (gameOver) {
    return (
      <>
        <div className="container-question-wrapper">
          <Container
            className="container-question-display"
            style={{ minHeight: "92vh" }}
          >
            <div className="card-question-wrapper">
              <Card
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                <Card.Body>
                  <div className="wrapper-start-container">
                    <h1 style={{ alignSelf: "flex-start" }}>
                      {timeUp
                        ? "Time's up!"
                        : isCorrect === false
                        ? "You answered incorrectly."
                        : tabOpened
                        ? "Ops You are cheating!"
                        : ""}{" "}
                    </h1>
                    <img
                      src="/images/image-restart-1.svg"
                      alt="Rules illustration"
                      className="image-Rules-controller"
                    />
                    <p>
                      Your final score is <strong>{score}</strong>.
                    </p>
                  </div>

                  <Button onClick={restartGame} className="btn-form-submit">
                    Restart Game
                  </Button>
                  <div
                    className="btn-mobile"
                    style={{
                      display: "flex",
                      gap: "5px",
                      textDecoration: "none",
                    }}
                  >
                    <Link to="/quiz-test" style={{ flex: "4" }}>
                      <Button className="btn-form-submit-second">
                        <i class="fas fa-arrow-circle-left"></i> Back
                      </Button>
                    </Link>
                    {/* Need to find a new state for removing the share when cheating,
                    now if i answered incorrectly and then opened a tab it will hide the share as well */}
                    {!tabOpened  &&
                      <Button
                      onClick={handleShareContainer}
                      className="btn-form-submit-second"
                      style={{ flex: "0.5" }}
                    >
                      <i class="fas fa-share-alt-square"></i>
                    </Button>
                    }
                  </div>
                </Card.Body>
                {isCorrect === false && (
                  <>
                    <hr />
                    <Card.Body className="card-body-question-gameOver">
                      <div className="question-wrapper-gameOver">
                        <h3 style={{ fontSize: "1rem", color: "#4b4b4b" }}>
                          {currentQuestion.question}
                        </h3>
                      </div>

                      <ul className="questions-grid">
                        {currentQuestion.options.map((option, index) => (
                          <li key={index}>
                            <Button
                              className="btn-question-submit"
                              disabled={userAnswer !== null}
                              style={{
                                marginTop: 0,
                                textAlign: "left",
                                fontSize: "11px",
                                background:
                                  option === currentQuestion.answer
                                    ? "var( --successBg)"
                                    : "#bfbcbc",
                                color:
                                  option === currentQuestion.answer
                                    ? "white"
                                    : "#676666",
                                cursor: "default",
                              }}
                            >
                              {option}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </>
                )}
              </Card>
            </div>
            {showContainer && (
              <div className="share-container-backdrop">
                <div
                  className="share-container-backdrop-trigger"
                  onClick={handleShareContainer}
                ></div>
                <div className="share-container-disable">
                  <div className="wrapper-share-container">
                    <Button
                      onClick={handleShareContainer}
                      className="btn-form-submit-second"
                      style={{
                        width: "2rem",
                        marginTop: "0rem",
                        fontSize: "var(--fontXSmall)",
                        height: "2rem",
                        border: "2px none",
                        padding: "0",
                      }}
                    >
                      <i class="fas fa-times-circle"></i>
                    </Button>
                    <h4 style={{ width: "100%" }}>Share</h4>
                  </div>
                  <hr
                    style={{ borderColor: "#dfdede", borderTop: "1px #dfdede" }}
                  />
                  <div className="social-card-container">
                    <div className="social-card-wrapper">
                      <ShareButton platform="facebook" url={urlSpan} iconPath="/images/image-social-share-facebook.svg"  />
                      <ShareButton platform="twitter" url={urlSpan} iconPath="/images/image-social-share-twitter.svg"  />
                      <ShareButton platform="linkedIn" url={urlSpan} iconPath="/images/image-social-share-linkedIn.svg"  />
                      <ShareButton platform="vk" url={urlSpan} iconPath="/images/image-social-share-vk.svg"  />
                      <ShareButton platform="reddit" url={urlSpan} iconPath="/images/image-social-share-reddit.svg"  />
                    </div>
                  </div>
                  <div className="share-url-holder">
                    <span
                      style={{
                        flex: "1",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {urlSpan}
                    </span>
                    <Button
                      onClick={handleCopyText}
                      className="btn-form-submit-second"
                      style={{
                        width: "3rem",
                        marginTop: "0rem",
                        fontSize: "var(--fontXSmall)",
                        height: "2rem",
                        border: "4px none",
                        padding: "0",
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {!gameStarted && (
        <div className="container-question-wrapper">
          <Container
            className="container-question-display"
            style={{ minHeight: "92vh" }}
          >
            <div className="card-question-wrapper">
              <Card>
                <Card.Body>
                  <div className="wrapper-start-container">
                    <h1 style={{ alignSelf: "flex-start" }}>
                      Welcome! {displayName}{" "}
                    </h1>
                    {redirectPath ? (
                      <h4 style={{ alignSelf: "flex-start" }}>
                        are you ready to compete and beat their score! in{" "}
                        {idTest} game ?
                      </h4>
                    ) : (
                      <h4 style={{ alignSelf: "flex-start" }}>
                        are you ready to start the {idTest} game ?
                      </h4>
                    )}

                    <img
                      src="/images/image-start-1.svg"
                      alt="Rules illustration"
                      className="image-Rules-controller"
                    />
                  </div>

                  <Button
                    onClick={handleStartButton}
                    className="btn-form-submit"
                  >
                    Start Game
                  </Button>
                  <Link
                    onClick={handleReadRulesButton}
                    to="/information/how-to-play"
                    className="btn-link-secondary"
                  >
                    Read Rules
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </div>
      )}

      {gameStarted && currentQuestion && (
        <div className="container-question-wrapper">
          <Container
            className="container-question-display"
            style={{ minHeight: "92vh" }}
          >
            <div className="card-question-wrapper">
              <Card>
                <Card.Body className="card-body-question">
                  <div>
                    <div className="timer-wrapper">
                      <div className="timer">
                        <span>{remainingTime}</span>
                      </div>
                    </div>
                    <div className="question-wrapper">
                      <h3>{currentQuestion.question}</h3>
                    </div>
                  </div>
                  <ul className="questions-grid">
                    {currentQuestion.options.map((option, index) => (
                      <li key={index}>
                        <Button
                          onClick={() => handleUserSelection(option)}
                          disabled={userAnswer !== null}
                          className="btn-question-submit"
                          style={{ textAlign: "left" }}
                        >
                          {option}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </div>
      )}
      <Footer />
    </>
  );
}
