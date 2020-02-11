import React, { useState, useContext } from "react";
import firebase, { User } from "firebase";

export interface Auth {
  isLoading: boolean;
  isAuthenticated: () => boolean;
  login: (username: string, password: string, onSuccess: () => void, onFail: () => void) => void;
  logout: (onSuccess: () => void) => void;
  user: User;
}

export interface Props {
  children: any;
}

export const AuthContext = React.createContext<Auth>({
  isLoading: false,
  isAuthenticated: () => false,
  login: (username: string, password: string, onSuccess: () => void, onFail: () => void) => {},
  logout: (onSuccess: () => void) => {},
  user: {} as User
});

export const AuthProvider = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  const handleLogin = async (username: string, password: string, onSuccess: () => void, onFail: () => void) => {
    setIsLoading(true);
    let response: firebase.auth.UserCredential = {} as firebase.auth.UserCredential;

    try {
      response = await firebase.auth().signInWithEmailAndPassword(username, password);
      setUser(response.user);
      onSuccess();
      localStorage.setItem("authenticated", "true");
    } catch (error) {
      localStorage.removeItem("authenticated");
      setUser(null);
      onFail();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = (onSuccess: () => void) => {
    localStorage.removeItem("authenticated");
    setUser(null);
  };

  const handleIsAuthenticated = () => {
    return localStorage.getItem("authenticated") === "true";
  };

  const configObject = {
    isLoading,
    isAuthenticated: () => handleIsAuthenticated(),
    login: (username: string, password: string, onSuccess: () => void, onFail: () => void) =>
      handleLogin(username, password, onSuccess, onFail),
    logout: (onSuccess: () => void) => handleLogout(onSuccess),
    user: user
  };

  return <AuthContext.Provider value={configObject}>{props.children}</AuthContext.Provider>;
};

export const useAuthDataContext = () => useContext(AuthContext);
