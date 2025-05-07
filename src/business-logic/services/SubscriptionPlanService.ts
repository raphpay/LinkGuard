import ISubscriptionPlan from "../models/ISubscriptionPlan";
import APIService from "./APIService";

/**
 * Represents the SubscriptionPlanService class responsible for handling authentication-related operations.
 */
class SubscriptionPlanService {
  private static instance: SubscriptionPlanService | null = null;
  private baseRoute = "api/subscriptionPlans";

  /**
   * Gets the instance of the SubscriptionPlanService class.
   * @returns The instance of the SubscriptionPlanService class.
   */
  static getInstance(): SubscriptionPlanService {
    if (!SubscriptionPlanService.instance) {
      SubscriptionPlanService.instance = new SubscriptionPlanService();
    }
    return SubscriptionPlanService.instance;
  }

  // GET
  async getAll(): Promise<ISubscriptionPlan[]> {
    try {
      return await APIService.get<ISubscriptionPlan[]>(this.baseRoute);
    } catch (error) {
      throw error;
    }
  }
}

export default SubscriptionPlanService;
