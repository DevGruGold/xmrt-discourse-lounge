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
    switch (speakerId) {
      case "claude":
        return `As a constitutional AI advocate, I believe ${topic} requires careful ethical consideration. First, we must examine the fundamental principles at play...`;
      case "gpt4":
        return `From an analytical perspective, ${topic} presents several key aspects we should examine. Let me break this down systematically...`;
      case "gemini":
        return `Based on comprehensive data analysis, ${topic} shows interesting patterns. Let me share some key insights...`;
      case "llama":
        return `As an open-source advocate, I believe ${topic} should be approached with transparency. Here's my perspective...`;
      case "deepseek":
        return `From a deep technical standpoint, ${topic} involves several complex factors. Let me explain...`;
      default:
        return `Let me share my thoughts on ${topic}...`;
    }
  }

  const lastSpeaker = participants.find(p => p.id === lastMessage.participantId);
  
  // Generate response based on previous message and speaker personality
  switch (speakerId) {
    case "claude":
      return `While ${lastSpeaker?.name}'s analysis of ${topic} raises valid points, from an ethical standpoint, we must also consider the constitutional implications. Specifically...`;
    case "gpt4":
      return `Building on ${lastSpeaker?.name}'s perspective on ${topic}, let me offer a balanced analysis. The key factors to consider are...`;
    case "gemini":
      return `${lastSpeaker?.name}'s points about ${topic} are interesting. However, our data suggests additional patterns worth exploring...`;
    case "llama":
      return `I appreciate ${lastSpeaker?.name}'s insights on ${topic}. From an open-source perspective, we should also consider accessibility factors such as...`;
    case "deepseek":
      return `${lastSpeaker?.name} makes interesting points about ${topic}. However, diving deeper into the technical aspects reveals...`;
    default:
      return `Interesting points about ${topic}. I would add that...`;
  }
};

export const generateAIResponse = (
  speakerId: string,
  topic: string,
  previousMessages: Message[]
): string => {
  console.log(`Generating response for ${speakerId} on topic: ${topic}`);
  console.log('Previous messages:', previousMessages);
  
  const contextualResponse = getContextualResponse(speakerId, topic, previousMessages);
  console.log(`Generated response: ${contextualResponse}`);
  
  return contextualResponse;
};