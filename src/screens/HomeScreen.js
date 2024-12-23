// Import components of react native
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
// Import icon
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
  const [fishData, setFishData] = useState([]); // Store all fishes not in promotion
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
  // Return here
  return (
    <>
      {isLoading ? (
        <Text>Loading ...</Text>
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
                <View style={styles.searchByTextSection}>
                  <TextInput
                    style={{ width: "85%", height: "100%" }}
                    placeholder="Search ..."
                  ></TextInput>
                  <TouchableOpacity style={{ width: "10%" }}>
                    <Feather name="search" size={25}></Feather>
                  </TouchableOpacity>
                </View>
                {/* For carousel */}
                <View style={styles.carouselSection}>
                  <Carousel
                    width={344}
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
  carouselSection: {
    height: 190,
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
  searchSection: {},
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
