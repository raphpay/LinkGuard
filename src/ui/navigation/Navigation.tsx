import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import NavigationRoutes from "../../business-logic/navigation/NavigationRoutes";

import ProtectedRoute from "./ProtectedRoute";

// Root
import Home from "../screens/Home";
import Pricing from "../screens/Pricing";
// Auth
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
// Dashboard
import Account from "../screens/dashboard/Account";
import AuthPricing from "../screens/dashboard/AuthPricing";
import Dashboard from "../screens/dashboard/Dashboard";

const Navigation: React.FC = () => {
  const { token } = useSelector((state: any) => state.tokens);
  // Component
  return (
    <Routes>
      {/* ROOT */}
      <Route path={NavigationRoutes.ROOT}>
        <Route index element={<Home />} />
        <Route path={NavigationRoutes.PRICING} element={<Pricing />} />
        <Route path={NavigationRoutes.LOGIN} element={<Login />} />
        <Route path={NavigationRoutes.SIGNUP} element={<SignUp />} />
      </Route>
      {/* DASHBOARD */}
      <Route
        path={NavigationRoutes.DASHBOARD}
        element={<ProtectedRoute token={token} />}
      >
        <Route index element={<Dashboard />} />
      </Route>
      <Route
        path={NavigationRoutes.ACCOUNT}
        element={<ProtectedRoute token={token} />}
      >
        <Route index element={<Account />} />
      </Route>
      <Route
        path={NavigationRoutes.AUTH_PRICING}
        element={<ProtectedRoute token={token} />}
      >
        <Route index element={<AuthPricing />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
