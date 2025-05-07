import { useState } from "react";
import { useDispatch } from "react-redux";

import AuthenticationService from "../../../business-logic/services/AuthenticationService";

import { setToken } from "../../../business-logic/redux/slices/tokenReducer";
import Header from "../../components/Header";
import PasswordInput from "../../components/PasswordInput";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  async function login() {
    try {
      const token = await AuthenticationService.getInstance().login(
        email,
        password
      );
      dispatch(setToken(token));
    } catch (error) {
      console.log("error logging in");
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-20 pt-32 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Connexion à LinkGuard
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
              setValue={setPassword}
            />
            <button
              type="button"
              onClick={login}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl mt-2"
            >
              Se connecter
            </button>
          </form>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Vous n'avez pas de compte ?{" "}
            <a
              href="/auth/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Créez-en un ici
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
