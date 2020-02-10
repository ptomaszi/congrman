import React, { useState, useContext, useEffect } from "react";
import auth0 from "auth0-js";

export interface Auth {
  isAuthenticated: () => boolean;
  login: (username: string, password: string, onSuccess: () => void, onFail: () => void) => void;
  logout: () => void;
  getUser: () => any;
}

export interface Props {
  children: any;
}

export const AuthContext = React.createContext<Auth>({
  isAuthenticated: () => false,
  login: () => {},
  getUser: () => {},
  logout: () => {}
});

export const AuthEmbeddedProvider = (props: Props) => {
  const [webAuth, setWebAuth] = useState<auth0.WebAuth>();

  useEffect(() => {
    initialiseWebAuth();
  }, []);

  const initialiseWebAuth = () => {
    const webAuth = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN + "",
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID + "",
      audience: process.env.REACT_APP_AUTH0_AUDIENCE + "",
      scope: "openid",
      redirectUri: window.location.origin
    });
    setWebAuth(webAuth);
    return webAuth;
  };

  const handleLogin = (username: string, password: string, onSuccess: () => void, onFail: () => void) => {
    webAuth?.client.login({ realm: "Username-Password-Authentication", username, password }, (err, data) => {
      if (err) {
        localStorage.removeItem("user");
        localStorage.removeItem("authenticated");
        localStorage.removeItem("api_token");
        onFail();
        return;
      }
      webAuth.client.userInfo(data.accessToken, (err, user) => {
        if (user) {
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("api_token", data.accessToken);
          onSuccess();
        }
      });
    });
  };

  const handleGetUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };

  const handleLogout = () => {
    webAuth?.logout({ returnTo: window.location.origin });
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
  };

  const configObject = {
    isAuthenticated: () => (localStorage.getItem("authenticated") ? true : false),
    login: (username: string, password: string, onSuccess: () => void, onFail: () => void) =>
      handleLogin(username, password, onSuccess, onFail),
    getUser: () => handleGetUser(),
    logout: () => handleLogout()
  };

  return <AuthContext.Provider value={configObject}>{props.children}</AuthContext.Provider>;
};

export const useAuthDataContext = () => useContext(AuthContext);
