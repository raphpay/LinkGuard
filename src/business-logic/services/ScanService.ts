import IScan, {
  IScanBulkInput,
  IScanBulkInputWithoutAccount,
  IScanInput,
  IScanInputWithoutAccount,
} from "../models/IScan";
import IToken from "../models/IToken";
import APIService from "./APIService";

/**
 * Represents the ScanService class responsible for handling authentication-related operations.
 */
class ScanService {
  private static instance: ScanService | null = null;
  private baseRoute = "api/scans";

  /**
   * Gets the instance of the ScanService class.
   * @returns The instance of the ScanService class.
   */
  static getInstance(): ScanService {
    if (!ScanService.instance) {
      ScanService.instance = new ScanService();
    }
    return ScanService.instance;
  }

  // POST
  async scan(input: IScanInput, token: IToken): Promise<IScan> {
    try {
      return await APIService.post<IScan>(this.baseRoute, input, token.value);
    } catch (error) {
      throw error;
    }
  }

  async scanWithoutAccount(input: IScanInputWithoutAccount): Promise<IScan> {
    try {
      return await APIService.post<IScan>(
        `${this.baseRoute}/scan-without-account`,
        input
      );
    } catch (error) {
      throw error;
    }
  }

  async scanBulk(input: IScanBulkInput): Promise<IScan[]> {
    try {
      return await APIService.post<IScan[]>(
        `${this.baseRoute}/bulk/user`,
        input
      );
    } catch (error) {
      throw error;
    }
  }

  async scanBulkWithoutAccount(
    input: IScanBulkInputWithoutAccount
  ): Promise<IScan[]> {
    try {
      return await APIService.post<IScan[]>(`${this.baseRoute}/bulk`, input);
    } catch (error) {
      throw error;
    }
  }
}

export default ScanService;
