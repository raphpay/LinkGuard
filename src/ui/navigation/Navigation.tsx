import { Route, Routes } from "react-router-dom";

// Root
import NavigationRoutes from "../../business-logic/navigation/NavigationRoutes";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Pricing from "../screens/Pricing";
// Dashboard

const Navigation: React.FC = () => {
  // Component
  return (
    <Routes>
      {/* ROOT */}
      <Route path={NavigationRoutes.ROOT}>
        <Route index element={<Home />} />
        <Route path={NavigationRoutes.LOGIN} element={<Login />} />
        <Route path={NavigationRoutes.PRICING} element={<Pricing />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
