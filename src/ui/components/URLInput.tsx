import { useState } from "react";

interface URLInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function URLInput({ value, setValue }: URLInputProps) {
  const [urlError, setUrlError] = useState<string | null>(null);

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  return (
    <div className="mb-4 flex-1">
      <input
        type="text"
        placeholder="https://votre-site.com"
        value={value}
        onChange={(e) => {
          const inputValue = e.target.value;
          setValue(inputValue);
          setUrlError(isValidUrl(inputValue) ? null : "URL invalide");
        }}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      {urlError && <p className="text-sm text-red-600 mt-1">{urlError}</p>}
    </div>
  );
}
