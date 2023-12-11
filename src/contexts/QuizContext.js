// QuizContext.js
import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const setCard = (card) => {
    setSelectedCard(card);
  };

  return (
    <QuizContext.Provider value={{ selectedCard, setCard }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext(QuizContext);
};
