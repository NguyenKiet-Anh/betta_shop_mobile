// Import component
import { Image } from "react-native";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
// Import Hook
import { useEffect, useState } from "react";
// Import icons
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Import context
import { useAuth } from "../context/authContext";
// Import api routes
import { getAllFishesPromotion } from "../routes/HomeAndCategoriesScreen/HomeAndCategoriesRoutes";
import { addFishToCart } from "../routes/CartRoutes/CartRoutes";
import { addFishToWishList } from "../routes/WishListRoutes/WishListRoutes";
// Main function here
export default function AllPromotion({ navigation }) {
  const {
    userInfo,
    cartLength,
    setCartLength,
    wishLength,
    setWishLength,
    ipAddress,
  } = useAuth();
  // Declare variables here
  const [countFish, setCountFish] = useState(0); // Used for count amount of fish in this list
  const [data, setData] = useState([]); // Store fishes for showing
  const [searchTerm, setSearchTerm] = useState(""); // Used for searching
  const [searchResults, setSearchResults] = useState([]); // For showing fishes as searching demand
  const [isLoading, setIsLoading] = useState(true);
  // Declare function here
  // useEffect for getting all promotion for the first time
  useEffect(() => {
    // Fetch fishes from database
    const fetchFishes = async () => {
      const allFishes = await getAllFishesPromotion(ipAddress);
      setData(allFishes);
      setCountFish(allFishes.length);
      setIsLoading(false);
    };
    fetchFishes();
  }, []);
  // Search as fish's name
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const results = data.filter((item) =>
        item.TenMatHang.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCountFish(results.length);
      setSearchResults(results);
    } else {
      setCountFish(data.length);
      setSearchResults(data);
    }
  }, [searchTerm]);
  // Add fish to wishlist
  const handleAddFishToWishlist = async (id) => {
    const response = await addFishToWishList(
      ipAddress,
      userInfo.ma_nguoi_dung,
      id
    );
    if (response.success) {
      setWishLength(wishLength + 1);
      alert("Add fish to wishlist successfully!");
    } else {
      alert("Add fish to wishlist failed! Fish already exists in wishlist!");
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
      } else if (response.message === "Cá đã hết hàng") {
        alert("Fish out of stock");
      } else {
        alert("Add fish to cart failed!");
      }
    }
  };
  // Variable for showing filtered fish
  const items = searchTerm ? searchResults : data;
  // Return render here
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.fishInCategoryFlatlistSection}
        onPress={() => {
          navigation.navigate("Detail", { itemId: item.MaMatHang });
        }}
      >
        {item.id === "seeAll" ? (
          <View style={styles.fishInCategoryFlatlistContent}>
            <View style={styles.seeAll}>
              <Feather
                name="more-vertical"
                size={100}
                color={"#bfacaa"}
              ></Feather>
            </View>
          </View>
        ) : (
          <View style={styles.fishInCategoryFlatlistContent}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.HinhAnh1}` }}
              style={styles.fishInCategoryFlatlistImage}
            ></Image>
            <View style={{ marginHorizontal: 5 }}>
              <Text style={styles.fishInCategoryFlatlistName} numberOfLines={2}>
                {item.TenMatHang}
              </Text>
              <View style={styles.fishInCategoryFlatlistBuyFeature}>
                <View>
                  <Text style={styles.fishInCategoryFlatlistPrice}>
                    {parseInt(item.Dongia)}
                  </Text>
                  <Text style={styles.fishInCategoryFlatlistNewPrice}>
                    {parseInt(item.GiaKhuyenMai)}
                  </Text>
                </View>
                <View style={styles.buttonSection}>
                  <TouchableOpacity
                    onPress={() => {
                      handleAddFishToWishlist(item.MaMatHang);
                    }}
                  >
                    <MaterialIcons name="favorite" size={25}></MaterialIcons>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleAddFishToCart(item.MaMatHang);
                    }}
                  >
                    <FontAwesome name="cart-plus" size={25}></FontAwesome>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b141aa" />
          
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.sContainer}>
            <View style={styles.headerSection}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 5,
                  borderWidth: 1,
                  borderColor: "#a2b0a6",
                  borderRadius: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    handleSearch();
                  }}
                >
                  <AntDesign name="search1" size={24}></AntDesign>
                </TouchableOpacity>
                <TextInput
                  style={{ width: 230, height: 40, marginLeft: 5 }}
                  placeholder="Fish's name ...."
                  value={searchTerm}
                  onChangeText={(e) => setSearchTerm(e)}
                ></TextInput>
              </View>
              <AntDesign name="filter" size={24}></AntDesign>
            </View>
            <View style={styles.bodySection}>
              <View style={{ marginVertical: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  Tất cả ({countFish})
                </Text>
              </View>
              <View>
                {data.length > 0 ? (
                  <FlatList
                    key={"#"}
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.MaMatHang}
                    numColumns={2}
                  ></FlatList>
                ) : (
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      fontStyle: "italic",
                      color: "#a4abb5",
                      textAlign: "center",
                    }}
                  >
                    Empty
                  </Text>
                )}
              </View>
            </View>
          </View>
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
  sContainer: {
    flex: 1,
    marginHorizontal: 20,
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
  headerSection: {
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bodySection: {
    height: "80%",
    flexDirection: "column",
  },

  fishInCategoryFlatlistSection: {
    width: "47%",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#f5f4f4",
    borderRadius: 10,
  },
  fishInCategoryFlatlistContent: {
    width: "100%",
    height: "100%",
  },
  fishInCategoryFlatlistImage: {
    width: "full",
    height: 150,
    borderRadius: 10,
  },
  fishInCategoryFlatlistName: {
    fontSize: 15,
    fontWeight: "200",
  },
  fishInCategoryFlatlistBuyFeature: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fishInCategoryFlatlistPrice: {
    color: "#b141aa",
    fontWeight: "600",
  },
  fishInCategoryFlatlistNewPrice: {
    color: "#ff5863",
    textDecorationLine: "line-through",
  },
  buttonSection: {
    width: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoriesFlatlistSection: {
    marginRight: 25,
    marginBottom: 10,
  },
  categoriesFlatlistText: {
    fontSize: 17,
    fontWeight: "350",
    color: "#a4abb5",
  },
  categoriesSelectedFlatlistText: {
    fontSize: 17,
    fontWeight: "350",
    color: "#b141aa",
  },
});
