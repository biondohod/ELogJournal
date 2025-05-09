import React, { useState } from "react";
import { useForm } from "react-hook-form";
import profilePlaceholder from "@assets/img/profilePlaceholder.png";

const SignUpForm = ({ onSwitchToSignIn }) => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  return (
    <div className="auth__form-wrapper">
      <img src={profilePlaceholder} alt="Auth" className="auth__img" />
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit(() => {})}>
        <div className="auth__field">
          <input type="text" {...register("fio")} required placeholder="ФИО" />
        </div>
        <div className="auth__field">
          <input
            type="email"
            {...register("email")}
            required
            placeholder="Почта"
          />
        </div>
        <div className="auth__field">
          <input
            type="text"
            {...register("organization")}
            required
            placeholder="Организация"
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
        <div className="auth__field">
          <div>
            <input
              type={showRepeat ? "text" : "password"}
              {...register("repeatPassword")}
              required
              placeholder="Повторить пароль"
            />
            <button
              type="button"
              className="auth__show-btn"
              onClick={() => setShowRepeat((v) => !v)}
              tabIndex={-1}
            ></button>
          </div>
        </div>
        <button className="auth__submit-btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="auth__links">
        <span className="auth__switch">
          У Вас уже есть аккаунт?{" "}
          <button
            type="button"
            className="auth__link-text"
            onClick={onSwitchToSignIn}
          >
            Войти
          </button>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
