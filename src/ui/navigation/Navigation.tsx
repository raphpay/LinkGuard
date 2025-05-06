import { Route, Routes } from "react-router-dom";

import NavigationRoutes from "../../business-logic/navigation/NavigationRoutes";

import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import Home from "../screens/Home";
import Pricing from "../screens/Pricing";

// Dashboard

const Navigation: React.FC = () => {
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
    </Routes>
  );
};

export default Navigation;
