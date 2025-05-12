import Role from "../enums/Role";
import SubscriptionStatus from "../enums/SubscriptionStatus";
import IScan from "../models/IScan";
import IToken from "../models/IToken";
import IUser, {
  IUserChangePasswordRequestInput,
  IUserInput,
  IUserUpdateInput,
} from "../models/IUser";
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
  ): Promise<IUser> {
    try {
      const input: IUserInput = {
        email,
        password,
        subscriptionStatus: SubscriptionStatus.free,
        subscriptionPlanID: planID,
        role: Role.user,
      };
      const encodedAuth = btoa(`${email}:${password}`); // Use btoa()
      const basicAuth = `Basic ${encodedAuth}`;

      const newUser = await APIService.post<IUser>(
        `${this.baseRoute}/register`,
        input,
        undefined,
        basicAuth
      );
      return newUser;
    } catch (error: any) {
      throw error;
    }
  }

  // GET
  async getUser(userID: string, token: IToken): Promise<IUser> {
    try {
      return await APIService.get<IUser>(
        `${this.baseRoute}/${userID}`,
        token.value
      );
    } catch (error) {
      throw error;
    }
  }

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

  // PUT
  async changePlan(
    userID: string,
    planID: string,
    token: IToken
  ): Promise<void> {
    try {
      let input: IUserUpdateInput = {
        subscriptionPlanID: planID,
      };
      await APIService.put(`${this.baseRoute}/${userID}`, input, token.value);
    } catch (error) {}
  }

  async changePassword(
    currentPassword: string,
    newPassword: string,
    token: IToken
  ): Promise<IToken> {
    try {
      const input: IUserChangePasswordRequestInput = {
        currentPassword,
        newPassword,
      };
      return await APIService.put(
        `${this.baseRoute}/password`,
        input,
        token.value
      );
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
