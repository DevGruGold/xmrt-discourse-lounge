import { useState, useEffect } from "react";
import { participants } from "../data/participants";
import { Message as MessageType, AIParticipant } from "../types/ai";
import { ParticipantCard } from "./ParticipantCard";
import { Message } from "./Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Footer } from "./Footer";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

export const DebateRoom = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [topic, setTopic] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [isDebating, setIsDebating] = useState(false);

  const handleParticipantToggle = (participantId: string) => {
    console.log("Toggling participant:", participantId);
    setSelectedParticipants(prev => {
      if (prev.includes(participantId)) {
        return prev.filter(id => id !== participantId);
      }
      return [...prev, participantId];
    });
  };

  const simulateAIResponse = async (participantId: string, topic: string) => {
    const participant = participants.find(p => p.id === participantId);
    if (!participant) return;

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    const newMessage: MessageType = {
      id: uuidv4(),
      participantId,
      content: `${participant.name} discussing: ${topic}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
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
    setMessages([]); // Clear previous messages

    // Initial message
    const initialMessage: MessageType = {
      id: uuidv4(),
      participantId: selectedParticipants[0],
      content: `Starting a debate on: ${topic}`,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);

    // Simulate responses from each AI
    for (const participantId of selectedParticipants) {
      await simulateAIResponse(participantId, topic);
    }

    setIsDebating(false);
    toast.success("Debate started!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="container py-4 md:py-6 px-4 md:px-8 flex-grow flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">XMRT Debate</h1>
        
        <div className="mb-4 bg-card rounded-lg p-3">
          <p className="text-sm text-muted-foreground mb-2">Select AI participants (minimum 2):</p>
          <ScrollArea className="h-24 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {participants.map((participant) => (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                  isActive={selectedParticipants.includes(participant.id)}
                  compact
                  onClick={() => handleParticipantToggle(participant.id)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-3 md:p-4 mb-4">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic for debate..."
              className="flex-1 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              disabled={isDebating}
            />
            <Button 
              type="submit" 
              className="w-full sm:w-auto"
              disabled={!topic.trim() || selectedParticipants.length < 2 || isDebating}
            >
              <Send className="w-4 h-4 mr-2" />
              {isDebating ? "Debating..." : "Start Debate"}
            </Button>
          </form>
        </div>

        <div className="flex-grow overflow-auto bg-card rounded-lg">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              {messages.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No messages yet. Start a debate by selecting AI participants and entering a topic above!
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