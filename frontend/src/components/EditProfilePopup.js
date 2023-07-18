import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')

   
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setUserName(currentUser.name);
        setUserDescription(currentUser.about);
      }, [currentUser, isOpen]); 

      function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name: userName,
          about: userDescription,
        });
      } 

    return(
        <PopupWithForm 
        title='Редактировать профиль'
        name='user'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        textSubmit='Сохранить'
        >
        <input 
        id="name-input" 
        type="text" 
        className="form__item form__item_type_name" 
        minLength="2" 
        maxLength="40" 
        name="name" 
        required 
        placeholder="Введите ваше имя" 
        value={userName ?? ''}
        onChange={(evt) => setUserName(evt.target.value)}
        />
        <span className="form__item-error name-input-error"></span>
        <input 
        id="job-input" 
        type="text" 
        className="form__item form__item_type_job" 
        minLength="2" 
        maxLength="200" 
        name="about" 
        required 
        placeholder="Расскажите, чем занимаетесь" 
        value={userDescription ?? ''}
        onChange={(evt) => setUserDescription(evt.target.value)}
        />
        <span className="form__item-error job-input-error"></span>
           
        </PopupWithForm>
    )
}