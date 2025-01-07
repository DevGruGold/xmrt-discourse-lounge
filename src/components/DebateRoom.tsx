import { useState } from "react";
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

export const DebateRoom = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [topic, setTopic] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const handleParticipantToggle = (participantId: string) => {
    console.log("Toggling participant:", participantId);
    setSelectedParticipants(prev => {
      if (prev.includes(participantId)) {
        return prev.filter(id => id !== participantId);
      }
      return [...prev, participantId];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast.error("Please enter a topic for debate");
      return;
    }
    if (selectedParticipants.length < 2) {
      toast.error("Please select at least 2 AI participants");
      return;
    }

    // In a real implementation, this would trigger API calls to the various AI services
    console.log("New topic submitted:", topic);
    console.log("Selected participants:", selectedParticipants);
    toast.success("Debate started!");
    setTopic("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="container py-4 md:py-6 px-4 md:px-8 flex-grow flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">XMRT Debate</h1>
        
        <ScrollArea className="h-20 md:h-24 mb-4">
          <div className="flex gap-2 p-1 md:gap-3">
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

        <div className="bg-card rounded-lg shadow-lg p-3 md:p-4 mb-4">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic for debate..."
              className="flex-1 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
            <Button 
              type="submit" 
              className="w-full sm:w-auto"
              disabled={!topic.trim() || selectedParticipants.length < 2}
            >
              <Send className="w-4 h-4 mr-2" />
              Start Debate
            </Button>
          </form>
        </div>

        <div className="space-y-4 flex-grow overflow-auto">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No messages yet. Start a debate by selecting AI participants and entering a topic above!
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};