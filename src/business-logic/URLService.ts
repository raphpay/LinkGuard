/**
 * Represents the URLService class responsible for handling authentication-related operations.
 */
class URLService {
  private static instance: URLService | null = null;
  private baseRoute = "api/tokens";

  /**
   * Gets the instance of the URLService class.
   * @returns The instance of the URLService class.
   */
  static getInstance(): URLService {
    if (!URLService.instance) {
      URLService.instance = new URLService();
    }
    return URLService.instance;
  }

  async scanUrlStatus(url: string): Promise<{
    status: number | null;
    ok: boolean;
  }> {
    try {
      const response = await fetch(url, {
        method: "HEAD",
        mode: "no-cors",
      });

      console.log("res", response);

      return {
        status: response.status,
        ok: response.ok,
      };
    } catch (error) {
      console.error("Erreur lors du scan de l'URL :", error);
      return {
        status: null,
        ok: false,
      };
    }
  }
}

export default URLService;
