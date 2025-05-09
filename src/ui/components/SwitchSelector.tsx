import ScanMode from "../../business-logic/enums/ScanMode";

interface SwitchSelectorProps {
  mode: ScanMode;
  setMode: React.Dispatch<React.SetStateAction<ScanMode>>;
}

export default function SwitchSelector({ mode, setMode }: SwitchSelectorProps) {
  // Render
  return (
    <div className="mb-6 flex justify-center gap-4">
      <button
        type="button"
        onClick={() => setMode(ScanMode.url)}
        className={`px-4 py-2 rounded-xl text-sm font-medium ${
          mode === ScanMode.url
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Scanner une URL
      </button>
      <button
        type="button"
        onClick={() => setMode(ScanMode.newsletter)}
        className={`px-4 py-2 rounded-xl text-sm font-medium ${
          mode === ScanMode.newsletter
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Scanner une newsletter
      </button>
    </div>
  );
}
