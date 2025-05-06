export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600">🛡️ LinkGuard</span>
        </div>
        <nav>
          <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-4">
            <a
              href="/pricing"
              className="text-blue-600 font-medium hover:underline flex items-center"
            >
              Tarifs
            </a>
            <div className="flex flex-row sm:flex-row items-center gap-2 sm:gap-4">
              <a
                href="/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Connexion
              </a>
              <a
                href="/auth/signup"
                className="text-blue-600 font-medium hover:underline flex items-center"
              >
                Inscription
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
