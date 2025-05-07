import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeToken } from "../../business-logic/redux/slices/tokenReducer";
import { removeCurrentUser } from "../../business-logic/redux/slices/userReducer";
import CacheService from "../../business-logic/services/CacheService";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  const dispatch = useDispatch();

  function logout() {
    dispatch(removeToken());
    dispatch(removeCurrentUser());
    CacheService.getInstance().clearStorage();
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-blue-600">
            🛡️ LinkGuard
          </Link>
        </div>
        <nav>
          <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-4">
            <Link
              to="/pricing"
              className="text-blue-600 font-medium hover:underline flex items-center"
            >
              Tarifs
            </Link>
            <div>
              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Déconnexion
                </button>
              ) : (
                <div className="flex flex-row sm:flex-row items-center gap-2 sm:gap-4">
                  <Link
                    to="/auth/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="text-blue-600 font-medium hover:underline flex items-center"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
