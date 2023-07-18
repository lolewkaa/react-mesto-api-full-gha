import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__button ${
    isLiked && "card__button_active"
  }`;
  return (
    <div className="card">
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          className="card__button-delete"
          type="button"
        />
      )}
      <img
        className="card__img"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <div className="card__container">
        <h2 className="card__description">{card.name}</h2>
        <div className="card__box">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          />
          <h2 className="card__page-lakes">{card.likes.length}</h2>
        </div>
      </div>
    </div>
  );
}
