import { useEffect, useState } from "react";

import Screen from "../../business-logic/enums/Screen";
import ISubscriptionPlan, {
  Name,
} from "../../business-logic/models/ISubscriptionPlan";
import SubscriptionPlanService from "../../business-logic/services/SubscriptionPlanService";
import { capitalizeFirstLetter } from "../../business-logic/utils/string.utils";

interface PricingSectionProps {
  screen: Screen;
}

export default function PricinSection() {
  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan | null>(
    null
  );

  function choosePlan(plan: ISubscriptionPlan) {
    // TODO: Redirect based on screen props
    setSelectedPlan(plan);
    console.log("plan", plan);
  }

  async function loadPlans() {
    try {
      const apiPlans = await SubscriptionPlanService.getInstance().getAll();
      setPlans(apiPlans);
    } catch (error) {
      console.log("Error loading apiPlans");
    }
  }

  useEffect(() => {
    async function init() {
      loadPlans();
    }
    init();
  }, []);

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
              Choisir ce plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
