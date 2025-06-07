import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import profilePlaceholder from "@assets/img/profilePlaceholder.png";
import { useRegister } from "../../../query/mutations";
import Loader from "../../Loader/Loader";
import { useOrganizations } from "../../../query/queries";
import OrganizationSelect from "../../OrganizationSelect/OrganizationSelect";

const SignUpForm = ({ onSwitchToSignIn }) => {
  const { data: organizations = [] } = useOrganizations();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [noOrganization, setNoOrganization] = useState(false);
  const { mutateAsync: signUp, isPending: isLoading } = useRegister();
  const [orgSearch, setOrgSearch] = useState("");
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);

  const onSubmit = async (data) => {
    // Передаем либо organizationId, либо organizationName
    const payload = { ...data };
    if (noOrganization) {
      delete payload.organizationId;
    } else {
      delete payload.organizationName;
    }
    await signUp(payload);
  };

  // Маска для телефона: +7 (___) ___-__-__
  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("8")) value = "7" + value.slice(1);
    if (value.length > 11) value = value.slice(0, 11);
    let formatted = "+7";
    if (value.length > 1) formatted += " (" + value.slice(1, 4);
    if (value.length >= 4) formatted += ") " + value.slice(4, 7);
    if (value.length >= 7) formatted += "-" + value.slice(7, 9);
    if (value.length >= 9) formatted += "-" + value.slice(9, 11);
    e.target.value = formatted;
    setValue("phone", formatted);
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
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                placeholder="Телефон (необязательно)"
                maxLength={18}
                {...field}
                onChange={(e) => {
                  handlePhoneInput(e);
                  field.onChange(e);
                }}
              />
            )}
          />
        </div>
        <div className="auth__field">
          {!noOrganization ? (
            <>
              <OrganizationSelect
                value={selectedOrg}
                onChange={(orgId) => {
                  setSelectedOrg(orgId);
                  setValue("organizationId", orgId);
                }}
                name="organizationId"
                required
              />
              <label
                style={{ display: "flex", alignItems: "center", marginTop: 8 }}
              >
                <input
                  type="checkbox"
                  checked={noOrganization}
                  onChange={() => {
                    setNoOrganization(true);
                    setSelectedOrg(null);
                    setValue("organizationId", "");
                  }}
                  style={{ marginRight: 8 }}
                />
                Нет моей организации
              </label>
            </>
          ) : (
            <>
              <input
                type="text"
                {...register("organizationName")}
                required
                placeholder="Организация"
              />
              <label
                style={{ display: "flex", alignItems: "center", marginTop: 8 }}
              >
                <input
                  type="checkbox"
                  checked={noOrganization}
                  onChange={() => {
                    setNoOrganization(false);
                    setValue("organizationName", "");
                  }}
                  style={{ marginRight: 8 }}
                />
                Нет моей организации
              </label>
            </>
          )}
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
