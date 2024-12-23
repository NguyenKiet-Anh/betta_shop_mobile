import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Modal,
  Linking,
} from "react-native";
// Import Hook
import { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
// Import icons
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
// Import context
import { useAuth } from "../context/authContext";
// Import api routes
import {
  changeAmount,
  checkOutCart,
  getCartById,
  removeFishFromCart,
} from "../routes/CartRoutes/CartRoutes";
// Main function
export default function Cart({ navigation, route }) {
  // Variables here
  const { userInfo, ipAddress } = useAuth();
  const [fishData, setFishData] = useState([]); // Store fish data fetched from server
  const [amount, setAmount] = useState(0); // // Store total amount of item in cart
  const [totalPrice, setTotalPrice] = useState(0); // Store total price
  const [isModalVisible, setIsModalVisible] = useState(false); // For controlling modal
  const [isLoading, setIsLoading] = useState(true); // For controlling render event
  const isFocusedCart = useIsFocused(); // For re-run useEffect
  // For MOMO integated
  const [orderId, setOrderId] = useState("");
  const [paymentURL, setPaymentURL] = useState("");
  // Functions here
  // useEffect for getting wishlsit for the first time accessing wishlist screen
  const refreshCart = async () => {
    const cartData = await getCartById(ipAddress, userInfo.ma_nguoi_dung);
    setFishData(cartData);
    setIsLoading(false);
    // Calculate total price and amount
    const calculateTotalPriceAndAmount = () => {
      let total = 0;
      let totalAmount = 0;
      cartData.forEach((item) => {
        // Calculate total price
        total +=
          parseInt(item.ca_info.GiaKhuyenMai) !== parseInt(0)
            ? item.SoLuong * parseInt(item.ca_info.GiaKhuyenMai)
            : item.SoLuong * parseInt(item.ca_info.Dongia);
        // Calculate total amount
        totalAmount += item.SoLuong;
      });
      setTotalPrice(total);
      setAmount(totalAmount);
    };
    calculateTotalPriceAndAmount();
  };
  useEffect(() => {
    if (isFocusedCart || route.params?.refreshCart) {
      refreshCart(); // Fetch fresh wishlist data
      if (route.params?.refreshCart) {
        // Reset refreshWishlist param after the data is fetched
        navigation.setParams({ refreshCart: false });
      }
    }
  }, [isFocusedCart, route.params?.refreshCart]);
  // Function for updating cart
  const handleUpdateCart = async (
    action,
    fishId,
    currentAmount,
    amountInStock
  ) => {
    let condition = true;
    if (action === "Increase") {
      if (amountInStock <= 0) {
        condition = false;
        alert("Can not add more fish! This amount the highest you can buy");
      }
    } else if (action === "Reduce") {
      if (currentAmount == 1) {
        condition = false;
        handleRemoveFish(fishId);
      }
    }
    if (condition) {
      const response = await changeAmount(
        ipAddress,
        userInfo.ma_nguoi_dung,
        action,
        fishId
      );
      if (response.success) {
        if (action === "Increase") {
          fishData.forEach((item) => {
            if (item.ca_info.MaMatHang === fishId) {
              item.ca_info.SoLuong += 1;
            }
          });
          alert("Add one fish successfully!");
        } else {
          fishData.forEach((item) => {
            if (item.ca_info.MaMatHang === fishId) {
              item.ca_info.SoLuong -= 1;
            }
          });
          alert("Remove one fish successfully!");
        }
        refreshCart();
      } else {
        if (action === "Increase") {
          alert("Add one fish faield!");
        } else {
          alert("Remove one fish failed!");
        }
      }
    }
  };
  // Function for open/ hide modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  // Function for removing item from cart list
  const handleRemoveFish = async (id) => {
    const response = await removeFishFromCart(
      ipAddress,
      userInfo.ma_nguoi_dung,
      id
    );
    if (response.success) {
      let total = totalPrice;
      fishData.forEach((item) => {
        if (item.ca_info.MaMatHang === id) {
          total -=
            parseInt(item.ca_info.GiaKhuyenMai) !== parseInt(0)
              ? parseInt(item.ca_info.GiaKhuyenMai)
              : parseInt(item.ca_info.Dongia);
        }
      });
      setTotalPrice(total);
      setFishData(fishData.filter((item) => item.MaMatHang !== id));
      alert("Remove fish successfully!");
    } else {
      alert("Remove fish failed!");
    }
  };
  // Function for payment
  const handlePayment = async () => {
    try {
      const response = await fetch(
        `http://${ipAddress}:8000/createPaymentLink/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            total_price: totalPrice,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log("data returned from create payment link: ", data);
        // Save orderID and URL link for payment
        setOrderId(data.result.orderId);
        setPaymentURL(data.result.payUrl);
        // Connect to websocket
        connectWebSocket(data.result.orderId);
        // Open Modal
        await Linking.openURL(data.result.payUrl);
      } else {
        alert("Error while trying to create payment link");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error happened while processing");
    }
  };
  // Section for socket connection
  const socketRef = useRef(null);
  function connectWebSocket(orderId) {
    const socketUrl = `ws://${ipAddress}:8000/ws/payment/${orderId}/`;
    console.log("socket URL: ", socketUrl);
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { status, message } = data;
      if (status === "success") {
        // If payment is successful, toggle will be shut down
        toggleModal();
        // Clear cart
        setFishData([]);
        setTotalPrice(0);
        setAmount(0);
        // Send api to server to remove all fish in cart
        //
        const response = checkOutCart(ipAddress, userInfo.ma_nguoi_dung);
        if (response.success) {
          console.log("Remove all carts");
          // Continue call api for notification
          // Way: call api -> send user_id, totalPrice, -> server get total price + time.datetime now() -> save to notification table -> send notification tables's data back to frontend react native app
        } else {
          console.log("Remove all carts failed");
        }
      } else {
        alert("Payment failed: " + message);
      }
    };
    socketRef.current.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  }

  // Return View for each fish in cart
  const itemView = ({ item }) => {
    return (
      // Fish Cards
      <TouchableOpacity
        style={styles.listCell}
        onPress={() => {
          navigation.navigate("Detail", {
            itemId: item.MaMatHang,
          });
        }}
      >
        {amount >= 1000 ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${item.ca_info.HinhAnh1}` }}
            style={styles.imageStyleBigger1000}
          ></Image>
        ) : (
          <Image
            source={{ uri: `data:image/jpeg;base64,${item.ca_info.HinhAnh1}` }}
            style={styles.imageStyle}
          ></Image>
        )}
        <View style={styles.fishInfo}>
          <View>
            <Text style={styles.fishType}>
              {item.ca_info.ma_loai_ca_info.TenLoaiMatHang}
            </Text>
            {item.ca_info.Gioitinh === "M" ? (
              <Ionicons size={22} name="male"></Ionicons>
            ) : (
              <Ionicons size={22} name="female"></Ionicons>
            )}
          </View>
          <View>
            {item.ca_info.KhuyenMai ? (
              <>
                <View style={styles.priceInfo}>
                  <Feather
                    name="dollar-sign"
                    size={20}
                    color={"#ff5863"}
                  ></Feather>
                  <Text style={[styles.fishPrice, styles.fishOldPrice]}>
                    {parseInt(item.ca_info.Dongia)}
                  </Text>
                </View>
                <View style={styles.priceInfo}>
                  <Feather
                    name="dollar-sign"
                    size={20}
                    color={"#b141aa"}
                  ></Feather>
                  <Text style={[styles.fishPrice, styles.fishNewPrice]}>
                    {parseInt(item.ca_info.GiaKhuyenMai)}
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.priceInfo}>
                <Feather
                  name="dollar-sign"
                  size={20}
                  color={"#b141aa"}
                ></Feather>
                <Text style={[styles.fishPrice, styles.fishNewPrice]}>
                  {parseInt(item.ca_info.Dongia)}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => {
              handleRemoveFish(item.MaMatHang);
            }}
            style={styles.removeButton}
          >
            <Feather name="trash" size={23}></Feather>
          </TouchableOpacity>
          <View style={styles.actionButtonSection}>
            <TouchableOpacity
              onPress={() => {
                handleUpdateCart(
                  "Reduce",
                  item.ca_info.MaMatHang,
                  item.SoLuong,
                  item.ca_info.SoLuongTon
                );
              }}
              style={styles.button}
            >
              <Feather name="minus" size={23}></Feather>
            </TouchableOpacity>
            <Text style={styles.amountStyle}>{item.SoLuong}</Text>
            <TouchableOpacity
              onPress={() => {
                handleUpdateCart(
                  "Increase",
                  item.ca_info.MaMatHang,
                  item.SoLuong,
                  item.ca_info.SoLuongTon
                );
              }}
              style={styles.button}
            >
              <Feather
                name="plus"
                size={23}
                style={{ fontWeight: "bold" }}
              ></Feather>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // Return render here
  return (
    <>
      {isLoading ? (
        <Text>Loading ...</Text>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.listContainer}>
            <FlatList
              data={fishData}
              keyExtractor={(item) => item.MaMatHang}
              renderItem={itemView}
            ></FlatList>
          </View>
          <View style={styles.paymentContainer}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "200" }}>
                Amount Price
              </Text>
              <View style={styles.priceSection}>
                <Feather name="dollar-sign" size={15}></Feather>
                <Text style={{ fontSize: 25, fontWeight: "500" }}>
                  {parseInt(totalPrice)}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={toggleModal} style={styles.payButton}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: "white",
                  marginRight: 10,
                }}
              >
                Checkout
              </Text>
              <View
                style={{
                  width: 30,
                  height: 30,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{ fontSize: 17, fontWeight: "600", color: "#b141aa" }}
                >
                  {amount}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Modal for confirmation */}
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={toggleModal}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  Are you sure you want to buy all items in cart?
                </Text>
                <Text style={styles.modalInfo}>Total items: {amount}</Text>
                <Text style={styles.modalInfo}>Total price: {totalPrice}</Text>
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    onPress={toggleModal}
                    style={[styles.modalButton, { backgroundColor: "#ff5863" }]}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handlePayment}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Checkout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: {
    height: "90%",
  },
  listCell: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f3f6",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  imageStyleBigger1000: {
    width: "42%",
    height: 150,
    borderRadius: 10,
  },
  imageStyle: {
    width: "39%",
    height: 140,
    borderRadius: 10,
  },
  fishInfo: {
    width: "43%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  fishType: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  fishGender: {
    fontSize: 15,
    fontWeight: "100",
  },
  priceInfo: {
    flexDirection: "row",
    alignItems: "space-between",
  },
  fishOldPrice: {
    color: "#ff5863",
    fontWeight: "400",
    textDecorationLine: "line-through",
  },
  fishNewPrice: {
    color: "#b141aa",
    fontWeight: "450",
  },
  fishPrice: {
    fontSize: 17,
  },
  actionButton: {
    width: "12%",
    flexDirection: "column",
  },
  actionButtonSection: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  removeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 4,
    borderRadius: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#f2f3f6",
    padding: 4,
    marginVertical: 2,
    borderRadius: 10,
  },
  amountStyle: {
    fontSize: 18,
    fontWeight: "600",
  },

  paymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 40,
  },
  priceSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  payButton: {
    width: 140,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#b141aa",
  },
  // Modal Style
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  modalInfo: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  modalActions: {
    flexDirection: "row",
    marginTop: 15,
  },
  modalButton: {
    backgroundColor: "#b141aa",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
