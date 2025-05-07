import Role from "../enums/Role";
import SubscriptionStatus from "../enums/SubscriptionStatus";
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

  async register(email: string, password: string): Promise<IToken> {
    try {
      const user: IUserInput = {
        email,
        password,
        subscriptionStatus: SubscriptionStatus.free,
        subscriptionPlanID: "5DF4F8CE-147A-4928-9F6A-CA3A5191D1D4", // TODO: Change with real data
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

      // token = await APIService.post<IUser>(
      //   `${this.baseRoute}/register`, user
      // );
      // CacheService.getInstance().storeValue<string>(
      //   CacheKeys.currentUserID,
      //   token.user.id
      // );
      // CacheService.getInstance().storeValue<IToken>(
      //   CacheKeys.currentUserToken,
      //   token
      // );
      // return token;
    } catch (error: any) {
      throw error;
    }
  }
}

export default UserService;
