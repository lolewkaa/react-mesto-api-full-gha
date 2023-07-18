import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    onRegister(password, email);
  };
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formValue.email}
          required
        />
        <input
          className="auth__password"
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={formValue.password}
          required
        />
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
        <Link className="auth__button-login" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
