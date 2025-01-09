import { ApiKeyInput } from "./ApiKeyInput";

interface ApiKeySectionProps {
  onKeySet: () => void;
}

export const ApiKeySection = ({ onKeySet }: ApiKeySectionProps) => {
  return (
    <div className="mb-4 bg-card rounded-lg p-4 space-y-4">
      <h2 className="text-lg font-semibold">Set API Keys</h2>
      <div className="space-y-4">
        <ApiKeyInput provider="openai" onKeySet={onKeySet} />
        <ApiKeyInput provider="anthropic" onKeySet={onKeySet} />
        <ApiKeyInput provider="google" onKeySet={onKeySet} />
        <ApiKeyInput provider="meta" onKeySet={onKeySet} />
        <ApiKeyInput provider="deepseek" onKeySet={onKeySet} />
      </div>
    </div>
  );
};