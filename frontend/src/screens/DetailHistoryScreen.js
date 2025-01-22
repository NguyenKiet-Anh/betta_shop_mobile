import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const DetailHistoryScreen = ({ route }) => {
  const { detail } = route.params;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.leftColumn}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${item.MaMatHang.HinhAnh1}`,
            }}
            style={styles.imgcontainer}
          />
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.title}>{item.MaMatHang.TenMatHang}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Số lượng: {item.SoLuong}</Text>
            <Text style={styles.detailText}>
              Thành tiền: {item.ThanhTien.toLocaleString()} VND
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (!detail || detail.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No detail history found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={detail}
        keyExtractor={(item, index) => `${item.MaMatHang}-${index}`}
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
  imgcontainer: {
    flex: 1,
    width: "100%",
  },
});

export default DetailHistoryScreen;
