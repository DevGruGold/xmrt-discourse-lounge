import { AIParticipant } from "../types/ai";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ParticipantCardProps {
  participant: AIParticipant;
  isActive?: boolean;
  compact?: boolean;
}

export const ParticipantCard = ({ participant, isActive, compact }: ParticipantCardProps) => {
  if (compact) {
    return (
      <Card 
        className={cn(
          "min-w-[120px] transition-all duration-300",
          isActive ? 'ring-2' : '',
          "hover:bg-accent cursor-pointer"
        )}
        style={{ borderColor: participant.color }}
      >
        <CardContent className="p-2 flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={participant.avatar} alt={participant.name} />
            <AvatarFallback style={{ backgroundColor: participant.color }} className="text-white text-xs">
              {participant.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium truncate">{participant.name}</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("transition-all duration-300", isActive ? 'ring-2' : '')} style={{ borderColor: participant.color }}>
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