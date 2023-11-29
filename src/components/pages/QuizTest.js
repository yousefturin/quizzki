/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import questionsData from "../../db/db_easy_level.json";
import "../../App.css";
import { Card, Container, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Footer from "../Footer";

export default function QuizTest() {
  // State variables to manage game state and user progress
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [userAnswer, setUserAnswer] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [isCorrect, setIsCorrect] = useState(null); // State to track if user's answer is correct
  const [gameOver, setGameOver] = useState(false); // State to track if the game is over

  // Time-related state variables
  const [remainingTime, setRemainingTime] = useState(20); // Remaining time for each question
  const [score, setScore] = useState(0); // User's score
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started
  const [timeUp, setTimeUp] = useState(false); // State variable to track the cause of game over
  
  // Accessing current user information using the useAuth hook
  const { currentUser } = useAuth();
  const { displayName } = currentUser || {};

  // Variable to store the question timer
  let questionTimer;



  //#region getRandomQuestion

  // Function to get a random question and reset relevant states
  const getRandomQuestion = () => {
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
    setRemainingTime(20);
  
    // Add the used question ID to the list
    setUsedQuestionIds((prevIds) => [...prevIds, randomQuestion.id]);
  };
  //#endregion
  

  // //#region asynchronous set remainingTime to 0
  // // Effect to display the "Time's up!" message when the game is over
  // useEffect(() => {
  //   if (gameOver) {
  //     const timeoutId = setTimeout(() => {
  //       setRemainingTime(0); // Ensure remainingTime is set to 0
  //     }, 2000);

  //     // Clear the timeout when the component unmounts or when the game starts again
  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }
  // }, [gameOver]);
  // //#endregion

  //#region asynchronous start timer instent

  // Effect to start the question timer when the game has started or restarted
  useEffect(() => {
    if (gameStarted && !gameOver) {
      questionTimer = setInterval(() => {
        setRemainingTime((prevTime) => {
          const updatedTime = prevTime - 1;

          if (updatedTime === 0) {
            setTimeUp(true); // If the game timer zero set state timer to true for dispalying times up.
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
      setTimeUp(false); // On each question set teh timeUp to false if teh answer is correct
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
    // Store user data after wach restart of teh game
    storeUserData();

    // Resetting relevant states
    getRandomQuestion();
    setGameOver(false);
    setScore(0);

    // Reset TimeUp to false after each restart click so it does not show up even if you click wrong answer.
    setTimeUp(false);

    // Set gameStarted to true to restart the timer
    setGameStarted(true);
  };
  //#endregion

  //#region asynchronous get new Quesetion after component mounts

  // Effect to get a random question when the rendered and inserted into the DOM for first time.
  useEffect(() => {
    console.log("Component mounted");
    getRandomQuestion();
  }, []);
  //#endregion

  //#region send http Post to store teh data
  const storeUserData = async () => {
    try {
      const currentTime = new Date().toLocaleString();
      const response = await axios.post("http://localhost:5000/PostUserData", {
        displayName,
        time: currentTime,
        score,
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
      <div className="contaner-question-wrapper">
        <Container
          className="contaner-question-display"
          style={{ minHeight: "100vh" }}
        >
          <div className="card-question-wrapper">
            <Card>
              <Card.Body>
                <p>
                  {timeUp
                    ? "Time's up!"
                    : isCorrect === false
                      ? "You answered incorrectly."
                      : ""}{" "}
                  Your final score is <strong>{score}</strong>.
                </p>
                <Button onClick={restartGame} className="btn-form-submit">
                  Restart Game
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
      <Footer/>
      </>
    );
  }

  return (
    <>
      {!gameStarted && (
        <div className="contaner-question-wrapper">
          <Container
            className="contaner-question-display"
            style={{ minHeight: "100vh" }}
          >
            <div className="card-question-wrapper">
              <Card>
                <Card.Body>
                  <h2>
                    Welcome! {displayName}{" "}
                    <h6>are you ready to start the game ?</h6>
                  </h2>
                  <Button
                    onClick={handleStartButton}
                    className="btn-form-submit"
                  >
                    Start Game
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </div>
      )}

      {gameStarted && currentQuestion && (
        <div className="contaner-question-wrapper">
          <Container
            className="contaner-question-display"
            style={{ minHeight: "100vh" }}
          >
            <div
              className="card-question-wrapper"
              
            >
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
      <Footer/>
    </>
  );
}
