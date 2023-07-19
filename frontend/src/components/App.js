import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  //хранение email авторизованного пользователя
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [tooltipTitle, setTooltipTitle] = useState("");
  const [tooltipIcon, setTooltipIcon] = useState("");

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([dataUser, resCard]) => {
          setCurrentUser(dataUser);
          setCards(resCard);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [loggedIn]);

  //вызывается при монтировании App, и отправляет запрос если jwt есть в хранилище
  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.user.email);
          navigate("/", {replace: true});
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [navigate])

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  //отправляет запрос регистрации
  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        //перенаправление на страницу авторизации
        navigate("/sign-in");
        onRegister();
      })
      .catch((error) => {
        onError();
        console.log(`Ошибка: ${error}`);
      });
  }

  //отправляет запрос авторизации
  function handleLogin(password, email) {
    auth
      .authorization(password, email)
      .then((res) => {
        //сохраняет в localStorage jwt токен который приходит с сервера
        localStorage.setItem("jwt", res.token);
        //устанавливает в стейте результат того что пользователь залогинился
        setLoggedIn(true);
        setEmail(email);
        //отправляет на корневую страницу сайта
        navigate("/");
      })
      .catch((error) => {
        onError();
        console.log(`Ошибка: ${error}`);
      });
  }

  //очищает хранилище и стейт, отвечающий за состояние авторизации
  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .postNewCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleUpdateUser(user) {
    api
      .changeUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function onRegister() {
    setIsInfoTooltipPopupOpen(true);
    setTooltipTitle("Вы успешно зарегистрировались!");
    setTooltipIcon("success");
  }

  function onError() {
    setIsInfoTooltipPopupOpen(true);
    setTooltipTitle("Что-то пошло не так! Попробуйте еще раз.");
    setTooltipIcon("error");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} signOut={signOut} loggedIn={loggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} setEmail={setEmail} />}
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          title={tooltipTitle}
          toolTipImage={tooltipIcon}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
