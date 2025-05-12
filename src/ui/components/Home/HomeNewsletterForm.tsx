import { Mail, Rss } from "lucide-react";

interface HomeNewsletterFormProps {
  newsletterContent: string;
  setNewsletterContent: React.Dispatch<React.SetStateAction<string>>;
  extractedUrls: string[];
  setExtractedUrls: React.Dispatch<React.SetStateAction<string[]>>;
  editingUrl: string | null;
  setEditingUrl: React.Dispatch<React.SetStateAction<string | null>>;
  editUrlValue: string;
  setEditUrlValue: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function HomeNewsletterForm({
  newsletterContent,
  setNewsletterContent,
  extractedUrls,
  setExtractedUrls,
  editingUrl,
  setEditingUrl,
  editUrlValue,
  setEditUrlValue,
  email,
  setEmail,
}: HomeNewsletterFormProps) {
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

  return (
    <>
      <div className="flex justify-center">
        <Rss className="text-blue-500" size={18} />
      </div>
      <textarea
        rows={6}
        placeholder="Collez ici le contenu HTML ou texte de votre newsletter..."
        value={newsletterContent}
        onChange={handleNewsletterContentChange}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        required
      />

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

      <div className="mt-4 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-4">
        <h3 className="font-semibold mb-2">URLs extraites :</h3>
        <ul className="space-y-2">
          {extractedUrls.map((url) => (
            <li key={url} className="flex justify-between items-center">
              {editingUrl === url ? (
                <>
                  <input
                    type="text"
                    value={editUrlValue}
                    onChange={(e) => setEditUrlValue(e.target.value)}
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
    </>
  );
}
