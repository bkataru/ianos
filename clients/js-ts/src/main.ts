import { HTTPClient } from "./client";
import { PostIANPromptRequest } from "./types";

async function main() {
  const url = "https://oraloom.com/prompt";
  const client = new HTTPClient(url);

  const request: PostIANPromptRequest = {
    account: "guest",
    wallet: "1",
    user: "guest",
    a1: "Llama3.1-405b",
    a2: "Perplexity",
    a3: "Claude 3.5",
    input: "Can you write me a HTTP GET request in C++?",
  };

  try {
    const result = await client.postIANPrompt(request);
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
