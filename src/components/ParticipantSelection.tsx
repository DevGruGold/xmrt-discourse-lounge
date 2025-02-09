
import { ScrollArea } from "./ui/scroll-area";
import { ParticipantCard } from "./ParticipantCard";
import { participants, MODERATOR_ID, ALLOWED_DEBATERS } from "../data/participants";
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
  const moderator = participants.find(p => p.id === MODERATOR_ID);
  const debaters = participants.filter(p => ALLOWED_DEBATERS.includes(p.id));

  const handleParticipantToggle = (participantId: string) => {
    if (selectedParticipants.length >= 2 && !selectedParticipants.includes(participantId)) {
      toast.error("You can only select two AI participants for the debate");
      return;
    }
    onParticipantToggle(participantId);
  };

  return (
    <div className="space-y-4">
      <div className="patriotic-card rounded-lg p-3">
        <p className="text-sm text-muted-foreground mb-2">Debate Moderator:</p>
        {moderator && (
          <ParticipantCard
            key={moderator.id}
            participant={moderator}
            isActive={true}
            compact
          />
        )}
      </div>
      
      <div className="patriotic-card rounded-lg p-3">
        <p className="text-sm text-muted-foreground mb-2">
          Select two American AIs for the debate:
        </p>
        <ScrollArea className="h-24 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {debaters.map((participant) => (
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
    </div>
  );
};
