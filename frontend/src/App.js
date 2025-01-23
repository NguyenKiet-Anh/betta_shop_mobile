import { useEffect, useState } from "react";
import SplashScreen from "./screens/SplashScreen";
import StackNavigator from "./navigation/Navigator";
import { AuthProvider } from "./context/authContext";

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />
  };

  return (
    <AuthProvider>
      <StackNavigator>      
      </StackNavigator>
    </AuthProvider>    
  );
};