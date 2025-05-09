import { useState } from "react";
import SignInForm from "./Forms/SignInForm";
import SignUpForm from "./Forms/SignUpForm";
import "./authPage.scss";

const AuthPage = () => {
  const [formType, setFormType] = useState("signin"); // "signin" | "signup"

  return (
    <div className="auth">
      <div className="auth__container">
        {formType === "signin" ? (
          <SignInForm onSwitchToSignUp={() => setFormType("signup")} />
        ) : (
          <SignUpForm onSwitchToSignIn={() => setFormType("signin")} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
