import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserService from "../../../business-logic/services/UserService";

import Screen from "../../../business-logic/enums/Screen";
import { setToken } from "../../../business-logic/redux/slices/tokenReducer";
import Header from "../../components/Header";
import PasswordInput from "../../components/PasswordInput";
import PricinSection from "../../components/PricingSection";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const { selectedPlan } = useSelector((state: any) => state.subscriptionPlans);
  const dispatch = useDispatch();

  function getPasswordStrength(): string {
    if (password.length < 6) return "Trop court";
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[^a-zA-Z0-9]/.test(password);

    if (password.length >= 8 && hasLetters && hasNumbers && hasSymbols) {
      return "Fort";
    }
    if (hasLetters && hasNumbers) {
      return "Moyen";
    }
    return "Faible";
  }

  function checkPasswordMismatch() {
    const passwordMismatch =
      password && passwordConfirmation && password !== passwordConfirmation;
    return passwordMismatch
      ? "Les mots de passe ne correspondent pas"
      : undefined;
  }

  async function signUp() {
    if (selectedPlan) {
      if (password === passwordConfirmation) {
        try {
          const token = await UserService.getInstance().register(
            email,
            password,
            selectedPlan.id
          );
          setEmail("");
          setPassword("");
          setPasswordConfirmation("");
          dispatch(setToken(token));
        } catch (error) {
          console.log("error signing up");
        }
      }
    } else {
      console.log("Please select a plan before");
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-20 pt-32 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Inscription à LinkGuard
          </h1>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <PasswordInput
              placeholder="Mot de passe"
              value={password}
              strength={getPasswordStrength()}
              setValue={setPassword}
            />
            <PasswordInput
              placeholder="Confirmer le mot de passe"
              value={passwordConfirmation}
              setValue={setPasswordConfirmation}
              errorMessage={checkPasswordMismatch()}
            />
            <button
              type="button"
              onClick={signUp}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl mt-2"
            >
              S'inscrire
            </button>
          </form>
        </div>
        <div className="mt-4 mb-4 text-center">
          <p className="text-gray-600 text-sm">
            Vous avez déjà un compte ?{" "}
            <a
              href="/auth/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Connectez-vous ici
            </a>
          </p>
        </div>
        <PricinSection screen={Screen.signup} />
      </main>
    </>
  );
}
