
import { useState, useEffect, useRef } from "react";
import { Message as MessageType } from "../types/ai";
import { Message } from "./Message";
import { Footer } from "./Footer";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { getRandomModerator, getModeratorScript } from "../utils/debateRules";
import { generateAIResponse } from "../utils/aiResponseGenerator";
import { ParticipantSelection } from "./ParticipantSelection";
import { TopicInput } from "./TopicInput";
import { participants } from "../data/participants";

const DEBATE_TIME_LIMIT = 300; // 5 minutes in seconds

export const DebateRoom = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [topic, setTopic] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [isDebating, setIsDebating] = useState(false);
  const [moderatorId, setModeratorId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(DEBATE_TIME_LIMIT);
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleParticipantToggle = (participantId: string) => {
    console.log("Toggling participant:", participantId);
    setSelectedParticipants((prev) =>
      prev.includes(participantId)
        ? prev.filter((id) => id !== participantId)
        : [...prev, participantId]
    );
  };

  const startDebateTimer = () => {
    setTimeRemaining(DEBATE_TIME_LIMIT);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          endDebate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endDebate = () => {
    setIsDebating(false);
    setCurrentSpeaker(null);
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Add closing message from moderator
    if (moderatorId) {
      const closingMessage: MessageType = {
        id: uuidv4(),
        participantId: moderatorId,
        content: "Time's up! This concludes our debate. Thank you all for participating.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, closingMessage]);
    }
    
    toast.success("Debate concluded!");
  };

  const addModeratorMessage = (content: string) => {
    if (!moderatorId) return;
    console.log(`Moderator ${moderatorId} speaking:`, content);

    const newMessage: MessageType = {
      id: uuidv4(),
      participantId: moderatorId,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addParticipantMessage = (participantId: string, topic: string) => {
    const participant = participants.find(p => p.id === participantId);
    if (!participant) {
      console.error(`Participant ${participantId} not found`);
      return;
    }

    setCurrentSpeaker(participantId);
    const response = generateAIResponse(participantId, topic, messages);
    
    const newMessage: MessageType = {
      id: uuidv4(),
      participantId,
      content: response,
      timestamp: new Date(),
    };

    console.log(`Adding message from ${participantId}:`, newMessage.content);
    setMessages((prev) => [...prev, newMessage]);

    // Continue the debate by having the next participant respond
    const nextParticipant = getNextParticipant(participantId);
    if (nextParticipant && isDebating) {
      addParticipantMessage(nextParticipant, topic);
    }
  };

  const getNextParticipant = (currentParticipantId: string) => {
    const currentIndex = selectedParticipants.indexOf(currentParticipantId);
    if (currentIndex === -1) return null;
    
    const nextIndex = (currentIndex + 1) % selectedParticipants.length;
    return selectedParticipants[nextIndex];
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

    setIsDebating(true);
    setMessages([]);

    try {
      const newModeratorId = getRandomModerator(
        participants.map((p) => p.id),
        selectedParticipants
      );
      setModeratorId(newModeratorId);

      // Start the debate timer
      startDebateTimer();

      // Add moderator's introduction
      const moderatorScripts = getModeratorScript(topic);
      moderatorScripts.forEach(script => addModeratorMessage(script));

      // Start with the first participant
      const firstParticipant = selectedParticipants[0];
      addModeratorMessage(
        `I now give the floor to ${
          participants.find((p) => p.id === firstParticipant)?.name
        }`
      );
      addParticipantMessage(firstParticipant, topic);

    } catch (error) {
      console.error("Error during debate:", error);
      toast.error("An error occurred during the debate");
      endDebate();
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

          <div className="bg-card rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Debate Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

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
