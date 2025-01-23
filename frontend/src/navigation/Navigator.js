// Import react native elements
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// Import hooks for navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
// Import screens here
import SignIn from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";
import Home from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import AllPromotion from "../screens/AllPromotionsScreen";
import Detail from "../screens/DetailScreen";
import Wishlist from "../screens/WishlistScreen";
import Cart from "../screens/CartScreen";
import ChatWithShop from "../screens/ChatWithShopScreen";
import Review from "../screens/ReviewScreen";
import Profile from "../screens/ProfileScreen";
import History from "../screens/PaymentHistoryScreen";
import DetailHistory from "../screens/DetailHistoryScreen";
import EditProfile from "../screens/ProfileEditScreen";
import ChangePassword from "../screens/ProfileChangePasswordScreen";
import AboutUs from "../screens/AboutUsScreen";
import StoreLocation from "../screens/LocationScreen";
import ProductManagement from "../screens/ProductManagementScreen";
import CustomerManagement from "../screens/CustomerManagementScreen";
// Import Icon
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
// Import useAuth
import { useAuth } from "../context/authContext";
// Import api routes
import {
  addFishToWishList,
  deleteWishList,
} from "../routes/WishListRoutes/WishListRoutes";
import { deleteFishFromCart } from "../routes/CartRoutes/CartRoutes";

