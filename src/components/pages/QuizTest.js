/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import questionsData from "../../db/db_easy_level.json";
import "../../App.css";
import { Card, Container, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

export default function QuizTest() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  
  const [remainingTime, setRemainingTime] = useState(20);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const{currentUser} =useAuth();
  const { displayName } = currentUser || {};


  let questionTimer;

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(
      Math.random() * questionsData.questions.length
    );
    setCurrentQuestion(questionsData.questions[randomIndex]);
    setUserAnswer(null);
    setIsCorrect(null);
    setRemainingTime(20);
  };

  useEffect(() => {
    if (gameStarted) {
      questionTimer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            setGameOver(true);
            clearInterval(questionTimer);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(questionTimer);
    };
  }, [gameStarted]);

  const handleUserSelection = (selectedOption) => {
    const isAnswerCorrect = selectedOption === currentQuestion.answer;

    setUserAnswer(selectedOption);
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
      getRandomQuestion();
    } else {
      setGameOver(true);
      clearInterval(questionTimer);
    }
  };

  const restartGame = () => {
    getRandomQuestion();
    setGameOver(false);
    setScore(0);
  };

  const handleStartButton = () => {
    setGameStarted(true);
    getRandomQuestion();
  };

  useEffect(() => {
    getRandomQuestion();
  }, []);




  if (gameOver) {
    return (
      <div className="contaner-signup-wrapper">
        <Container
          className="contaner-signup-display"
          style={{ minHeight: "100vh" }}
        >
          <div className="card-signup-wrapper" style={{ maxWidth: "600px" }}>
            <Card>
              <Card.Body>
                <p>
                  {remainingTime === 0
                    ? "Time's up!"
                    : "You answered incorrectly."}{" "}
                  Your final score is {score}.
                </p>
                <Button onClick={restartGame} className="btn-form-submit">
                  Restart Game
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      {!gameStarted && (
        <div className="contaner-signup-wrapper">
          <Container
            className="contaner-signup-display"
            style={{ minHeight: "100vh" }}
          >
            <div className="card-signup-wrapper" style={{ maxWidth: "600px" }}>
              <Card>
                <Card.Body>
                <h2>Welcome! {displayName}  <h6>are you ready to start the game ?</h6></h2>
                  <Button onClick={handleStartButton} className="btn-form-submit">
                    Start Game
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </div>
      )}

      {gameStarted && currentQuestion && (
        <div className="contaner-signup-wrapper">
          <Container
            className="contaner-signup-display"
            style={{ minHeight: "100vh" }}
          >
            <div className="card-signup-wrapper" style={{ maxWidth: "600px" }}>
              <Card>
                <Card.Body>
                  <div>
                    <div className="timer">
                      <span>{remainingTime}</span>
                    </div>
                    <h3>{currentQuestion.question}</h3>
                  </div>
                  <ul className="questions-grid">
                    {currentQuestion.options.map((option, index) => (
                      <li key={index}>
                        <Button
                          onClick={() => handleUserSelection(option)}
                          disabled={userAnswer !== null}
                          className="btn-form-submit"
                          style={{ textAlign: "left" }}
                        >
                          {index}) {option}
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
    </>
  );
}
