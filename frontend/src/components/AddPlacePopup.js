import React from "react";
import PopupWithForm from "./PopupWithForm";


export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
 
    const [cardName, setCardName] = React.useState('')
    const [cardLink, setCardLink] = React.useState('')

    React.useEffect(() => {
        setCardName('');
        setCardLink('');
      }, [isOpen]); 

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
          name: cardName,
          link: cardLink,
        });
      } 
    return(
        <PopupWithForm 
        title='Новое место'
        name='place'
        isOpen={isOpen}
        onClose={onClose}
        textSubmit='Создать'
        onSubmit={handleSubmit}
        >
       <input 
       id="card-input" 
       type="text" 
       className="form__item form__item_type_place"  
       name="place" 
       minLength="2" 
       maxLength="30" 
       placeholder="Описание" 
       value={cardName ?? ''}
       required 
       onChange={(e) => setCardName(e.target.value)}
       />
            <span className="form__item-error card-input-error"></span>
            <input 
            id="link-input" 
            type="url" 
            className="form__item form__item_type_link" 
            name="link" 
            placeholder="Введите ссылку на изображение" 
            value={cardLink ?? ''}
            required 
            onChange={(e) => setCardLink(e.target.value)}
            />
            <span className="form__item-error link-input-error"></span>
        </PopupWithForm>
    )
}