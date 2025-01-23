import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
// Import Hook
import { useState, useEffect } from "react";

// Import routes
import { getAllUsers, removeUser } from "../routes/Management/ManagementRoutes";
import { InfoCard } from "../components/Management/InfoCard";
import { useAuth } from "../context/authContext";

export default function CustomerManagement({ navigation }) {
  // Variables declared here
  const { ipAddress } = useAuth(); // Get userId
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Function declared here
  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await getAllUsers(ipAddress);
      if (allUsers.length > 0) {
        setUserData(allUsers);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete user
  const handleDeleteUser = async (userId) => {
    const response = await removeUser(ipAddress, userId);
    if (response.status) {
      setUserData(userData.filter((item) => item.MaKhachHang !== userId));
      alert(response.message);
    } else {
      alert(response.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b141aa" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={userData}
            renderItem={({ item }) => (
              <InfoCard
                item={item}
                onDeletePress={() => {
                  handleDeleteUser(item.MaKhachHang);
                }}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.MaKhachHang}
          ></FlatList>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    backgroundColor: "red",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
