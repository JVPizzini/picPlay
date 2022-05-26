import React, { createContext, ReactNode, useContext, useState } from 'react';

//interfaces and types
interface AuthProviderPros {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  handleSignIn: (bool : boolean) => void ;
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData);

const user = {
  id: '123',
  name: 'joao',
  email: 'joao@bookpla.com.br',
};

function AuthProvider({ children }: AuthProviderPros) {
  //exemplo só para acessar as outras páginas!!!
  const [isAuthenticated, setisAuthenticated] = useState(false);

   function handleSignIn(bool : boolean) {
    setisAuthenticated(bool);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignIn,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
