import { useState } from "react";
import { participants } from "../data/participants";
import { Message as MessageType } from "../types/ai";
import { ParticipantCard } from "./ParticipantCard";
import { Message } from "./Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export const DebateRoom = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    // In a real implementation, this would trigger API calls to the various AI services
    console.log("New topic submitted:", topic);
    setTopic("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">XMRT Debate</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {participants.map((participant) => (
            <ParticipantCard
              key={participant.id}
              participant={participant}
              isActive={messages.some(m => m.participantId === participant.id)}
            />
          ))}
        </div>

        <div className="bg-card rounded-lg shadow-lg p-4 mb-8">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic for debate..."
              className="flex-1"
            />
            <Button type="submit">
              <Send className="w-4 h-4 mr-2" />
              Start Debate
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No messages yet. Start a debate by entering a topic above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};