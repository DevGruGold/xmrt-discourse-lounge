// Store API keys in memory (not persistent)
let apiKeys: { [key: string]: string } = {};

export const setApiKey = (provider: string, key: string) => {
  console.log(`Setting API key for ${provider}`);
  apiKeys[provider] = key;
};

export const getApiKey = (provider: string): string | null => {
  return apiKeys[provider] || null;
};

export const clearApiKeys = () => {
  apiKeys = {};
};