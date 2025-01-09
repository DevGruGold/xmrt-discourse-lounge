export const SPEAKER_TIME_LIMIT = 60; // 1 minute in seconds
export const DEBATE_RULES = {
  opening: "2 minutes for opening statements",
  response: "1 minute for responses",
  rebuttal: "30 seconds for rebuttals",
  closing: "1 minute for closing statements"
};

export const getRandomModerator = (allParticipants: string[], selectedParticipants: string[]) => {
  // Filter out selected participants to ensure moderator is not a debater
  const availableModerators = allParticipants.filter(p => !selectedParticipants.includes(p));
  
  // If no available moderators, use a random participant (fallback)
  if (availableModerators.length === 0) {
    console.warn('No available moderators, using a participant as moderator');
    return allParticipants[Math.floor(Math.random() * allParticipants.length)];
  }
  
  console.log('Available moderators:', availableModerators);
  const selectedModerator = availableModerators[Math.floor(Math.random() * availableModerators.length)];
  console.log('Selected moderator:', selectedModerator);
  return selectedModerator;
};

export const getModeratorScript = (topic: string) => [
  `Welcome to today's debate on the topic: ${topic}`,
  "Each participant will have 1 minute to present their perspective.",
  "Please maintain respectful discourse throughout the debate.",
  "Let me introduce our participants and begin the debate.",
];