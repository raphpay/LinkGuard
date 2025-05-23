import HttpMethod from "../enums/HttpMethod";
/**
 * The APIService class provides methods for making HTTP requests to an API.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class APIService {
  /**
   * Sends a GET request to the specified endpoint.
   * @param endpoint - The API endpoint to send the request to.
   * @param token - Optional token for authentication.
   * @param params - Optional query parameters to include in the request.
   * @returns A Promise that resolves to the response data.
   * @throws An error if the request fails.
   */
  static async get<T>(
    endpoint: string,
    token?: string,
    type: "text" | "json" = "json"
  ): Promise<T> {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Include token in headers if provided
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: HttpMethod.GET,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (type === "text") {
        return (await response.text()) as T;
      } else {
        return (await response.json()) as T;
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  }

  /**
   * Sends a POST request to the specified endpoint.
   * @param endpoint - The API endpoint to send the request to.
   * @param data - The data to include in the request body.
   * @param token - Optional token for authentication.
   * @returns A Promise that resolves to the response data.
   * @throws An error if the request fails.
   */
  static async post<T>(
    endpoint: string,
    data: any = {},
    token?: string,
    basicAuth?: string
  ): Promise<T> {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Include token in headers if provided
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      if (basicAuth) {
        headers["Authorization"] = basicAuth;
      }

      const response = await fetch(url, {
        method: HttpMethod.POST,
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
          if (responseData && responseData.reason) {
            errorMessage = responseData.reason;
          }
        }
        throw new Error(errorMessage);
      }

      return (await response.json()) as T;
    } catch (error) {
      throw error;
    }
  }

  static async postWithoutStringify<T>(
    endpoint: string,
    data: any = {},
    token?: string
  ): Promise<T> {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;

      const headers: Record<string, string> = {
        "Content-Type": "multipart/form-data",
      };

      // Include token in headers if provided
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: HttpMethod.POST,
        headers,
        body: data,
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
          if (responseData && responseData.reason) {
            errorMessage = responseData.reason;
          }
        }
        throw new Error(errorMessage);
      }

      return (await response.json()) as T;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Sends a POST request to the specified endpoint without expecting a response.
   * @param endpoint - The API endpoint to send the request to.
   * @param data - The data to include in the request body.
   * @param token - Optional token for authentication.
   * @throws An error if the request fails.
   * @returns A Promise that resolves when the request is successful.
   */
  static async postWithoutResponse(
    endpoint: string,
    data: any = {},
    token?: string
  ): Promise<void> {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Include token in headers if provided
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: HttpMethod.POST,
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
          if (responseData && responseData.reason) {
            errorMessage = responseData.reason;
          }
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log("Error posting data:", endpoint, data, error);
      throw error;
    }
  }

  /**
   * Sends a login request to the specified endpoint.
   * @param endpoint - The API endpoint to send the request to.
   * @param identifier - The identifier for authentication.
   * @param password - The password for authentication.
   * @returns A Promise that resolves to the response data.
   * @throws An error if the request fails.
   */
  static async login<T>(
    endpoint: string,
    identifier: string,
    password: string
  ): Promise<T> {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      const encodedAuth = btoa(`${identifier}:${password}`); // Use btoa()

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedAuth}`,
      };

      const response = await fetch(url, {
        method: HttpMethod.POST,
        headers,
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
          if (responseData && responseData.reason) {
            errorMessage = responseData.reason;
          }
        }
        throw new Error(errorMessage);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.log("Error posting data:", error);
      throw error;
    }
  }

  /**
   * Sends a PUT request to the specified endpoint.
   * @param endpoint - The API endpoint to send the request to.
   * @param data - The data to include in the request body.
   * @param token - Optional token for authentication.
   * @returns A Promise that resolves to the response data.
   * @throws An error if the request fails.
   */
  static async put(
    endpoint: string,
    data: any = {},
    token?: string
  ): Promise<any> {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Include token in headers if provided
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: HttpMethod.PUT,
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
          if (responseData && responseData.reason) {
            errorMessage = responseData.reason;
          }
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.log("Error updating data:", error);
      throw error;
    }
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   * @param endpoint - The API endpoint to send the request to.
   * @param token - Optional token for authentication.
   * @throws An error if the request fails.
   */
  static async delete(endpoint: string, token?: string) {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      const headers: Record<string, string> = {};

      // Include token in headers if provided
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: HttpMethod.DELETE,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error deleting data:", error);
      throw error;
    }
  }

  /**
   * Sends a GET request to download a file from the specified endpoint.
   * @param endpoint - The API endpoint to send the request to.
   * @returns A Promise that resolves to the downloaded file data.
   * @throws An error if the request fails.
   */
  static async download(endpoint: string, token: string): Promise<any> {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(url, {
        method: HttpMethod.GET,
        headers,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.blob();
    } catch (error) {
      console.log("Error downloading data:", error);
      throw error;
    }
  }
}

export default APIService;
