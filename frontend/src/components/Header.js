import React from "react";
import headerLogo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header({ email, signOut, loggedIn }) {
  // сохраняем местоположение в переменную
  const location = useLocation();

  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
  const linkAuth = location.pathname === "/sign-in" ? "Регистрация" : "Войти";

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип 'Место'" />
      {loggedIn ? (
        <div className="header__container">
          <>
            <p className="header__email">{email}</p>
            <Link className="header__logout" to="/sign-in" onClick={signOut}>
              Выйти
            </Link>
          </>
        </div>
      ) : (
        <Link className="header__link" to={path}>
          {linkAuth}
        </Link>
      )}
    </header>
  );
}
