import React, { useContext } from "react";
import avatarUser from '../images/image.jpg'
import changeButton from '../images/Vector.svg'
import addButton from '../images/addbutton.svg'
import { api } from "../utils/Api";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike,  onCardDelete, cards}) {
    const currentUser = useContext(CurrentUserContext)
return(
    <main>
        <section className="profile">
          <div className="profile__box">
            <img name='avatar'  className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" onClick={onEditAvatar}/>
            <img className="profile__avatar-change " src={changeButton} alt="кнопка 'Редактировать аватар'" />
          </div>
          <div className="profile__intro">
            <div className="profile__container">
              <div className="profile__holder">
                <h1 className="profile__user">{currentUser.name}</h1>
                <button className="profile__button" type="button" onClick={onEditProfile}>
                  <img src={changeButton} alt="кнопка 'редактировать" />
                </button>
              </div>
              <p className="profile__text">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}>
              <img className="profile__add-icon" src={addButton} alt="Кнопка 'Добавить'" />
            </button>
          </div>
        </section>
        <ul className="cards">{cards.map((card) => ( 
            <Card card={card} key={card._id}  onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}</ul>
       
      </main>
)
}