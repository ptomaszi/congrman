import React, { useState, useContext, useEffect } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import { useHistory } from "react-router-dom";
import axios from "axios";

export interface Auth {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  token: string;
  loginWithRedirect: (options?: RedirectLoginOptions) => void;
  getTokenSilently: () => void;
  getIdTokenClaims: () => void;
  logout: (options: LogoutOptions) => void;
}

export interface Props {
  children: any;
}

export const AuthContext = React.createContext<Auth>({
  isLoading: false,
  isAuthenticated: false,
  user: null,
  token: "",
  loginWithRedirect: (options?: RedirectLoginOptions) => {},
  getTokenSilently: () => {},
  getIdTokenClaims: () => {},
  logout: (options: LogoutOptions) => {}
});

export const AuthProvider = (props: Props) => {
  const [auth0Client, setAuth0Client] = useState<Auth0Client>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState("");
  const history = useHistory();

  const config: Auth0ClientOptions = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN + "",
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID + "",
    redirect_uri: window.location.origin,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE + ""
  };

  useEffect(() => {
    initializeAuth0();
    // eslint-disable-next-line
  }, []);

  const initializeAuth0 = async () => {
    const auth0Client: Auth0Client = await createAuth0Client(config);
    const isAuthenticated = await auth0Client.isAuthenticated();
    setAuth0Client(auth0Client);

    if (window.location.search.includes("code=")) {
      return handleRedirectCallback(auth0Client);
    }

    setIsAuthenticated(isAuthenticated);
    setIsLoading(false);

    const user = isAuthenticated ? await auth0Client.getUser() : null;
    setUser(user);
  };

  const handleRedirectCallback = async (client: Auth0Client) => {
    setIsLoading(true);
    await client.handleRedirectCallback();
    const user = await client.getUser();
    setUser(user);
    setIsLoading(false);
    setIsAuthenticated(true);

    const token = await client.getTokenSilently();
    setToken(token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    window.history.replaceState({}, document.title, window.location.pathname);
    history.push("/home");
  };

  const configObject = {
    isLoading,
    isAuthenticated,
    user,
    token,
    loginWithRedirect: (...p: any) => auth0Client?.loginWithRedirect(...p),
    getTokenSilently: (...p: any) => auth0Client?.getTokenSilently(...p),
    getIdTokenClaims: (...p: any) => auth0Client?.getIdTokenClaims(...p),
    logout: (...p: any) => auth0Client?.logout(...p)
  };

  return <AuthContext.Provider value={configObject}>{props.children}</AuthContext.Provider>;
};

export const useAuthDataContext = () => useContext(AuthContext);
