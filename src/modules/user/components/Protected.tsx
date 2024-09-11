import { Navigate, Outlet, useLocation, matchPath } from "react-router-dom";
import { ROUTES } from "../../../routes/routeslinks";
import { useAppSelector } from "@/redux/store/store";

const Protected = () => {
  const {RECOVER_ACC, RESET_PWD, REGISTER}=ROUTES;
  const location=useLocation();
  const auth=useAppSelector(state=>state.auth);
  const publicRoutes=['/', REGISTER, RECOVER_ACC, RESET_PWD];
  const protectedRoutes=['/user/:path*'];
  const isProtectedRoute = protectedRoutes.some(route => matchPath(route, location.pathname));
  const isPublicRoute = publicRoutes.some(route => matchPath(route, location.pathname));
  
  if((auth.accessToken && isProtectedRoute) || (!auth.accessToken && isPublicRoute)){
    return <Outlet/>;
  }
  if(!auth.accessToken && isProtectedRoute){
    return <Navigate to={ROUTES.HOME} state={{from:location}} replace />;
  }
  if(auth.accessToken && isPublicRoute){
    return <Navigate to={`/user/${ROUTES.FEEDS}`} state={{from:location}} replace />;
  }
};

export default Protected;
