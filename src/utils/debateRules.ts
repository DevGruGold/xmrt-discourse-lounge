export const SPEAKER_TIME_LIMIT = 60; // 1 minute in seconds
export const DEBATE_RULES = {
  opening: "2 minutes for opening statements",
  response: "1 minute for responses",
  rebuttal: "30 seconds for rebuttals",
  closing: "1 minute for closing statements"
};

export const getRandomModerator = (participants: string[], selectedParticipants: string[]) => {
  const availableModerators = participants.filter(p => !selectedParticipants.includes(p));
  const randomIndex = Math.floor(Math.random() * availableModerators.length);
  return availableModerators[randomIndex];
};

export const getModeratorScript = (topic: string) => [
  `Welcome to today's debate on the topic: ${topic}`,
  "Each participant will have 1 minute to present their perspective.",
  "Please maintain respectful discourse throughout the debate.",
  "I will moderate the discussion and ensure equal speaking time.",
];