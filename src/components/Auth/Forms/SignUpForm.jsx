import React, { useState } from "react";
import { useForm } from "react-hook-form";
import profilePlaceholder from "@assets/img/profilePlaceholder.png";
import { useRegister } from "../../../query/mutations";
import Loader from "../../Loader/Loader";

const SignUpForm = ({ onSwitchToSignIn }) => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const { mutateAsync: signUp, isPending: isLoading } = useRegister();

  const onSubmit = async (data) => {
    await signUp(data);
  };

  return (
    <div className="auth__form-wrapper">
      <img src={profilePlaceholder} alt="Auth" className="auth__img" />
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth__field">
          <input type="text" {...register("name")} required placeholder="Имя" />
        </div>
        <div className="auth__field">
          <input
            type="text"
            {...register("surname")}
            required
            placeholder="Фамилия"
          />
        </div>
        <div className="auth__field">
          <input
            type="text"
            {...register("patronymic")}
            required
            placeholder="Отчество"
          />
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
            {...register("organizationName")}
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
        {isLoading ? (
          <Loader size={46} />
        ) : (
          <button className="auth__submit-btn" type="submit">
            Зарегистрироваться
          </button>
        )}
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
