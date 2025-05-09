import React, { useState } from "react";
import { useForm } from "react-hook-form";
import profilePlaceholder from "@assets/img/profilePlaceholder.png";

const SignInForm = ({ onSwitchToSignUp }) => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth__form-wrapper">
      <img src={profilePlaceholder} alt="Auth" className="auth__img" />
      <h2 className="auth__title">Войти</h2>
      <form className="auth__form" onSubmit={handleSubmit(() => {})}>
        <div className="auth__field">
          <input
            type="email"
            {...register("email")}
            required
            placeholder="Почта"
          />
        </div>
        <div className="auth__field">
          <div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              required
              placeholder="Пароль"
            />
            <button
              type="button"
              className="auth__show-btn"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            ></button>
          </div>
        </div>
        <button className="auth__submit-btn" type="submit">
          Войти
        </button>
      </form>
      <div className="auth__links">
        <a href="#" className="auth__link-text">
          Забыли пароль?
        </a>
        <span className="auth__switch">
          {" "}
          Еще нет аккаунта?{" "}
          <button
            type="button"
            className="auth__link-text"
            onClick={onSwitchToSignUp}
          >
            Создать
          </button>
        </span>
      </div>
    </div>
  );
};

export default SignInForm;
