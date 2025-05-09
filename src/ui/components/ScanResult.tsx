import IScan from "../../business-logic/models/IScan";

interface ScanResultProps {
  scan: IScan;
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setExtractedUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ScanResult({
  scan,
  setSuccess,
  setMessage,
  setExtractedUrls,
}: ScanResultProps) {
  return (
    <div key={scan.input} className="flex justify-between items-start mb-4">
      <div>
        <a
          href={scan.input}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {scan.input}
        </a>
        <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center ${
              scan.linkResult.isAccessible
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {scan.linkResult.isAccessible ? "✅ Valid" : "❌ Inaccessible"}
          </span>
          <span>Response: {scan.linkResult.statusCode}</span>
          <span>{scan.linkResult.responseTime}</span>
        </div>
      </div>
      <div className="flex flex-col items-end text-sm text-gray-500">
        <div className="flex items-center gap-4 mt-2">
          <button className="hover:text-gray-700" title="Export">
            ⬇️ Export
          </button>
          <button
            onClick={() => {
              setSuccess(null);
              setMessage("");
              setExtractedUrls([]);
            }}
            className="hover:text-red-600"
            title="Clear"
          >
            🗑️ Clear
          </button>
        </div>
      </div>
    </div>
  );
}
