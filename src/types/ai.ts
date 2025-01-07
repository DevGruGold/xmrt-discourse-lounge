export interface AIParticipant {
  id: string;
  name: string;
  company: string;
  avatar: string;
  color: string;
  description: string;
}

export interface Message {
  id: string;
  participantId: string;
  content: string;
  timestamp: Date;
}