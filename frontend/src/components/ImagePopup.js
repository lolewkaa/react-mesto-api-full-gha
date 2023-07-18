import React from "react";
import closeIcon from '../images/CloseIcon.svg'

export default function ImagePopup({ card, isOpen, onClose}) {
    return(
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ""}`}>
        <div className="popup__container-image">
          <button className="popup__button popup__button_type_image" type="reset" onClick={onClose}>
            <img className="popup__img-close" src={closeIcon} alt="Кнопка 'Закрыть'" />
          </button>
          <img className="popup__image" alt={card.name} src={card.link} />
          <h2 className="popup__title">{card.name}</h2>
        </div>
      </div>
    )
}