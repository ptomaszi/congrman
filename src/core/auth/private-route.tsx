import React from "react";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import { useAuthDataContext } from "./auth-provider";
import { LoginEmbedded } from "../../features/login/login-embedded";

interface PrivateRouteProps extends RouteComponentProps {
  component?: any;
  path: string;
  location: any;
}

const PrivateRoute = ({ component, path, location, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuthDataContext();

  let finalComponent = isAuthenticated() ? component : LoginEmbedded;

  return <Route path={path} component={finalComponent} {...rest} />;
};

export default withRouter(PrivateRoute);
