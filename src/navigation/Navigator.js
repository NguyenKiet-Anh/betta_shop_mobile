// Import react native elements
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// Import hooks for navigation
import { createStackNavigator } from "@react-navigation/stack";
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
import Notification from "../screens/NotificationScreen";
import Review from "../screens/ReviewScreen";
import Profile from "../screens/ProfileScreen";
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
  const { userInfo, ipAddress } = useAuth();
  // Function add wishlist
  const handleAddFishToWishList = async (id) => {
    const response = await addFishToWishList(
      ipAddress,
      userInfo.ma_nguoi_dung,
      id
    );
    if (response.success) {
      alert("Add fish to wishlist successfully!");
    } else {
      alert("Add fish to wishlist failed! Fish already exists in wishlist!");
    }
  };
  // Function declared here
  const handleDeleteWishList = async (navigation) => {
    const response = await deleteWishList(ipAddress, userInfo.ma_nguoi_dung);
    if (response.success) {
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
      alert("Delete all fishes from cart successfully!");
      // Refresh wishlist page here
      navigation.navigate("Cart", { refreshCart: true });
    } else {
      alert("Delete all fishes from cart failed!");
    }
  };
  // Create StackNavigator & BottomNavigator here
  const RootStack = createStackNavigator();
  const Tab = createBottomTabNavigator();
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
                      navigation.navigate("Notification");
                    }}
                  >
                    <MaterialIcons
                      name="notifications"
                      size={20}
                    ></MaterialIcons>
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
  // Tab Navigator here
  function HomeTabs({ navigation }) {
    return (
      <Tab.Navigator>
        {/* Tab for Home */}
        <Tab.Screen
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
        ></Tab.Screen>
        {/* Tab for Cart */}
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
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
          }}
        ></Tab.Screen>
        {/* Tab for Wishlist */}
        <Tab.Screen
          name="Wishlist"
          component={Wishlist}
          options={{
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
          }}
        ></Tab.Screen>
        {/* Tab for Chat with shop */}
        <Tab.Screen
          name="Profile"
          component={Profile}
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
        ></Tab.Screen>
      </Tab.Navigator>
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
        {/* Route for Notification */}
        <RootStack.Screen
          name="Notification"
          component={Notification}
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
