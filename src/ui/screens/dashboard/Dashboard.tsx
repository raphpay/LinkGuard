import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import IScan from "../../../business-logic/models/IScan";
import UserService from "../../../business-logic/services/UserService";

import Header from "../../components/Header";

export default function Dashboard() {
  const [scans, setScans] = useState<IScan[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [urlToScan, setUrlToScan] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);

  const { token } = useSelector((state: any) => state.tokens);

  async function getScans() {
    try {
      const apiScans = await UserService.getInstance().getScans(
        token.user.id,
        token
      );
      setScans(apiScans);
    } catch (error) {
      console.log("error fetching scans");
    }
  }

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async function handleScan() {
    // TODO
  }

  useEffect(() => {
    async function init() {
      getScans();
    }
    init();
  }, []);

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
          <table className="w-full border shadow-sm">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-2">URL</th>
                <th className="p-2">Date</th>
                <th className="p-2">Statut</th>
                <th className="p-2">Accessible</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan, idx) => (
                <tr key={idx} className="even:bg-white odd:bg-gray-50">
                  <td className="p-2">{scan.input}</td>
                  <td className="p-2">
                    {new Date(scan.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">{scan.linkResult.statusCode}</td>
                  <td className="p-2">
                    {scan.linkResult.isAccessible ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/75 transition-opacity">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-xl font-semibold mb-4">Nouveau scan</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Entrez une URL"
                  value={urlToScan}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setUrlToScan(inputValue);
                    setUrlError(isValidUrl(inputValue) ? null : "URL invalide");
                  }}
                  className="w-full border p-2 rounded"
                />
                {urlError && (
                  <p className="text-sm text-red-600 mt-1">{urlError}</p>
                )}
              </div>
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
