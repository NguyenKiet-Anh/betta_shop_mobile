// Import components of react native
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
// Import icon
import Feather from "react-native-vector-icons/Feather";
// Import custom components
import { CategoryList } from "../components/HomeScreen/ListOfCategory";
import FishView from "../components/HomeScreen/FishView";
// Import context
import { useAuth } from "../context/authContext";
// Import api routes
import {
  getAllCategories,
  getAllFishes,
  getAllFishesAll,
  getAllFishesPromotion,
} from "../routes/HomeAndCategoriesScreen/HomeAndCategoriesRoutes";
// Testing data
const posterData = [
  {
    id: 1,
    img: require("../assets/images/testImage/Poster/poster1.jpeg"),
  },
  {
    id: 2,
    img: require("../assets/images/testImage/Poster/poster2.jpeg"),
  },
  {
    id: 3,
    img: require("../assets/images/testImage/Poster/poster3.png"),
  },
];
export default function Home({ navigation }) {
  const { ipAddress } = useAuth();
  // Variables for getting data
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Variables for other task
  const [search, setSearch] = useState(""); // For searching
  const [searchResult, setSearchResult] = useState([]); // For filtering fish data base on search text
  const [fishData, setFishData] = useState([]); // Store all fishes not in promotion
  const [allFishData, setAllFishdata] = useState([]); // Store all of the fishes
  const [fishList, setFishList] = useState([]); // Show all fishes
  const [promotionList, setPromotionList] = useState([]); // Store all fishes in promotion
  const [currentIndex, setCurrentIndex] = useState(0); // Used for working with 'seeAll'
  const [selectedCategory, setSelectedCategory] = useState("All"); // Store selected category
  // useEffect for getting all categories
  useEffect(() => {
    // Getting categories from server
    const fetchCategories = async () => {
      const allCategories = await getAllCategories(ipAddress);
      // Arrange categories by MaLoaiMatHang
      const sortedCategories = allCategories.sort((a, b) => {
        if (a.TenLoaiMatHang === "All") return -1;
        if (b.TenLoaiMatHang === "All") return 1;
        return 0;
      });
      setCategoryData(sortedCategories);
    };
    fetchCategories();
    // Getting fishes from server
    const fetchFishes = async () => {
      const allFishes = await getAllFishes(ipAddress);
      setFishData(allFishes);
      setFishList(allFishes); // For showing all fishes in all categories when app opened
    };
    fetchFishes();
    // Getting all fishes from server
    const fetchAllFishes = async () => {
      const allOfFishes = await getAllFishesAll(ipAddress);
      setAllFishdata(allOfFishes);
    };
    fetchAllFishes();
    // Getting fishes from server
    const fetchFishesPromotion = async () => {
      const allFishesPromotion = await getAllFishesPromotion(ipAddress);
      setPromotionList(allFishesPromotion);
      setIsLoading(false);
    };
    fetchFishesPromotion();
  }, []);
  // Get fishes in one selected category
  const handleGetAllFishByCategory = (category) => {
    switch (category) {
      case "All":
        setFishList(fishData);
        break;
      default:
        setFishList(
          fishData.filter(
            (item) =>
              item.ma_loai_ca_info.TenLoaiMatHang === category &&
              !item.KhuyenMai
          )
        );
        break;
    }
    setSelectedCategory(category);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const results = allFishData
        .filter((item) =>
          item.TenMatHang.toLowerCase().includes(text.toLowerCase())
        )
        .slice(0, 5);
      setSearchResult(results);
    } else {
      setSearchResult([]);
    }
  };

  // Return here
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b141aa" />
          
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View style={styles.body}>
              <Text
                style={{ fontSize: 23, fontWeight: "700", marginVertical: 15 }}
              >
                Discover
              </Text>
              <View style={styles.searchSection}>
                {/* For Searching */}
                <View style={styles.autocompleteContainer}>
                  <Autocomplete
                    data={searchResult}
                    value={search}
                    placeholder="Search Fish ..."
                    style={styles.searchBox}
                    onChangeText={handleSearch}
                    flatListProps={{
                      keyExtractor: (_, idx) => idx,
                      renderItem: ({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setSearch("");
                            navigation.navigate("Detail", {
                              itemId: item.MaMatHang,
                            });
                          }}
                        >
                          <View style={styles.itemContainer}>
                            <View style={styles.leftColumn}>
                              <Image
                                source={{
                                  uri: `data:image/jpeg;base64,${item.HinhAnh1}`,
                                }}
                                style={styles.imgcontainer}
                              />
                            </View>
                            <View style={styles.rightColumn}>
                              <Text style={styles.title}>
                                {item.TenMatHang}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ),
                    }}
                  />
                  <View style={styles.searchIcon}>
                    <Feather name="search" size={25}></Feather>
                  </View>
                </View>
                {/* For carousel */}
                <View style={styles.carouselSection}>
                  <Carousel
                    width={367}
                    height={190}
                    loop
                    autoPlay={true}
                    data={posterData}
                    scrollAnimationDuration={2500}
                    onSnapToItem={(index) => setCurrentIndex(index)}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={item.img}
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            borderRadius: 5,
                          }}
                        ></Image>
                      </View>
                    )}
                  />
                  <View style={styles.pagination}>
                    {posterData.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.dot,
                          currentIndex === index && styles.activeDot,
                        ]}
                      ></View>
                    ))}
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: "700",
                      marginVertical: 15,
                    }}
                  >
                    Categories
                  </Text>
                  <FlatList
                    horizontal={true}
                    data={categoryData}
                    renderItem={({ item }) => (
                      <CategoryList
                        item={item}
                        selectedCategory={selectedCategory}
                        handleGetAllFishByCategory={handleGetAllFishByCategory}
                      />
                    )}
                    keyExtractor={(item) => item.MaLoaiMatHang}
                  />
                </View>
                <View>
                  {/* This FlatList is used for showing fishes in one category */}
                  <FlatList
                    horizontal={true}
                    data={[
                      ...fishList.slice(0, 2),
                      {
                        MaMatHang: "seeAll",
                        ma_loai_ca_info: {
                          MaLoaiMatHang: "seeAll",
                          TenLoaiMatHang: selectedCategory,
                        },
                      },
                    ]}
                    renderItem={({ item }) => (
                      <FishView navigation={navigation} item={item} />
                    )}
                    keyExtractor={(item) => item.MaMatHang}
                  ></FlatList>
                </View>
              </View>
              <View style={styles.promotionSection}>
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: "700",
                    marginVertical: 15,
                  }}
                >
                  Promotion and discounts
                </Text>
                {/* This FlatList is used for showing fishes in promotion */}
                <FlatList
                  horizontal={true}
                  data={[
                    ...promotionList.slice(0, 2),
                    {
                      MaMatHang: "seeAll",
                      ma_loai_ca_info: {
                        MaLoaiMatHang: "promotion",
                        TenLoaiMatHang: "promotionList",
                      },
                    },
                  ]}
                  renderItem={({ item }) => (
                    <FishView navigation={navigation} item={item} />
                  )}
                  keyExtractor={(item) => item.MaMatHang}
                ></FlatList>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}
// Creating styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
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
  carouselSection: {
    height: 190,
    marginTop: 60,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 20,
    height: 3,
    backgroundColor: "white",
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  activeDot: {
    backgroundColor: "#b141aa", // Active dot color
  },
  body: {
    marginHorizontal: 10,
  },
  searchSection: { flex: 1 },
  autocompleteContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  searchBox: { paddingLeft: 10 },
  itemContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  leftColumn: {
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightColumn: {
    width: "65%",
    paddingLeft: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  searchIcon: {
    position: "absolute",
    left: 340,
    right: 0,
    top: 9,
    zIndex: 2,
  },
  imgcontainer: {
    flex: 1,
    width: "100%",
    resizeMode: "stretch",
  },
  searchByTextSection: {
    height: 45,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d4d6d9",
    borderRadius: 5,
    marginBottom: 15,
  },
  // Promotion section
  promotionSection: {
    marginBottom: 20,
  },
});
