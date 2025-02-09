
import { AIParticipant } from "../types/ai";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ParticipantCardProps {
  participant: AIParticipant;
  isActive?: boolean;
  compact?: boolean;
  onClick?: () => void;
}

export const ParticipantCard = ({ participant, isActive, compact, onClick }: ParticipantCardProps) => {
  if (compact) {
    return (
      <Card 
        className={cn(
          "transition-all duration-300 h-full",
          isActive ? 'ring-2 ring-primary' : '',
          "hover:bg-accent cursor-pointer"
        )}
        style={{ borderColor: participant.color }}
        onClick={onClick}
      >
        <CardContent className="p-1.5 flex items-center gap-1.5">
          <Avatar className="h-6 w-6 shrink-0">
            <AvatarImage src={participant.avatar} alt={participant.name} />
            <AvatarFallback style={{ backgroundColor: participant.color }} className="text-white text-[10px]">
              {participant.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium truncate">{participant.name}</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-300", 
        isActive ? 'ring-2 ring-primary' : '',
        "hover:bg-accent cursor-pointer"
      )} 
      style={{ borderColor: participant.color }}
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={participant.avatar} alt={participant.name} />
          <AvatarFallback style={{ backgroundColor: participant.color }} className="text-white">
            {participant.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{participant.name}</h3>
          <p className="text-sm text-muted-foreground">{participant.company}</p>
        </div>
      </CardContent>
    </Card>
  );
};
