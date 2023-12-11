import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";

function CardItem(props) {
  const { setCard } = useQuiz();

  const handleCardClick = (card) => {
    setCard(card);
  };

  return (
    <>
      <li className="cards__item">
        <Link
          className="cards__item__link"
          to={props.path}
          onClick={() => handleCardClick(props.card)}
        >
          <figure className="cards__item__img-wrap" data-category={props.label}>
            <img
              src={props.src}
              alt="Affine Encryption"
              className="cards__item__img"
            />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
