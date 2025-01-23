// Import react native elements
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// Import hooks for navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
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
const RootStack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerMenu({ navigation }) {
  const { userInfo } = useAuth();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: "Home",
          headerRight: () => (
            <View style={styles.headerRightBtn}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notification")}
              >
                <MaterialIcons name="notifications" size={20} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      {userInfo.isAdmin ? (
        <>
          <Drawer.Screen
            name="Products Management"
            component={ProductManagement}
          />
          <Drawer.Screen
            name="Customers Management"
            component={CustomerManagement}
          />
        </>
      ) : (
        <>
          <Drawer.Screen name="Store Location" component={StoreLocation} />
          <Drawer.Screen name="About Us" component={AboutUs} />
        </>
      )}
    </Drawer.Navigator>
  );
}

function ProfileTabs() {
  return (
    <TopTab.Navigator
      initialRouteName="PersonalInformation"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, textTransform: "none" },
        tabBarActiveTintColor: "#418FF5",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <TopTab.Screen
        name="PersonalInformation"
        component={Profile}
        options={{ title: "Personal Information" }}
      />
      <TopTab.Screen
        name="PaymentHistory"
        component={History}
        options={{ title: "Payment History" }}
      />
    </TopTab.Navigator>
  );
}

function HomeTabs({ navigation }) {
  const {
    cartLength,
    wishLength,
    setCartLength,
    setWishLength,
    ipAddress,
    userInfo,
  } = useAuth();

  const handleDeleteCart = async () => {
    const response = await deleteFishFromCart(
      ipAddress,
      userInfo.ma_nguoi_dung
    );
    if (response.success) {
      setCartLength(0);
      alert("Delete all fishes from cart successfully!");
      navigation.navigate("Cart", { refreshCart: true });
    } else {
      alert("Delete all fishes from cart failed!");
    }
  };

  const handleDeleteWishList = async () => {
    const response = await deleteWishList(ipAddress, userInfo.ma_nguoi_dung);
    if (response.success) {
      setWishLength(0);
      alert("Delete all fishes from wishlist successfully!");
      navigation.navigate("Wishlist", { refreshWishlist: true });
    } else {
      alert("Delete all fishes from wishlist failed!");
    }
  };

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="HomeTab"
        component={DrawerMenu}
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
                  <Ionicons name="chatbubble" size={20}></Ionicons>
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarBadge: cartLength > 0 ? cartLength : null,
          headerRight: () => (
            <TouchableOpacity
              onPress={handleDeleteCart}
              style={styles.headerRightBtn}
            >
              <Octicons name="trash" size={25} />
            </TouchableOpacity>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#b141aa" : "#a6b9c8" }}>Cart</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="shopping-cart"
              size={22}
              color={focused ? "#b141aa" : "#a6b9c8"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarBadge: wishLength > 0 ? wishLength : null,
          headerRight: () => (
            <TouchableOpacity
              onPress={handleDeleteWishList}
              style={styles.headerRightBtn}
            >
              <Octicons name="trash" size={25} />
            </TouchableOpacity>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#b141aa" : "#a6b9c8" }}>
              Wishlist
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="favorite"
              size={25}
              color={focused ? "#b141aa" : "#a6b9c8"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTabs}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? "#b141aa" : "#a6b9c8" }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={25}
              color={focused ? "#b141aa" : "#a6b9c8"}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function StackNavigator() {
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
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Sign-In">
        <RootStack.Screen
          name="Sign-In"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Sign-Up"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ChatWithShop"
          component={ChatWithShop}
          options={{
            headerTitle: "Chat With Shop",
          }}
        />
        <RootStack.Screen name="Category" component={CategoryScreen} />
        <RootStack.Screen name="Promotion" component={AllPromotion} />
        <RootStack.Screen
          name="Detail"
          component={Detail}
          options={({ route }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => handleAddFishToWishList(route.params.itemId)}
                style={styles.headerRightBtn}
              >
                <MaterialIcons name="favorite-outline" size={25} />
              </TouchableOpacity>
            ),
          })}
        />
        <RootStack.Screen name="Review" component={Review} />
        <RootStack.Screen
          name="DetailHistory"
          component={DetailHistory}
          options={{ title: "Purchased Fishes" }}
        />
        <RootStack.Screen name="EditProfile" component={EditProfile} />
        <RootStack.Screen name="ChangePassword" component={ChangePassword} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
  headerRightBtn: { marginRight: 15 },
});
