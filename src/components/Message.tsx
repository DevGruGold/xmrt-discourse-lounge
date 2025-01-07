import { Message as MessageType } from "../types/ai";
import { participants } from "../data/participants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  const participant = participants.find(p => p.id === message.participantId);
  if (!participant) return null;

  return (
    <div className="flex items-start space-x-4 p-4 animate-message-appear">
      <Avatar>
        <AvatarImage src={participant.avatar} alt={participant.name} />
        <AvatarFallback style={{ backgroundColor: participant.color }} className="text-white">
          {participant.name.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold" style={{ color: participant.color }}>
            {participant.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="mt-1 text-sm">{message.content}</p>
      </div>
    </div>
  );
};