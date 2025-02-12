import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
// Import icons
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
// Import Lottie
import LottieView from "lottie-react-native";
// Import Hook
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
// Import context
import { useAuth } from "../context/authContext";
// Import api routes
import {
  getWishList,
  removeFishFromWishList,
} from "../routes/WishListRoutes/WishListRoutes";
import { addFishToCart } from "../routes/CartRoutes/CartRoutes";
// Main function
export default function WishList({ navigation, route }) {
  // Variables here
  const {
    userInfo,
    cartLength,
    setCartLength,
    wishLength,
    setWishLength,
    ipAddress,
  } = useAuth();
  const [fishData, setFishData] = useState([]); // Store data fetched from server
  const [isLoading, setIsLoading] = useState(true);
  const isFocusedWishList = useIsFocused(); // For re-run useEffect
  // useEffect for getting wishlsit for the first time accessing wishlist screen
  const refreshWishList = async () => {
    const wishListData = await getWishList(ipAddress, userInfo.ma_nguoi_dung);
    setFishData(wishListData);
    setIsLoading(false);
  };
  useEffect(() => {
    if (isFocusedWishList || route.params?.refreshWishlist) {
      refreshWishList(); // Fetch fresh wishlist data
      if (route.params?.refreshWishlist) {
        // Reset refreshWishlist param after the data is fetched
        navigation.setParams({ refreshWishlist: false });
      }
    }
  }, [isFocusedWishList, route.params?.refreshWishlist]);
  // Functions here
  // Remove fish from wishlist
  const handleRemoveFish = async (id) => {
    const response = await removeFishFromWishList(
      ipAddress,
      userInfo.ma_nguoi_dung,
      id
    );
    if (response.success) {
      setFishData(fishData.filter((item) => item.MaMatHang !== id));
      setWishLength(wishLength - 1);
      alert("Remove fish successfully!");
    } else {
      alert("Remove fish failed!");
    }
  };
  // Add fish to cart
  const handleAddFishToCart = async (id) => {
    const response = await addFishToCart(ipAddress, userInfo.ma_nguoi_dung, id);
    if (response.success) {
      setCartLength(cartLength + 1);
      alert("Add fish to cart successfully!");
    } else {
      if (response.message === "Cá đã tồn tại trong giỏ hàng") {
        alert("Fish already exists in cart!");
      } else {
        alert("Add fish to cart failed!");
      }
    }
  };
  // Card rendered here
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
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.ca_info.HinhAnh1}` }}
          style={styles.imageStyle}
        ></Image>
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
            style={styles.button}
          >
            <Feather name="trash" size={20}></Feather>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleAddFishToCart(item.MaMatHang);
            }}
            style={styles.button}
          >
            <Feather name="shopping-cart" size={20}></Feather>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  // Return render here
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b141aa" />
        </View>
      ) : (
        <>
          {fishData.length == 0 ? (
            <View style={[styles.container, { justifyContent: "center" }]}>
              <LottieView
                source={require("../assets/animations/Add Bookmark.json")}
                autoPlay
                loop
                style={styles.lottieAnimation}
              />
              <Text style={styles.emptyCartText}>Your WishList is empty</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("HomeTab");
                }}
                style={styles.goShoppingStyle}
              >
                <Text style={styles.shoppingText}>Explore Now!</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <SafeAreaView style={styles.container}>
              <View style={styles.listContainer}>
                <FlatList
                  data={fishData}
                  keyExtractor={(item) => item.MaMatHang}
                  renderItem={itemView}
                ></FlatList>
              </View>
            </SafeAreaView>
          )}
        </>
      )}
    </>
  );
}
// Styles declared here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  listContainer: {
    height: "100%",
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
  imageStyle: {
    width: "35%",
    height: 120,
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 8,
    marginVertical: 2,
    borderRadius: 10,
  },

  // Lottie
  lottieAnimation: {
    width: "100%",
    height: 400,
    justifyContent: "center",
  },
  emptyCartText: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
    marginTop: 20,
    textAlign: "center",
  },
  goShoppingStyle: {
    width: "80%",
    backgroundColor: "#b141aa",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 40,
    marginHorizontal: "10%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  shoppingText: {
    fontSize: 19,
    color: "white",
  },
});
