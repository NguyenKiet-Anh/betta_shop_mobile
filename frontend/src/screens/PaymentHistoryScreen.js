import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/authContext";
import { getHistory } from "../routes/ProfileRoutes/ProfileRoutes";
import { FontAwesome } from "@expo/vector-icons";

const PaymentHistoryScreen = ({ navigation }) => {
  const { userInfo, ipAddress } = useAuth();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setIsLoading(true);
      try {
        const data = await getHistory(ipAddress, userInfo.ma_nguoi_dung);
        if (data && data.history) {
          setPaymentHistory(data.history);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaymentHistory();
  }, [ipAddress, userInfo]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate("DetailHistory", { detail: item.ChiTiet })
        }
      >
        <View style={styles.leftColumn}>
          <FontAwesome name="check-circle" size={30} color="green" />
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.title}>
            Đơn hàng {item.MaDonHang} thanh toán thành công
          </Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Thời gian: {item.ThoiDiem}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#b141aa" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (paymentHistory.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No payment history found.</Text>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buyButtonText}>Buy Fish Now!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={paymentHistory}
        keyExtractor={(item, index) => `${item.MaDonHang}-${index}`}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  leftColumn: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightColumn: {
    width: "75%",
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  detailRow: {
    flexDirection: "column",
  },
  detailText: {
    fontSize: 14,
    color: "#555",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: "#b141aa",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentHistoryScreen;
