import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { InfoCard } from "../components/Management/InfoCard";
// Import Hook
import { useEffect, useState } from "react";
// Import api routes
import {
  getAllProduct,
  removeProduct,
} from "../routes/Management/ManagementRoutes";
import { useAuth } from "../context/authContext";

export default function ProductManagement({ navigation }) {
  // Variables declared here
  const { ipAddress } = useAuth(); // Get userId
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Function declared here
  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await getAllProduct(ipAddress);
      if (allProducts.length > 0) {
        setProductData(allProducts);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete product
  const handleDeleteProduct = async (productId) => {
    const response = await removeProduct(ipAddress, productId);
    if (response.status) {
      setProductData(
        productData.filter((item) => item.MaMatHang !== productId)
      );
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
          
        </View>
      ) : (
        <View>
          <FlatList
            data={productData}
            renderItem={({ item }) => (
              <InfoCard
                item={item}
                onDeletePress={() => {
                  handleDeleteProduct(item.MaMatHang);
                }}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.MaMatHang}
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
