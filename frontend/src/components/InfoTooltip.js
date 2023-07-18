import React from "react";
import closeIcon from '../images/CloseIcon.svg'
import succesIcon from '../images/success.jpg'
import errorIcon from '../images/error.jpg'

export default function InfoTooltip({ toolTipImage, title, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_infoTooltip ${isOpen ? 'popup_opened' : ""}`}>
      <div className="popup__container">
      <button className="popup__button popup__button_type_auth" type="reset" onClick={onClose}>
            <img className="popup__img-close" src={closeIcon} alt="Кнопка 'Закрыть'" />
          </button>
          <div >
            {toolTipImage === 'success' &&(
               <img className="popup__image-auth" src={succesIcon} alt="Сообщение об успешной регистрации"/>
            )}
            {toolTipImage === 'error' && 
            <img className="popup__image-auth" src={errorIcon} alt="Сообщение об ошибке" />
            }
       
        </div>
        <p className="popup__auth-text">{title}</p>
      </div>
    </div>
  )
}