// Function main
export default function StackNavigator({ navigation }) {
  // Variables for userId
  const {
    userInfo,
    cartLength,
    setCartLength,
    wishLength,
    setWishLength,
    ipAddress,
  } = useAuth();
  // Function add wishlist
  const handleAddFishToWishList = async (id) => {
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
  // Function declared here
  const handleDeleteWishList = async (navigation) => {
    const response = await deleteWishList(ipAddress, userInfo.ma_nguoi_dung);
    if (response.success) {
      setWishLength(0);
      alert("Delete all fishes from wishlist successfully!");
      // Refresh wishlist page here
      navigation.navigate("Wishlist", { refreshWishlist: true });
    } else {
      alert("Delete all fishes from wishlist failed!");
    }
  };
  // Fucntion add cart
  const handleDeleteCart = async (navigation) => {
    const response = await deleteFishFromCart(
      ipAddress,
      userInfo.ma_nguoi_dung
    );
    if (response.success) {
      setCartLength(0);
      alert("Delete all fishes from cart successfully!");
      // Refresh wishlist page here
      navigation.navigate("Cart", { refreshCart: true });
    } else {
      alert("Delete all fishes from cart failed!");
    }
  };
  // Create StackNavigator & BottomNavigator here
  const RootStack = createStackNavigator();
  const TopTab = createMaterialTopTabNavigator();
  const BottomTab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  // Get all fish in wishlist before rendering
  // Drawer Navigator here
  function DrawerMenu({ navigation }) {
    return (
      <Drawer.Navigator>
        {/* Route for Home drawer */}
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            headerTitle: "Home",
            headerRight: () => (
              <View style={styles.header}>
                <View style={styles.headerComponent}>
                  <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => {
                      navigation.navigate("ChatWithShop");
                    }}
                  >
                    <Ionicons
                      name="chatbubble"
                      size={20}
                    ></Ionicons>
                  </TouchableOpacity>
                </View>
              </View>
            ),
          }}
        ></Drawer.Screen>
        {userInfo.isAdmin ? (
          <>
            {/* Route for Store location */}
            <Drawer.Screen
              name="Products Management"
              component={ProductManagement}
            ></Drawer.Screen>
            {/* Route for Help */}
            <Drawer.Screen
              name="Customers Management"
              component={CustomerManagement}
            ></Drawer.Screen>
          </>
        ) : (
          <>
            {/* Route for Store location */}
            <Drawer.Screen
              name="Store Location"
              component={StoreLocation}
            ></Drawer.Screen>
            {/* Route for Help */}
            <Drawer.Screen name="About Us" component={AboutUs}></Drawer.Screen>
          </>
        )}
      </Drawer.Navigator>
    );
  }
  // Top Tabs Navigator here
  function ProfileTabs() {
    return (
      <TopTab.Navigator
        initialRouteName="PersonalInformation"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: "#418FF5",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <TopTab.Screen
          name="PersonalInformation"
          component={Profile}
          options={{ title: "Personal Information" }}
        ></TopTab.Screen>
        <TopTab.Screen
          name="PaymentHistory"
          component={History}
          options={{ title: "Payment History" }}
        ></TopTab.Screen>
      </TopTab.Navigator>
    );
  }
  // Bottom Tabs Navigator here
  function HomeTabs({ navigation }) {
    return (
      <BottomTab.Navigator>
        {/* Tab for Home */}
        <BottomTab.Screen
          name="HomeTab"
          component={DrawerMenu}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text style={styles.tabStyleFocused}>Home</Text>
              ) : (
                <Text style={styles.tabStyle}>Home</Text>
              ),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome6
                  name="house"
                  size={22}
                  color={"#b141aa"}
                ></FontAwesome6>
              ) : (
                <FontAwesome6
                  name="house"
                  size={22}
                  color={"#a6b9c8"}
                ></FontAwesome6>
              ),
          }}
        ></BottomTab.Screen>
        {/* Tab for Cart */}
        <BottomTab.Screen
          name="Cart"
          component={Cart}
          options={
            cartLength > 0
              ? {
                  tabBarBadge: cartLength,
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => {
                        handleDeleteCart(navigation);
                      }}
                      style={{ marginRight: 15 }}
                    >
                      <Octicons name="trash" size={25}></Octicons>
                    </TouchableOpacity>
                  ),
                  tabBarLabel: ({ focused }) =>
                    focused ? (
                      <Text style={styles.tabStyleFocused}>Cart</Text>
                    ) : (
                      <Text style={styles.tabStyle}>Cart</Text>
                    ),
                  tabBarIcon: ({ focused }) =>
                    focused ? (
                      <FontAwesome5
                        name="shopping-cart"
                        size={22}
                        color={"#b141aa"}
                      ></FontAwesome5>
                    ) : (
                      <FontAwesome5
                        name="shopping-cart"
                        size={22}
                        color={"#a6b9c8"}
                      ></FontAwesome5>
                    ),
                }
              : {
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => {
                        handleDeleteCart(navigation);
                      }}
                      style={{ marginRight: 15 }}
                    >
                      <Octicons name="trash" size={25}></Octicons>
                    </TouchableOpacity>
                  ),
                  tabBarLabel: ({ focused }) =>
                    focused ? (
                      <Text style={styles.tabStyleFocused}>Cart</Text>
                    ) : (
                      <Text style={styles.tabStyle}>Cart</Text>
                    ),
                  tabBarIcon: ({ focused }) =>
                    focused ? (
                      <FontAwesome5
                        name="shopping-cart"
                        size={22}
                        color={"#b141aa"}
                      ></FontAwesome5>
                    ) : (
                      <FontAwesome5
                        name="shopping-cart"
                        size={22}
                        color={"#a6b9c8"}
                      ></FontAwesome5>
                    ),
                }
          }
        ></BottomTab.Screen>
        {/* Tab for Wishlist */}
        <BottomTab.Screen
          name="Wishlist"
          component={Wishlist}
          options={
            wishLength > 0
              ? {
                  tabBarBadge: wishLength,
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => {
                        handleDeleteWishList(navigation);
                      }}
                      style={{ marginRight: 15 }}
                    >
                      <Octicons name="trash" size={25}></Octicons>
                    </TouchableOpacity>
                  ),
                  tabBarLabel: ({ focused }) =>
                    focused ? (
                      <Text style={styles.tabStyleFocused}>Wishlist</Text>
                    ) : (
                      <Text style={styles.tabStyle}>Wishlist</Text>
                    ),
                  tabBarIcon: ({ focused }) =>
                    focused ? (
                      <MaterialIcons
                        name="favorite"
                        size={25}
                        color={"#b141aa"}
                      ></MaterialIcons>
                    ) : (
                      <MaterialIcons
                        name="favorite"
                        size={25}
                        color={"#a6b9c8"}
                      ></MaterialIcons>
                    ),
                }
              : {
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => {
                        handleDeleteWishList(navigation);
                      }}
                      style={{ marginRight: 15 }}
                    >
                      <Octicons name="trash" size={25}></Octicons>
                    </TouchableOpacity>
                  ),
                  tabBarLabel: ({ focused }) =>
                    focused ? (
                      <Text style={styles.tabStyleFocused}>Wishlist</Text>
                    ) : (
                      <Text style={styles.tabStyle}>Wishlist</Text>
                    ),
                  tabBarIcon: ({ focused }) =>
                    focused ? (
                      <MaterialIcons
                        name="favorite"
                        size={25}
                        color={"#b141aa"}
                      ></MaterialIcons>
                    ) : (
                      <MaterialIcons
                        name="favorite"
                        size={25}
                        color={"#a6b9c8"}
                      ></MaterialIcons>
                    ),
                }
          }
        ></BottomTab.Screen>
        {/* Tab for Chat with shop */}
        <BottomTab.Screen
          name="Profile"
          component={ProfileTabs}
          options={{
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text style={styles.tabStyleFocused}>Profile</Text>
              ) : (
                <Text style={styles.tabStyle}>Profile</Text>
              ),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome
                  name="user"
                  size={25}
                  color={"#b141aa"}
                ></FontAwesome>
              ) : (
                <FontAwesome
                  name="user"
                  size={25}
                  color={"#a6b9c8"}
                ></FontAwesome>
              ),
          }}
        ></BottomTab.Screen>
      </BottomTab.Navigator>
    );
  }
  // Return Stack Navigator here
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Sign-In">
        {/* Route for Sign In */}
        <RootStack.Screen
          name="Sign-In"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        ></RootStack.Screen>
        {/* Route for Sign Up */}
        <RootStack.Screen
          name="Sign-Up"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        ></RootStack.Screen>
        {/* Route for Home */}
        <RootStack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        ></RootStack.Screen>
        {/* Route for ChatWithShop */}
        <RootStack.Screen
          name="ChatWithShop"
          component={ChatWithShop}
          options={{
            headerTitle: "Chat With Shop"
          }}
        ></RootStack.Screen>
        {/* Route for see in Category */}
        <RootStack.Screen
          name="Category"
          component={CategoryScreen}
        ></RootStack.Screen>
        {/* Route for see in Promotion */}
        <RootStack.Screen
          name="Promotion"
          component={AllPromotion}
        ></RootStack.Screen>
        {/* Route for See in detail */}
        <RootStack.Screen
          name="Detail"
          component={Detail}
          options={({ route }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  handleAddFishToWishList(route.params.itemId);
                }}
              >
                <View style={{ marginRight: 15 }}>
                  <MaterialIcons name="favorite-outline" size={25} />
                </View>
              </TouchableOpacity>
            ),
          })}
        ></RootStack.Screen>
        {/* Route for Review */}
        <RootStack.Screen
          name="Review"
          component={Review}
          options={({ route }) => ({})}
        ></RootStack.Screen>
        {/* Route for Detail Payment History */}
        <RootStack.Screen
          name="DetailHistory"
          component={DetailHistory}
          options={{ title: "Purchased Fishes" }}
        ></RootStack.Screen>
        {/* Route for Profile Edit */}
        <RootStack.Screen
          name="EditProfile"
          component={EditProfile}
        ></RootStack.Screen>
        {/* Route for Changing password */}
        <RootStack.Screen
          name="ChangePassword"
          component={ChangePassword}
        ></RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  tabStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#a6b9c8",
  },
  tabStyleFocused: {
    fontSize: 12,
    fontWeight: "500",
    color: "#b141aa",
  },

  header: {
    height: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  headerComponent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerButton: {
    width: 35,
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#d4d6d9",
  },
});
