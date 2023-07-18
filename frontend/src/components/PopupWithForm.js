import React from "react";
import closeIcon from "../images/CloseIcon.svg";


export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  textSubmit,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form
          className={`form form_type_${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
        >
          <button
            className="popup__button popup__button_type_user"
            type="reset"
            onClick={onClose}
          >
            <img
              className="popup__img-close"
              src={closeIcon}
              alt="Кнопка 'Закрыть'"
            />
          </button>
          <h2 className="form__title">{title}</h2>
          {children}
          <fieldset className="form__handlers">
            <button className="form__button-save form__submit" type="submit">
              {textSubmit}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
