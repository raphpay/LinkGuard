import { Navigate, Outlet } from "react-router-dom";
import IToken from "../../business-logic/models/IToken";

type ProtectedRouteProps = {
  token: IToken | null;
  redirectPath?: string;
  adminOnly?: boolean;
  isAdmin?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { token, redirectPath = "/" } = props;

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
