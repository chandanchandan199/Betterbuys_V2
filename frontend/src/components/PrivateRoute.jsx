import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux/";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="login" replace />;
  // replace is used to replace the past history if any
};

export default PrivateRoute;
