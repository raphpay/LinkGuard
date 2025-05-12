import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import ISubscriptionPlan from "../../../business-logic/models/ISubscriptionPlan";
import IUser from "../../../business-logic/models/IUser";
import NavigationRoutes from "../../../business-logic/navigation/NavigationRoutes";
import {
  removeToken,
  setToken,
} from "../../../business-logic/redux/slices/tokenReducer";
import { removeCurrentUser } from "../../../business-logic/redux/slices/userReducer";
import CacheService from "../../../business-logic/services/CacheService";
import SubscriptionPlanService from "../../../business-logic/services/SubscriptionPlanService";
import UserService from "../../../business-logic/services/UserService";
import { capitalizeFirstLetter } from "../../../business-logic/utils/string.utils";

import Header from "../../components/Header";
import PasswordInput from "../../components/PasswordInput";

export default function Account() {
  const { token } = useSelector((state: any) => state.tokens);
  const [scanCount, setScanCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [plan, setPlan] = useState<ISubscriptionPlan | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const [newPasswordError, setNewPasswordError] = useState<string | undefined>(
    undefined
  );
  const [newPasswordConfirmationError, setNewPasswordConfirmationError] =
    useState<string | undefined>(undefined);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sync methods
  function redirectToPricing() {
    navigate(NavigationRoutes.AUTH_PRICING);
  }

  function logout() {
    dispatch(removeToken());
    dispatch(removeCurrentUser());
    CacheService.getInstance().clearStorage();
  }

  // Async methods
  async function handlePasswordChange() {
    if (currentPassword !== newPassword) {
      setPasswordError(undefined);

      if (newPassword === newPasswordConfirmation) {
        setNewPasswordError(undefined);
        setNewPasswordConfirmationError(undefined);

        // API Call
        const newToken = await UserService.getInstance().changePassword(
          currentPassword,
          newPassword,
          token
        );
        dispatch(setToken(newToken));

        setShowModal(false);
      } else {
        setNewPasswordConfirmationError(
          "Les nouveaux mots de passe doivent être identiquesg"
        );
      }
    } else {
      setNewPasswordError(
        "Le nouveau mot de passe doit être différent de l'ancien"
      );
    }
  }

  // Lifecycle
  useEffect(() => {
    console.log("token", token);
    async function fetchData() {
      const userData = await UserService.getInstance().getUser(
        token.user.id,
        token
      );
      setCurrentUser(userData);
      const scans = await UserService.getInstance().getScans(
        token.user.id,
        token
      );
      setScanCount(scans.length);
      const planData = await SubscriptionPlanService.getInstance().getAll();
      const plan = planData.filter(
        (plan) => plan.id === userData.subscriptionPlanID
      );
      setPlan(plan[0]);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-20 pt-32 flex flex-col items-center">
      <Header />
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-10 max-w-2xl w-full">
        <h1 className="text-3xl font-semibold">Mon profil</h1>
        <section className="space-y-4 border rounded-md p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold">Informations du compte</h2>
          <div className="grid grid-cols-1 gap-4">
            <p>
              <span className="font-semibold">Email :</span>{" "}
              {currentUser?.email}
            </p>
            <p>
              <span className="font-semibold">Plan actif :</span>{" "}
              {capitalizeFirstLetter(plan?.name ?? "")}
            </p>
            <p>
              <span className="font-semibold">URLs scannées :</span> {scanCount}{" "}
              / {plan?.maxUrls}
            </p>
          </div>
        </section>

        <section className="space-y-4 border rounded-md p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold">Sécurité</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-100 px-4 py-1 rounded hover:bg-gray-200 text-sm"
            >
              Changer le mot de passe
            </button>
          </div>
        </section>

        <section className="space-y-4 border rounded-md p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold">Accès &amp; Actions</h2>
          <div className="flex sm:flex-col flex-row sm:space-x-4  space-y-4 sm:space-y-0">
            <button
              onClick={redirectToPricing}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center w-50 sm:mb-2"
            >
              Changer de plan
            </button>
            <button
              className="text-red-600 hover:underline text-center w-50 sm:mt-2"
              onClick={logout}
            >
              Se déconnecter
            </button>
          </div>
        </section>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/75 transition-opacity">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Nouveau scan</h2>
            <div className="flex flex-col gap-2 mb-3">
              <PasswordInput
                placeholder="Mot de passe actuel"
                value={currentPassword}
                setValue={setCurrentPassword}
                errorMessage={passwordError}
              />
              <PasswordInput
                placeholder="Nouveau mot de passe"
                value={newPassword}
                setValue={setNewPassword}
                errorMessage={newPasswordError}
              />
              <PasswordInput
                placeholder="Confirmer le nouveau mot de passe"
                value={newPasswordConfirmation}
                setValue={setNewPasswordConfirmation}
                errorMessage={newPasswordConfirmationError}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={handlePasswordChange}
              >
                Changer le mot de passe
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
