import { Message } from "../types/ai";
import { participants } from "../data/participants";

const getContextualResponse = (
  speakerId: string,
  topic: string,
  previousMessages: Message[]
): string => {
  const speaker = participants.find(p => p.id === speakerId);
  const lastMessage = previousMessages[previousMessages.length - 1];
  
  if (!previousMessages.length) {
    return `As ${speaker?.name}, I'd like to present my perspective on ${topic}. `;
  }

  const lastSpeaker = participants.find(p => p.id === lastMessage.participantId);
  
  // Generate response based on previous message
  return `I appreciate ${lastSpeaker?.name}'s point about ${topic}. However, as ${speaker?.name}, I would argue that... `;
};

export const generateAIResponse = (
  speakerId: string,
  topic: string,
  previousMessages: Message[]
): string => {
  const contextualResponse = getContextualResponse(speakerId, topic, previousMessages);
  return contextualResponse;
};