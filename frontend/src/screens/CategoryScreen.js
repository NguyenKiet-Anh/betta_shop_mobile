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
  Modal,
} from "react-native";
import { RadioButton } from "react-native-paper";
// Import Hook
import { useEffect, useState } from "react";
// Import icons
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Import context
import { useAuth } from "../context/authContext";
import { useIsFocused } from "@react-navigation/native";
// Import api routes
import {
  getAllFishesAll,
  getAllCategories,
} from "../routes/HomeAndCategoriesScreen/HomeAndCategoriesRoutes";
import { addFishToCart } from "../routes/CartRoutes/CartRoutes";
import { addFishToWishList } from "../routes/WishListRoutes/WishListRoutes";
// Main Function here
export default function Category({ route, navigation }) {
  const {
    userInfo,
    cartLength,
    setCartLength,
    wishLength,
    setWishLength,
    ipAddress,
  } = useAuth();
  // Declare variables here
  const { type } = route.params; // Get type passed through navigation
  const [fishData, setFishData] = useState([]); // Store fishes fetched from database
  const [data, setData] = useState([]); // Data for showing
  const [categoriesData, setCategoriesData] = useState([]); // This variable is used for storing all categories name
  const [selectedCategory, setSelectedCategory] = useState(type); // This variable is used to store selected category
  const [countFish, setCountFish] = useState(0); // This variable is used to store number of fish will be show in flatlist
  const [searchTerm, setSearchTerm] = useState(""); // This variable is used to store input from user keyboard
  const [searchResults, setSearchResults] = useState([]); // This variable is used to store results of searching
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // For modal visibility
  const [sortOption, setSortOption] = useState(null);
  const [isPromotionChecked, setIsPromotionChecked] = useState("All"); // Promotion filter state
  const isFocusedCategory = useIsFocused();
  // Declare function here
  // Get all categories from server
  const fetchCategories = async () => {
    const allCategories = await getAllCategories(ipAddress);
    setCategoriesData([
      {
        MaLoaiMatHang: "All",
        TenLoaiMatHang: "All",
      },
      ...allCategories,
    ]);
  };
  // Get fishes as category from server
  const fetchFishes = async () => {
    const allFishes = await getAllFishesAll(ipAddress);
    setFishData(allFishes);
  };
  // Set fish data for showing
  const fetchData = async () => {
    if (type == "All") {
      const allFishes = await getAllFishesAll(ipAddress);
      setCountFish(allFishes.length);
      setData(allFishes);
    } else {
      const filteredData = fishData
        .filter((fish) => fish.ma_loai_ca_info.TenLoaiMatHang === type)
        .reduce((acc, current) => {
          const x = acc.find((item) => item.MaMatHang === current.MaMatHang);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
      setCountFish(filteredData.length);
      setData(filteredData);
    }
  };
  // Apply sorting and filtering to the data
  const applySortingAndFiltering = (items) => {
    let filteredItems = [...items];

    // Apply promotion filter
    if (isPromotionChecked === "Promotion") {
      filteredItems = filteredItems.filter((item) => item.KhuyenMai);
    } else if (isPromotionChecked === "No-Promotion") {
      filteredItems = filteredItems.filter((item) => !item.KhuyenMai);
    }

    // Apply sorting
    if (sortOption === "name-asc") {
      filteredItems.sort((a, b) => a.TenMatHang.localeCompare(b.TenMatHang));
    } else if (sortOption === "name-desc") {
      filteredItems.sort((a, b) => b.TenMatHang.localeCompare(a.TenMatHang));
    } else if (sortOption === "price-asc") {
      filteredItems.sort((a, b) => a.Dongia - b.Dongia);
    } else if (sortOption === "price-desc") {
      filteredItems.sort((a, b) => b.Dongia - a.Dongia);
    }

    return filteredItems;
  };
  // useEffect for getting data in first time page has been accessed
  useEffect(() => {
    if (isFocusedCategory) {
      fetchCategories();
      fetchFishes();
      fetchData();
      setIsLoading(false);
    }
  }, [isFocusedCategory]);

  //  Navigate to selected fish
  const hanldleNavigationForCategories = (id, type) => {
    if (id === "seeAll") {
      navigation.navigate("Category", { type: type });
    } else {
      navigation.navigate("Detail", { itemId: id });
    }
  };
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
  // Change category
  const handleGetAllFishByCategory = (category) => {
    switch (category) {
      case "All":
        setData(fishData);
        setCountFish(fishData.length);
        break;
      default:
        setData(
          fishData.filter(
            (item) => item.ma_loai_ca_info.TenLoaiMatHang === category
          )
        );
        setCountFish(
          fishData.filter(
            (item) => item.ma_loai_ca_info.TenLoaiMatHang === category
          ).length
        );
        break;
    }
    setSelectedCategory(category);
  };
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
  // Variable for showing filtered and sorted items
  const items = applySortingAndFiltering(searchTerm ? searchResults : data);
  // Show list of categories
  const renderCategory = ({ item }) => {
    return (
      <View style={styles.categoriesFlatlistSection}>
        <TouchableOpacity
          onPress={() => {
            handleGetAllFishByCategory(item.TenLoaiMatHang);
          }}
        >
          {selectedCategory === item.TenLoaiMatHang ? (
            <Text style={styles.categoriesSelectedFlatlistText}>
              {item.TenLoaiMatHang}
            </Text>
          ) : (
            <Text style={styles.categoriesFlatlistText}>
              {item.TenLoaiMatHang}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  // Show fishes in selected category
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.fishInCategoryFlatlistSection}
        onPress={() => {
          hanldleNavigationForCategories(
            item.MaMatHang,
            item.ma_loai_ca_info.MaLoaiMatHang
          );
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
                {item.KhuyenMai ? (
                  <View>
                    <Text style={styles.fishInCategoryFlatlistPrice}>
                      {parseInt(item.Dongia)}
                    </Text>
                    <Text style={styles.fishInCategoryFlatlistNewPrice}>
                      {parseInt(item.GiaKhuyenMai)}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.fishInCategoryFlatlistPrice}>
                    {parseInt(item.Dongia)}
                  </Text>
                )}
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
  // Main return
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b141aa" />
          <Text style={styles.loadingText}>Loading...</Text>
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
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <AntDesign name="filter" size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.bodySection}>
              <View style={{ marginVertical: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  Total ({countFish})
                </Text>

                <View style={{ marginVertical: 7 }}>
                  <FlatList
                    horizontal={true}
                    data={categoriesData}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.MaLoaiMatHang}
                  ></FlatList>
                </View>
              </View>
              <View style={{ height: "90%" }}>
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
          {isModalVisible && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={isModalVisible}
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Sorting</Text>
                  <RadioButton.Group
                    onValueChange={(value) => setSortOption(value)}
                    value={sortOption}
                  >
                    <RadioButton.Item
                      label="Fish's name: A-Z"
                      value="name-asc"
                    />
                    <RadioButton.Item
                      label="Fish's name: Z-A"
                      value="name-desc"
                    />
                    <RadioButton.Item
                      label="Fish's price: ascending"
                      value="price-asc"
                    />
                    <RadioButton.Item
                      label="Fish's price: descending"
                      value="price-desc"
                    />
                  </RadioButton.Group>

                  <Text style={styles.modalTitle}>Filtering</Text>
                  <RadioButton.Group
                    onValueChange={(value) => setIsPromotionChecked(value)}
                    value={isPromotionChecked}
                  >
                    <RadioButton.Item label="All" value="All" />
                    <RadioButton.Item label="Promotion" value="Promotion" />
                    <RadioButton.Item
                      label="No-Promotion"
                      value="No-Promotion"
                    />
                  </RadioButton.Group>

                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.modalCloseButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
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
    gap: 15,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#b141aa",
    borderRadius: 5,
    alignItems: "center",
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
