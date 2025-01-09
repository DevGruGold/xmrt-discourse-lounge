import { Progress } from "./ui/progress";
import { participants } from "../data/participants";
import { SPEAKER_TIME_LIMIT } from "../utils/debateRules";

interface CurrentSpeakerProps {
  currentSpeaker: string | null;
  timeRemaining: number;
}

export const CurrentSpeaker = ({ currentSpeaker, timeRemaining }: CurrentSpeakerProps) => {
  if (!currentSpeaker) return null;

  return (
    <div className="mb-4 bg-card rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">
          Current Speaker: {participants.find((p) => p.id === currentSpeaker)?.name}
        </span>
        <span className="text-sm text-muted-foreground">
          Time Remaining: {timeRemaining}s
        </span>
      </div>
      <Progress value={(timeRemaining / SPEAKER_TIME_LIMIT) * 100} />
    </div>
  );
};