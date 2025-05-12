import { FormEvent, useState } from "react";
import ScanMode from "../../business-logic/enums/ScanMode";
import IScan, {
  IScanBulkInputWithoutAccount,
  IScanInputWithoutAccount,
} from "../../business-logic/models/IScan";
import ScanService from "../../business-logic/services/ScanService";

import Header from "../components/Header";
import HomeNewsletterForm from "../components/Home/HomeNewsletterForm";
import HomeURLForm from "../components/Home/HomeURLForm";
import ScanResult from "../components/ScanResult";
import SwitchSelector from "../components/SwitchSelector";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState<IScan[] | null>(null);

  const [mode, setMode] = useState<ScanMode>(ScanMode.url);
  const [newsletterContent, setNewsletterContent] = useState<string>("");
  const [extractedUrls, setExtractedUrls] = useState<string[]>([]);
  const [editingUrl, setEditingUrl] = useState<string | null>(null);
  const [editUrlValue, setEditUrlValue] = useState<string>("");

  // Handle submit (scan)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setScanResults(null);

    try {
      if (mode === ScanMode.url) {
        const input: IScanInputWithoutAccount = { input: url, email };
        const scan = await ScanService.getInstance().scanWithoutAccount(input);
        setSuccess(true);
        setScanResults([scan]);
      } else {
        const input: IScanBulkInputWithoutAccount = {
          urls: extractedUrls,
          email,
        };
        const scans = await ScanService.getInstance().scanBulkWithoutAccount(
          input
        );
        setSuccess(true);
        setScanResults(scans);
      }
    } catch (err) {
      console.error(err);
      setSuccess(false);
      const error = (err as Error).message;
      if (error == "forbidden.quotaReached") {
        setMessage(
          "Vous ne pouvez scanner qu'une URL. Connectez vous pour en scanner plus"
        );
      } else {
        setMessage("Erreur lors du scan des URLs.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-20 pt-32 flex flex-col items-center justify-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🛡️ LinkGuard
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Surveillez vos liens. Gagnez en crédibilité.
            <br />
            LinkGuard vérifie automatiquement vos sites et newsletters.
          </p>

          <SwitchSelector mode={mode} setMode={setMode} />

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-4"
          >
            {mode === ScanMode.url ? (
              <HomeURLForm
                url={url}
                setUrl={setUrl}
                email={email}
                setEmail={setEmail}
              />
            ) : (
              <HomeNewsletterForm
                newsletterContent={newsletterContent}
                setNewsletterContent={setNewsletterContent}
                extractedUrls={extractedUrls}
                setExtractedUrls={setExtractedUrls}
                editingUrl={editingUrl}
                setEditingUrl={setEditingUrl}
                editUrlValue={editUrlValue}
                setEditUrlValue={setEditUrlValue}
                email={email}
                setEmail={setEmail}
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl mt-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Analyse en cours..."
                : mode === ScanMode.url
                ? "Scanner gratuitement"
                : "Scanner la newsletter"}
            </button>
          </form>

          {/* {success !== null && (
            <p
              className={`text-sm mt-4 ${
                success ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )} */}

          {message !== null && (
            <p className="text-sm mt-4 text-red-500">{message}</p>
          )}

          {success !== null && scanResults && scanResults.length > 0 && (
            <div className="mt-6 w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-3">
                Verification Results
              </h2>
              {scanResults.map((scan) => (
                <ScanResult
                  scan={scan}
                  setSuccess={setSuccess}
                  setMessage={setMessage}
                  setExtractedUrls={setExtractedUrls}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
