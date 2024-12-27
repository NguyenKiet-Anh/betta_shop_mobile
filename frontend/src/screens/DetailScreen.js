// Import react native elements
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
// Import Icon
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
// Import Hook
import { useEffect, useState } from "react";
// Import context
import { useAuth } from "../context/authContext";
// Import api routes
import { getFishById } from "../routes/DetailScreen/DetailRoutes";
import { addFishToCart } from "../routes/CartRoutes/CartRoutes";
// Function here
export default function Detail({ route, navigation }) {
  // Variable for storing Fish'id
  const { itemId } = route.params;
  const { userInfo, cartLength, setCartLength, ipAddress } = useAuth();
  // Variable for other stuff
  const { width } = Dimensions.get("window");
  const [fish, setFish] = useState([]); // Store data for fish
  const [fishImages, setFishImages] = useState([]); // Store data for showing fish's images
  const [currentIndex, setCurrentIndex] = useState(0); // For dot display
  const [isLoading, setIsLoading] = useState(true);
  // Get information of fish as id when detail screen has been opened
  useEffect(() => {
    const fetchFish = async (id) => {
      const fishData = await getFishById(ipAddress, id);
      setFish(fishData);
      setFishImages([
        {
          id: 1,
          img: fishData.HinhAnh1,
        },
        {
          id: 2,
          img: fishData.HinhAnh2,
        },
        {
          id: 3,
          img: fishData.HinhAnh3,
        },
        {
          id: 4,
          img: fishData.HinhAnh4,
        },
      ]);
      setIsLoading(false);
      navigation.setOptions({
        headerTitle: fishData.TenMatHang,
      });
    };
    fetchFish(itemId);
  }, []);
  // Function for add to cart
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
  return (
    <>
      {isLoading ? (
        <Text>Loading ...</Text>
      ) : (
        <>
          {fish.MaMatHang && fish.KhuyenMai && (
            <View style={styles.container}>
              <View style={styles.headerImage}>
                <View style={styles.carouselSection}>
                  <Carousel
                    width={width}
                    height={375}
                    loop
                    autoPlay={true}
                    data={fishImages}
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
                          source={{ uri: `data:image/jpeg;base64,${item.img}` }}
                          style={styles.image}
                        ></Image>
                      </View>
                    )}
                  />
                  <View style={styles.pagination}>
                    {fishImages.map((_, index) => (
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
              </View>
              <View style={styles.content}>
                <Text style={styles.fishType}>
                  {fish.ma_loai_ca_info.TenLoaiMatHang}
                </Text>
                <Text style={styles.fishTitle}>{fish.TenMatHang}</Text>
                {/* <FontAwesome name="transgender" size={25}></FontAwesome> */}
                {fish.Gioitinh === "M" ? (
                  <View style={styles.genderSection}>
                    <Ionicons size={22} name="male"></Ionicons>
                    <Text style={styles.fishGender}> Male</Text>
                  </View>
                ) : (
                  <View style={styles.genderSection}>
                    <Ionicons size={22} name="female"></Ionicons>
                    <Text style={styles.fishGender}>Female</Text>
                  </View>
                )}
                <View style={styles.priceInfo}>
                  <View style={styles.newPriceSection}>
                    <Fontisto
                      name="dollar"
                      size={25}
                      color={"#b141aa"}
                    ></Fontisto>
                    <Text style={styles.fishNewPrice}>
                      {parseInt(fish.GiaKhuyenMai)}
                    </Text>
                  </View>
                  <Text style={styles.fishPrice}>{parseInt(fish.Dongia)}</Text>
                </View>
                <View style={styles.buttonSection}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Review", {
                        itemId: fish.MaMatHang,
                      });
                    }}
                    style={styles.seeComment}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      See reviews
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addCartButton}
                    onPress={() => {
                      handleAddFishToCart(fish.MaMatHang);
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Add to cart
                    </Text>
                    <Text style={{ fontSize: 20, color: "white" }}>|</Text>
                    <FontAwesome5
                      name="cart-plus"
                      size={22}
                      color={"white"}
                    ></FontAwesome5>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {fish.MaMatHang && !fish.KhuyenMai && (
            <View style={styles.container}>
              <View style={styles.headerImage}>
                <View style={styles.carouselSection}>
                  <Carousel
                    width={width}
                    height={375}
                    loop
                    autoPlay={true}
                    data={fishImages}
                    scrollAnimationDuration={2000}
                    onSnapToItem={(index) => setCurrentIndex(index)}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={{ uri: `data:image/jpeg;base64,${item.img}` }}
                          style={styles.image}
                        ></Image>
                      </View>
                    )}
                  />
                  <View style={styles.pagination}>
                    {fishImages.map((_, index) => (
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
              </View>
              <View style={styles.content}>
                <Text style={styles.fishType}>
                  {fish.ma_loai_ca_info.TenLoaiMatHang}
                </Text>
                <Text style={styles.fishTitle}>{fish.TenMatHang}</Text>
                {fish.Gioitinh === "M" ? (
                  <View style={styles.genderSection}>
                    <Ionicons size={22} name="male"></Ionicons>
                    <Text style={styles.fishGender}> Male</Text>
                  </View>
                ) : (
                  <View style={styles.genderSection}>
                    <Ionicons size={22} name="female"></Ionicons>
                    <Text style={styles.fishGender}>Female</Text>
                  </View>
                )}
                <View style={styles.priceInfo}>
                  <View style={styles.newPriceSection}>
                    <Fontisto
                      name="dollar"
                      size={25}
                      color={"#b141aa"}
                    ></Fontisto>
                    <Text style={styles.fishNewPrice}>
                      {parseInt(fish.Dongia)}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonSection}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Review", {
                        itemId: fish.MaMatHang,
                      });
                    }}
                    style={styles.seeComment}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      See reviews
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleAddFishToCart(fish.MaMatHang);
                    }}
                    style={styles.addCartButton}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Add to cart
                    </Text>
                    <Text style={{ fontSize: 20, color: "white" }}>|</Text>
                    <FontAwesome5
                      name="cart-plus"
                      size={22}
                      color={"white"}
                    ></FontAwesome5>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
}
// Create styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  carouselSection: {
    height: 375,
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

  headerImage: {
    width: "100%",
  },
  image: {
    width: "full",
    height: 375,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  content: {
    width: "90%",
    height: "10%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  fishTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  fishType: {
    fontSize: 19,
    fontWeight: "200",
    marginVertical: 10,
  },
  genderSection: {
    flexDirection: "row",
    marginVertical: 10,
  },
  fishGender: {
    fontSize: 15,
    marginLeft: 5,
  },
  priceInfo: {
    flexDirection: "row",
    marginVertical: 20,
  },
  newPriceSection: {
    flexDirection: "row",
    marginRight: 20,
  },
  fishNewPrice: {
    fontSize: 17,
    fontWeight: "500",
    color: "#b141aa",
    marginLeft: 3,
  },
  fishPrice: {
    fontSize: 17,
    fontWeight: "500",
    color: "#ff5863",
    textDecorationLine: "line-through",
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  seeComment: {
    width: "30%",
    height: 50,
    backgroundColor: "#ff5863",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  addCartButton: {
    width: "60%",
    height: 60,
    flexDirection: "row",
    backgroundColor: "#b141aa",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
