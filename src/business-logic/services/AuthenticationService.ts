import CacheKeys from "../enums/CacheKeys";
import IToken from "../models/IToken";
import APIService from "./APIService";
import CacheService from "./CacheService";

/**
 * Represents the AuthenticationService class responsible for handling authentication-related operations.
 */
class AuthenticationService {
  private static instance: AuthenticationService | null = null;
  private baseRoute = "api/tokens";

  /**
   * Gets the instance of the AuthenticationService class.
   * @returns The instance of the AuthenticationService class.
   */
  static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  /**
   * Logs in a user with the provided username and password.
   * @param username - The username of the user.
   * @param password - The password of the user.
   * @returns A Promise that resolves to the authentication token.
   * @throws If an error occurs during the login process.
   */
  async login(identifier: string, password: string): Promise<IToken> {
    let token: IToken;
    try {
      token = await APIService.login<IToken>(
        `${this.baseRoute}/login`,
        identifier,
        password
      );
      CacheService.getInstance().storeValue<string>(
        CacheKeys.currentUserID,
        token.user.id
      );
      CacheService.getInstance().storeValue<IToken>(
        CacheKeys.currentUserToken,
        token
      );
      return token;
    } catch (error: any) {
      throw error;
    }
  }
}

export default AuthenticationService;
