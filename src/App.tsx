import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./App.css";
import CacheKeys from "./business-logic/enums/CacheKeys";
import IToken from "./business-logic/models/IToken";
import NavigationRoutes from "./business-logic/navigation/NavigationRoutes";
import { setToken } from "./business-logic/redux/slices/tokenReducer";
import CacheService from "./business-logic/services/CacheService";
import Navigation from "./ui/navigation/Navigation";

function App() {
  const { token } = useSelector((state: any) => state.tokens);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Async Methods
  async function dispatchValues() {
    try {
      dispatch(setToken(token));
      CacheService.getInstance().storeValue(CacheKeys.currentUserToken, token);
    } catch (error) {}
  }

  // Lifecycle
  useEffect(() => {
    async function init() {
      // Code
      if (token) {
        navigate(NavigationRoutes.DASHBOARD);
        await dispatchValues();
      } else {
        const cachedToken = CacheService.getInstance().retrieveValue(
          CacheKeys.currentUserToken
        ) as IToken;
        if (cachedToken) dispatch(setToken(cachedToken));
      }
    }
    init();
  }, [token]);

  return <Navigation />;
}

export default App;
