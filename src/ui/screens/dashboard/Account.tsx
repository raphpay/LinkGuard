import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ISubscriptionPlan from "../../../business-logic/models/ISubscriptionPlan";
import IUser from "../../../business-logic/models/IUser";
import NavigationRoutes from "../../../business-logic/navigation/NavigationRoutes";
import SubscriptionPlanService from "../../../business-logic/services/SubscriptionPlanService";
import UserService from "../../../business-logic/services/UserService";
import { capitalizeFirstLetter } from "../../../business-logic/utils/string.utils";
import Header from "../../components/Header";

export default function Account() {
  const { token } = useSelector((state: any) => state.tokens);
  const [scanCount, setScanCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [plan, setPlan] = useState<ISubscriptionPlan | null>(null);

  const navigate = useNavigate();

  // Sync methods
  function redirectToPricing() {
    navigate(NavigationRoutes.AUTH_PRICING);
  }

  // Lifecycle
  useEffect(() => {
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
            <button className="bg-gray-100 px-4 py-1 rounded hover:bg-gray-200 text-sm">
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
              onClick={() => {
                /* logout logic */
              }}
            >
              Se déconnecter
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
