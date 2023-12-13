/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import questionsData from "../../db/db_easy_level.json";
import { Card, Container, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useQuiz  } from "../../contexts/QuizContext";
import { usePageVisibility } from "react-page-visibility";
import axios from "axios";
import Footer from "../Footer";
import "../App.css";
import { Link, useParams } from 'react-router-dom';


export default function QuizTest() {

  const { idTest } = useParams();
  const { selectedCard } = useQuiz();
  const [questionsData, setQuestionsData] = useState([]);

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

  //#region asynchronous get new Question after component mounts
  // Effect to get a random question when the rendered and inserted into the DOM for first time.
  useEffect(() => {
    console.log("Component mounted");
    getRandomQuestion();
  }, []);
  //#endregion

  //#region asynchronous Post the data to the API end point
  // Effect to Post user data after each time a gameOver is triggered
  useEffect(() => {
    if (gameOver) {
      storeUserData();
    }
  }, [gameStarted, gameOver]);

  //#region send http Post to store teh data
  const storeUserData = async () => {
    try {
      const currentTime = new Date().toLocaleString();
      const apiUrl = "https://quizzkiapi-quizzki.onrender.com/v0/api/Quizzki/PostUserData";
      const apiKey = "4111ad3f15115c1a4c60c3c0e73abdbbbffb435b"; 
      const response = await axios.post(apiUrl, {
        displayName,
        time: currentTime,
        score,
        email
      }, {
        headers: {
          "x-api-key": apiKey,
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error("Error storing user data", error);
    }
  };
  //#endregion

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
                  <Link to="/quiz-test" className="btn-mobile">
                    <Button className="btn-form-submit-second"
                    >
                        Back to main
                    </Button>
                </Link>
                </Card.Body>
                {isCorrect === false && (
                  <>
                    <hr />
                    <Card.Body className="card-body-question">
                      <div className="question-wrapper">
                        <h3 style={{fontSize:"1rem"}}>{currentQuestion.question}</h3>
                      </div>

                      <ul className="questions-grid">
                        {currentQuestion.options.map((option, index) => (
                          <li key={index}>
                            <Button
                              className="btn-question-submit"
                              disabled={userAnswer !== null}
                              style={{
                                marginTop:0,
                                textAlign: "left",
                                fontSize: "11px",
                                background:
                                  option === currentQuestion.answer
                                    ? "#663399"
                                    : "gray",
                                color:
                                  option === currentQuestion.answer
                                    ? "white"
                                    : "black",
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
                    <h4 style={{ alignSelf: "flex-start" }}>
                      are you ready to start the {idTest} game ?
                    </h4>
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
                  <Link to="/information/how-to-play" className="btn-link-secondary">
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
