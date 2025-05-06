import { Link, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import URLService from "../../business-logic/URLService";
import Header from "../components/Header";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setMessage("");

    try {
      // 👇 Scanner l'URL avant de l'enregistrerg
      const result = await URLService.getInstance().scanUrlStatus(url);

      const scan = {
        url,
        email,
        status_code: result.status,
        is_accessible: result.ok,
      };
      // TODO: Integrate API call

      setSuccess(true);
      setMessage(
        result.ok
          ? "URL scannée avec succès ! Elle est accessible."
          : "URL enregistrée, mais inaccessible."
      );
    } catch (err) {
      console.error(err);
      setSuccess(false);
      setMessage("Erreur lors du scan de l'URL.");
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

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <Link className="text-blue-500" size={18} />
              <input
                type="url"
                placeholder="https://votre-site.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-blue-500" size={18} />
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl mt-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Analyse en cours..." : "Scanner gratuitement"}
            </button>
          </form>

          {success !== null && (
            <p
              className={`text-sm mt-4 ${
                success ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
