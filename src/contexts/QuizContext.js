// QuizContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // Load selectedCard from local storage or default to null
  const initialSelectedCard = JSON.parse(localStorage.getItem('selectedCard')) || null;

  const [selectedCard, setSelectedCard] = useState(initialSelectedCard);

  const setCard = (card) => {
    setSelectedCard(card);
  };

  // Update local storage when selectedCard changes
  useEffect(() => {
    localStorage.setItem('selectedCard', JSON.stringify(selectedCard));
  }, [selectedCard]);

  return (
    <QuizContext.Provider value={{ selectedCard, setCard }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext(QuizContext);
};