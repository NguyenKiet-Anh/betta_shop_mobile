import { createContext, useContext, useState } from "react";

// Create context API
export const AuthContext = createContext();

// Create provider for Context
export const AuthProvider = ({ children }) => {
  // Declare state variables
  const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const ipAddress = "172.16.2.211";

  // Declare functions here
  const login = (userData) => {
    setUserInfo(userData);
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
    setUserInfo({});
  };

  // Return context provider with values
  return (
    <AuthContext.Provider
      value={{
        ipAddress,
        isLogged,
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use context easily
export const useAuth = () => useContext(AuthContext);
