import fetch from "node-fetch";
import {
  PostIANPromptRequest,
  postIANPromptRequestSchema,
  IANResponse,
  IANResponseSchema,
} from "./types";
import { z } from "zod";

export class HTTPClient {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async postIANPrompt(request: PostIANPromptRequest): Promise<IANResponse> {
    const validation = postIANPromptRequestSchema.safeParse(request);
    if (!validation.success) {
      throw new Error("Invalid input data");
    }

    const startTime = Date.now();
    console.log("Sending request to IAN...");

    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Content-Type": "application/json",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawResponse = await response.text();
      const elapsedTime = Date.now() - startTime;

      const validatedResponse = IANResponseSchema.parse({
        response: rawResponse,
        elapsedTime,
      });

      console.log(`Request completed in ${elapsedTime}ms`);
      return validatedResponse;
    } catch (error) {
      console.error("Error in IAN request:", error);
      throw error;
    }
  }
}
