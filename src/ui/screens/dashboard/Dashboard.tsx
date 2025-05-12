import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import IScan, {
  IScanBulkInput,
  IScanInput,
} from "../../../business-logic/models/IScan";
import ScanService from "../../../business-logic/services/ScanService";
import UserService from "../../../business-logic/services/UserService";

import ScanMode from "../../../business-logic/enums/ScanMode";
import Header from "../../components/Header";
import SwitchSelector from "../../components/SwitchSelector";
import URLInput from "../../components/URLInput";

export default function Dashboard() {
  const [scans, setScans] = useState<IScan[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [urlToScan, setUrlToScan] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [filter, setFilter] = useState("");
  const [mode, setMode] = useState<ScanMode>(ScanMode.url);
  const [newsletterContent, setNewsletterContent] = useState<string>("");
  const [extractedUrls, setExtractedUrls] = useState<string[]>([]);
  const [editingUrl, setEditingUrl] = useState<string | null>(null);
  const [editUrlValue, setEditUrlValue] = useState<string>("");

  const { token } = useSelector((state: any) => state.tokens);

  // Extract URLs from the newsletter content
  function extractUrlsFromNewsletter(text: string): string[] {
    const regex = /https?:\/\/[^\s"'<>]+/g;
    return Array.from(new Set(text.match(regex) || []));
  }

  // Handle content change in the newsletter textarea
  const handleNewsletterContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const content = e.target.value;
    setNewsletterContent(content);
    const urls = extractUrlsFromNewsletter(content);
    setExtractedUrls(urls);
  };

  // Handle removal of a URL from the list
  const removeUrl = (url: string) => {
    setExtractedUrls(extractedUrls.filter((u) => u !== url));
  };

  // Save the edited URL
  const saveEditedUrl = () => {
    if (editingUrl && editUrlValue) {
      setExtractedUrls(
        extractedUrls.map((url) => (url === editingUrl ? editUrlValue : url))
      );
      setEditingUrl(null); // Stop editing
      setEditUrlValue(""); // Clear input field
    }
  };

  // Handle the edit of a URL
  const startEditingUrl = (url: string) => {
    setEditingUrl(url);
    setEditUrlValue(url); // Set the value of the URL to be edited
  };

  async function getScans() {
    try {
      const apiScans = await UserService.getInstance().getScans(
        token.user.id,
        token
      );
      const filtered = apiScans.filter((scan) =>
        scan.input.toLowerCase().includes(filter.toLowerCase())
      );
      const start = (currentPage - 1) * itemsPerPage;
      const paginated = filtered.slice(start, start + itemsPerPage);
      setScans(paginated);
    } catch (error) {
      console.log("error fetching scans");
    }
  }

  async function handleScan() {
    if (mode === ScanMode.url) {
      try {
        const input: IScanInput = {
          input: urlToScan,
          userID: token.user.id,
        };
        await ScanService.getInstance().scan(input, token);
        setUrlToScan("");
        setShowModal(false);
        await getScans();
      } catch (error) {
        console.log("Error scanning url");
      }
    } else {
      try {
        const currentUser = await UserService.getInstance().getUser(
          token.user.id,
          token
        );
        const input: IScanBulkInput = {
          urls: extractedUrls,
          userID: token.user.id,
        };
        await ScanService.getInstance().scanBulk(input);
        setShowModal(false);
      } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage === "forbidden.quotaReached") {
          setScanError("Vous avez atteint votre quota de scans");
        }
      }
    }
  }

  useEffect(() => {
    getScans();
  }, [filter, currentPage]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-20 pt-32 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-6">Mes scans</h1>
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              Faire un scan
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Filtrer par URL"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-2 py-1 rounded"
            />
          </div>
          <table className="w-full border shadow-sm">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-2 text-center">URL</th>
                <th className="p-2 text-center">Date</th>
                <th className="p-2 text-center">Statut</th>
                <th className="p-2 text-center">Accessible</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan, idx) => (
                <tr key={idx} className="even:bg-white odd:bg-gray-50">
                  <td className="p-2">{scan.input}</td>
                  <td className="p-2">
                    {new Date(scan.createdAt).toLocaleDateString()}
                  </td>
                  {scan.linkResult && (
                    <>
                      <td className="p-2">{scan.linkResult.statusCode}</td>
                      <td className="p-2">
                        {scan.linkResult.isAccessible ? "✅" : "❌"}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="space-x-2 mt-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Précédent
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-2 py-1 border rounded"
            >
              Suivant
            </button>
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/75 transition-opacity">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-xl font-semibold mb-4">Nouveau scan</h2>
              {scanError && (
                <p className="text-sm mt-1 text-red-600 mb-2">{scanError}</p>
              )}
              <SwitchSelector mode={mode} setMode={setMode} />
              {mode === ScanMode.url ? (
                <URLInput value={urlToScan} setValue={setUrlToScan} />
              ) : (
                <div>
                  <textarea
                    rows={6}
                    placeholder="Collez ici le contenu HTML ou texte de votre newsletter..."
                    value={newsletterContent}
                    onChange={handleNewsletterContentChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                  <div className="mt-4 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold mb-2">URLs extraites :</h3>
                    <ul className="space-y-2">
                      {extractedUrls.map((url) => (
                        <li
                          key={url}
                          className="flex justify-between items-center"
                        >
                          {editingUrl === url ? (
                            <>
                              <input
                                type="text"
                                value={editUrlValue}
                                onChange={(e) =>
                                  setEditUrlValue(e.target.value)
                                }
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                              />
                              <button
                                type="button"
                                onClick={saveEditedUrl}
                                className="text-green-500 hover:text-green-700"
                              >
                                Enregistrer
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="text-blue-500">{url}</span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => startEditingUrl(url)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  Éditer
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeUrl(url)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Supprimer
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleScan}
                  disabled={!!urlError}
                >
                  Scanner
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
