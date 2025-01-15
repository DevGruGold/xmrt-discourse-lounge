export const getApiKey = (provider: string): string | null => {
  const envKey = `VITE_${provider.toUpperCase()}_API_KEY`;
  return import.meta.env[envKey] || null;
};

// These functions are kept but will now be no-ops since we're using env vars
export const setApiKey = (provider: string, key: string) => {
  console.log(`API keys are now managed through environment variables`);
};

export const clearApiKeys = () => {
  console.log(`API keys are now managed through environment variables`);
};