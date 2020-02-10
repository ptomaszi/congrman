import React from "react";
import { Layout } from "../layout/layout";
import { AuthEmbeddedProvider } from "../../core/auth/auth-embedded-provider";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "../../core/auth/private-route";
import { LoginEmbedded } from "../login/login-embedded";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthEmbeddedProvider>
        <Switch>
          <Route path="/" component={LoginEmbedded} exact />
          <PrivateRoute path="/home" component={Layout} />
        </Switch>
      </AuthEmbeddedProvider>
    </BrowserRouter>
  );
};
