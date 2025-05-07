import Role from "../enums/Role";
import SubscriptionStatus from "../enums/SubscriptionStatus";
import IScan from "../models/IScan";
import IToken from "../models/IToken";
import { IUserInput } from "../models/IUser";
import APIService from "./APIService";

/**
 * Represents the UserService class responsible for handling authentication-related operations.
 */
class UserService {
  private static instance: UserService | null = null;
  private baseRoute = "api/users";

  /**
   * Gets the instance of the UserService class.
   * @returns The instance of the UserService class.
   */
  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // POST
  async register(
    email: string,
    password: string,
    planID: string
  ): Promise<IToken> {
    try {
      const user: IUserInput = {
        email,
        password,
        subscriptionStatus: SubscriptionStatus.free,
        subscriptionPlanID: planID,
        role: Role.user,
      };
      const encodedAuth = btoa(`${email}:${password}`); // Use btoa()
      const basicAuth = `Basic ${encodedAuth}`;

      const token = await APIService.post<IToken>(
        `${this.baseRoute}/register`,
        user,
        undefined,
        basicAuth
      );
      return token;
    } catch (error: any) {
      throw error;
    }
  }

  // GET
  async getScans(userID: string, token: IToken): Promise<IScan[]> {
    try {
      return await APIService.get<IScan[]>(
        `${this.baseRoute}/scans/${userID}`,
        token.value
      );
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
