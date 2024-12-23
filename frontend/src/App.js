import StackNavigator from "./navigation/Navigator";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <AuthProvider>
      <StackNavigator>      
      </StackNavigator>
    </AuthProvider>    
  );
};