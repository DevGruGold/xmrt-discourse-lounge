
import { ScrollArea } from "./ui/scroll-area";
import { ParticipantCard } from "./ParticipantCard";
import { participants } from "../data/participants";
import { toast } from "sonner";

interface ParticipantSelectionProps {
  selectedParticipants: string[];
  moderatorId: string | null;
  onParticipantToggle: (participantId: string) => void;
}

export const ParticipantSelection = ({
  selectedParticipants,
  moderatorId,
  onParticipantToggle,
}: ParticipantSelectionProps) => {
  const handleParticipantToggle = (participantId: string) => {
    if (moderatorId === participantId) {
      toast.error("The moderator cannot be a debate participant");
      return;
    }
    onParticipantToggle(participantId);
  };

  return (
    <div className="mb-4 bg-card rounded-lg p-3">
      <p className="text-sm text-muted-foreground mb-2">
        Select AI participants (minimum 2):
      </p>
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
  );
};
