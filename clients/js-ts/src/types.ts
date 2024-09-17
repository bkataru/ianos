import { z } from "zod";

export const modelOptions = [
  "GPT-4o",
  "GPT-4o-mini",
  "GPT-3.5",
  "Perplexity",
  "Gemini 1.5 Pro",
  "Gemini 1.5 Flash",
  "Gemini Pro",
  "Llama3.1-405b",
  "Llama3.1-70b",
  "Llama3-70b",
  "Qwen2-72B",
  "Mistral-8x22b-instruct",
  "Claude 3 Haiku",
  "Claude 3 Opus",
  "Claude 3 Sonnet",
  "Claude 3.5",
  "none",
] as const;

export type ModelOption = (typeof modelOptions)[number];

export interface PostIANPromptRequest {
  account: string;
  wallet: string;
  user: string;
  a1: ModelOption;
  a2: ModelOption;
  a3: ModelOption;
  input: string;
}

export const postIANPromptRequestSchema = z.object({
  account: z.string(),
  wallet: z.string(),
  user: z.string(),
  a1: z.enum(modelOptions),
  a2: z.enum(modelOptions),
  a3: z.enum(modelOptions),
  input: z.string(),
});

export const IANResponseSchema = z.object({
  response: z.string(),
  elapsedTime: z.number(),
});

export type IANResponse = z.infer<typeof IANResponseSchema>;
