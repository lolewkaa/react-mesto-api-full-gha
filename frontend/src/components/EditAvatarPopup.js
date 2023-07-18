import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputAvatar = React.useRef()
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    inputAvatar.current.value = ''
  }, [currentUser]); 


  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
  }
return(
    <PopupWithForm 
      title='Обновить аватар'
      name='avatar'
      isOpen={isOpen}
      onClose={onClose}
      textSubmit='Сохранить'
      onSubmit={handleSubmit}
      >
    <input 
      id="avatar-input"
      type="url" 
      className="form__item form__item_type_avatar" 
      name="avatar" 
      placeholder="Ссылка на аватар" 
      required
      ref={inputAvatar}
      />
    <span className="form__item-error avatar-input-error"></span>

    
    </PopupWithForm>
)
}
