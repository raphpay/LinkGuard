import { Link, Mail } from "lucide-react";

import URLInput from "../URLInput";

interface HomeURLForm {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function HomeURLForm({
  url,
  setUrl,
  email,
  setEmail,
}: HomeURLForm) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Link className="text-blue-500" size={18} />
        <URLInput value={url} setValue={setUrl} />
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
    </>
  );
}
