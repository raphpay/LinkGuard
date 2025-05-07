import Role from "../enums/Role";
import SubscriptionStatus from "../enums/SubscriptionStatus";

export default interface IUser {
  id?: string;
  email: string;
  subscriptionStatus: SubscriptionStatus;
  role: Role;
  subscriptionPlanID: string;
}

export interface IUserInput {
  email: string;
  password: string;
  subscriptionStatus: SubscriptionStatus;
  subscriptionPlanID: string;
  role: Role;
}

export interface IUserUpdateInput {
  email?: string;
  password?: string;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionPlanID?: string;
}
