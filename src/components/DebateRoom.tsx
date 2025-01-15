import { useState, useEffect, useRef } from "react";
import { Message as MessageType } from "../types/ai";
import { Message } from "./Message";
import { Footer } from "./Footer";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import {
  SPEAKER_TIME_LIMIT,
  getRandomModerator,
  getModeratorScript,
} from "../utils/debateRules";
import { generateAIResponse } from "../utils/aiResponseGenerator";
import { getApiKey } from "../utils/apiKeys";
import { ParticipantSelection } from "./ParticipantSelection";
import { CurrentSpeaker } from "./CurrentSpeaker";
import { TopicInput } from "./TopicInput";
import { participants } from "../data/participants";

export const DebateRoom = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [topic, setTopic] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [isDebating, setIsDebating] = useState(false);
  const [moderatorId, setModeratorId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(SPEAKER_TIME_LIMIT);
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const checkApiKeys = () => {
    const requiredProviders = [
      "openai",
      "anthropic",
      "google",
      "meta",
      "deepseek",
    ];
    const allKeysSet = requiredProviders.every((provider) => {
      const key = getApiKey(provider);
      if (!key) {
        console.error(`Missing ${provider} API key in environment variables`);
        return false;
      }
      return true;
    });
    return allKeysSet;
  };

  const handleParticipantToggle = (participantId: string) => {
    console.log("Toggling participant:", participantId);
    setSelectedParticipants((prev) =>
      prev.includes(participantId)
        ? prev.filter((id) => id !== participantId)
        : [...prev, participantId]
    );
  };

  const startTimer = () => {
    setTimeRemaining(SPEAKER_TIME_LIMIT);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const addModeratorMessage = async (content: string) => {
    if (!moderatorId) return;
    console.log(`Moderator ${moderatorId} speaking:`, content);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newMessage: MessageType = {
      id: uuidv4(),
      participantId: moderatorId,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateAIResponse = async (participantId: string, topic: string) => {
    console.log(`Starting AI response simulation for ${participantId}`);
    const participant = participants.find((p) => p.id === participantId);
    if (!participant) {
      console.error(`Participant ${participantId} not found`);
      return;
    }

    setCurrentSpeaker(participantId);
    startTimer();

    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 2000 + 2000)
    );

    const newMessage: MessageType = {
      id: uuidv4(),
      participantId,
      content: generateAIResponse(participantId, topic, messages),
      timestamp: new Date(),
    };

    console.log(`Adding message from ${participantId}:`, newMessage.content);
    setMessages((prev) => [...prev, newMessage]);

    await new Promise((resolve) => setTimeout(resolve, SPEAKER_TIME_LIMIT * 1000));
    setCurrentSpeaker(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast.error("Please enter a topic for debate");
      return;
    }
    if (selectedParticipants.length < 2) {
      toast.error("Please select at least 2 AI participants");
      return;
    }
    if (!checkApiKeys()) {
      toast.error("Some required API keys are missing from environment variables");
      return;
    }

    setIsDebating(true);
    setMessages([]);

    try {
      const newModeratorId = getRandomModerator(
        participants.map((p) => p.id),
        selectedParticipants
      );
      console.log("Selected moderator:", newModeratorId);
      setModeratorId(newModeratorId);

      const moderatorScripts = getModeratorScript(topic);
      for (const script of moderatorScripts) {
        await addModeratorMessage(script);
      }

      for (const participantId of selectedParticipants) {
        await addModeratorMessage(
          `I now give the floor to ${
            participants.find((p) => p.id === participantId)?.name
          }`
        );
        await simulateAIResponse(participantId, topic);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      await addModeratorMessage(
        "Thank you all for your perspectives. Based on the arguments presented, I will now declare a winner..."
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const winner =
        selectedParticipants[
          Math.floor(Math.random() * selectedParticipants.length)
        ];
      await addModeratorMessage(
        `The winner of this debate is ${
          participants.find((p) => p.id === winner)?.name
        }!`
      );

      setIsDebating(false);
      setCurrentSpeaker(null);
      if (timerRef.current) clearInterval(timerRef.current);
      toast.success("Debate concluded!");
    } catch (error) {
      console.error("Error during debate:", error);
      toast.error("An error occurred during the debate");
      setIsDebating(false);
      setCurrentSpeaker(null);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="container py-4 md:py-6 px-4 md:px-8 flex-grow flex flex-col">
        <div className="debate-header rounded-t-lg p-6 mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
            XMRT Presidential Debate
          </h1>
        </div>

        <div className="presidential-stage rounded-lg p-4 mb-4">
          <ParticipantSelection
            selectedParticipants={selectedParticipants}
            moderatorId={moderatorId}
            onParticipantToggle={handleParticipantToggle}
          />

          <CurrentSpeaker
            currentSpeaker={currentSpeaker}
            timeRemaining={timeRemaining}
          />

          <TopicInput
            topic={topic}
            isDebating={isDebating}
            selectedParticipants={selectedParticipants}
            onTopicChange={setTopic}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="flex-grow overflow-auto bg-card rounded-lg message-container">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              {messages.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No messages yet. Start a debate by selecting AI participants and
                  entering a topic above!
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
      <Footer />
    </div>
  );
};