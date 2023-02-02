import { Outlet, Navigate } from "react-router-dom";
import { authenticated } from "../state/reducers/auth";
import { useSelector } from "react-redux";
const privateRoute = () => {
  const auth = useSelector(authenticated);
  const content = <>{auth ? <Outlet /> : <Navigate to="sign-in" />}</>;
};

export default privateRoute;
