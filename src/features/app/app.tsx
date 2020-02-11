import React, { useEffect } from "react";
import { Layout } from "../layout/layout";
import { AuthProvider } from "../../core/auth/auth-provider";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "../../core/auth/private-route";
import { LoginEmbedded } from "../login/login-embedded";
import firebase from "firebase";
import { firebaseConfig } from "../../firebase.config";

export const App = () => {
  useEffect(() => {
    async function init() {
      firebase.initializeApp(firebaseConfig);
    }

    init();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" component={LoginEmbedded} exact />
          <PrivateRoute path="/home" component={Layout} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};
