
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface TopicInputProps {
  topic: string;
  isDebating: boolean;
  selectedParticipants: string[];
  onTopicChange: (topic: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const TopicInput = ({
  topic,
  isDebating,
  selectedParticipants,
  onTopicChange,
  onSubmit,
}: TopicInputProps) => {
  return (
    <div className="bg-card rounded-lg shadow-lg p-3 md:p-4 mb-4">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
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
  );
};
