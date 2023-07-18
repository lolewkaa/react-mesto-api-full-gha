import React, { useState } from "react";

export default function Login({ onLogin }) {
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
    onLogin(password, email);
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formValue.email || ""}
          required
        />
        <input
          className="login__password"
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={formValue.password || ""}
          required
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
