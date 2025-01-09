import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { setApiKey } from "../utils/apiKeys";
import { toast } from "sonner";

interface ApiKeyInputProps {
  provider: string;
  onKeySet: () => void;
}

export const ApiKeyInput = ({ provider, onKeySet }: ApiKeyInputProps) => {
  const [apiKey, setApiKeyValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error(`Please enter a valid API key for ${provider}`);
      return;
    }
    setApiKey(provider, apiKey.trim());
    setApiKeyValue("");
    onKeySet();
    toast.success(`${provider} API key set successfully`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col space-y-1">
        <label htmlFor={`${provider}-api-key`} className="text-sm font-medium">
          {provider} API Key
        </label>
        <div className="flex space-x-2">
          <Input
            id={`${provider}-api-key`}
            type="password"
            value={apiKey}
            onChange={(e) => setApiKeyValue(e.target.value)}
            placeholder={`Enter your ${provider} API key`}
            className="flex-1"
          />
          <Button type="submit">Set Key</Button>
        </div>
      </div>
    </form>
  );
};