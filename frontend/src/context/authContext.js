import { createContext, useContext, useState } from "react";
import { getCartById } from "../routes/CartRoutes/CartRoutes";
import { getWishList } from "../routes/WishListRoutes/WishListRoutes";

// Create context API
export const AuthContext = createContext();

// Create provider for Context
export const AuthProvider = ({ children }) => {
  // Declare state variables
  const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [cartLength, setCartLength] = useState(0);
  const [wishLength, setWishLength] = useState(0);

  const ipAddress = "192.168.137.1";

  // Get User Cart Length
  const getCartLength = async (id) => {
    const cartData = await getCartById(ipAddress, id);
    setCartLength(cartData.length);
  };

  // Get User WishList Length
  const getWishLength = async (id) => {
    const wishData = await getWishList(ipAddress, id);
    setWishLength(wishData.length);
  };

  // Declare functions here
  const login = (userData) => {
    setUserInfo(userData);
    getCartLength(userData.ma_nguoi_dung);
    getWishLength(userData.ma_nguoi_dung);
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
        cartLength,
        wishLength,
        setCartLength,
        setWishLength,
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
