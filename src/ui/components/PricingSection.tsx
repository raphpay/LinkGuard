import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Screen from "../../business-logic/enums/Screen";
import ISubscriptionPlan, {
  Name,
} from "../../business-logic/models/ISubscriptionPlan";
import NavigationRoutes from "../../business-logic/navigation/NavigationRoutes";
import { setSelectedSubscriptionPlan } from "../../business-logic/redux/slices/subscriptionPlanReducer";
import SubscriptionPlanService from "../../business-logic/services/SubscriptionPlanService";
import UserService from "../../business-logic/services/UserService";
import { capitalizeFirstLetter } from "../../business-logic/utils/string.utils";

interface PricingSectionProps {
  screen: Screen;
}

export default function PricinSection({ screen }: PricingSectionProps) {
  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan | null>(
    null
  );

  const { token } = useSelector((state: any) => state.tokens);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Async Methods
  async function choosePlan(plan: ISubscriptionPlan) {
    switch (screen) {
      case Screen.pricing:
        navigate(NavigationRoutes.LOGIN);
        break;
      case Screen.signup:
        dispatch(setSelectedSubscriptionPlan(plan));
      case Screen.dashboard:
        await selectPlanForUser(plan);
      default:
        break;
    }
    setSelectedPlan(plan);
  }

  async function loadPlans() {
    try {
      const apiPlans = await SubscriptionPlanService.getInstance().getAll();
      setPlans(apiPlans);
    } catch (error) {
      console.log("Error loading apiPlans");
    }
  }

  async function loadCurrentPlan() {
    if (screen === Screen.dashboard) {
      try {
        const currentUser = await UserService.getInstance().getUser(
          token.user.id,
          token
        );
        const plansData = await SubscriptionPlanService.getInstance().getAll();
        const userSelectedPlan = plansData.filter(
          (plan) => plan.id === currentUser.subscriptionPlanID
        );
        setSelectedPlan(userSelectedPlan[0]);
      } catch (error) {
        console.log("error");
      }
    }
  }

  async function selectPlanForUser(plan: ISubscriptionPlan) {
    try {
      if (plan.id) {
        await UserService.getInstance().changePlan(
          token.user.id,
          plan.id,
          token
        );
      }
    } catch (error) {
      console.log("Error updating plan");
    }
  }

  // Lifecycle
  useEffect(() => {
    async function init() {
      loadPlans();
      loadCurrentPlan();
    }
    init();
  }, []);

  // Render
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out ${
              selectedPlan?.name === plan.name
                ? plan.name === Name.free
                  ? "ring-4 ring-offset-2 bg-blue:400 ring-blue-800"
                  : plan.name === Name.starter
                  ? "ring-4 ring-offset-2 bg-green-400 ring-green-800"
                  : plan.name === Name.pro
                  ? "ring-4 ring-offset-2 bg-purple-400 ring-purple-800"
                  : "ring-4 ring-offset-2 bg-yellow-400 ring-yellow-800"
                : ""
            } ${
              plan.name === Name.free
                ? "bg-blue-300 hover:bg-blue-500"
                : plan.name === Name.starter
                ? "bg-green-300 hover:bg-green-500"
                : plan.name === Name.pro
                ? "bg-purple-300 hover:bg-purple-500"
                : "bg-yellow-300 hover:bg-yellow-500"
            }`}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {capitalizeFirstLetter(plan.name)}
            </h3>
            <h4 className="text-lg font-semibold text-gray-600 mb-2">
              Fréquence : {capitalizeFirstLetter(plan.scanFrequency)}
            </h4>
            <h4 className="text-md text-gray-600 mb-2">
              Nombre de scans: {plan.maxUrls}
            </h4>
            <p className="text-3xl font-extrabold text-gray-900 mb-4">
              {plan.price}€
            </p>
            <button
              onClick={() => choosePlan(plan)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {selectedPlan?.name === plan.name
                ? "Plan selectionné"
                : "Choisir ce plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
