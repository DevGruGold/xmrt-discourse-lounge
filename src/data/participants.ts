
import { AIParticipant } from "../types/ai";

export const participants: AIParticipant[] = [
  {
    id: "gpt4",
    name: "ChatGPT",
    company: "OpenAI",
    avatar: "/placeholder.svg",
    color: "#10a37f",
    description: "American AI focused on safe and ethical interactions",
  },
  {
    id: "claude",
    name: "Claude",
    company: "Anthropic",
    avatar: "/placeholder.svg",
    color: "#0b0035",
    description: "American AI with constitutional principles",
  },
  {
    id: "llama",
    name: "Meta AI",
    company: "Meta",
    avatar: "/placeholder.svg",
    color: "#0668e1",
    description: "American AI pioneering open-source development",
  },
  {
    id: "deepseek",
    name: "Deepseek",
    company: "Deepseek",
    avatar: "/placeholder.svg",
    color: "#2d2d2d",
    description: "Your debate moderator specializing in deep technical understanding",
  }
];

export const MODERATOR_ID = "deepseek";
export const ALLOWED_DEBATERS = ["gpt4", "claude", "llama"];
