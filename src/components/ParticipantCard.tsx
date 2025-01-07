import { AIParticipant } from "../types/ai";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ParticipantCardProps {
  participant: AIParticipant;
  isActive?: boolean;
}

export const ParticipantCard = ({ participant, isActive }: ParticipantCardProps) => {
  return (
    <Card className={`transition-all duration-300 ${isActive ? 'ring-2' : ''}`} style={{ borderColor: participant.color }}>
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