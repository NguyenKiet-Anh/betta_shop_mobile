// Import react native elements
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// Import hooks for navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
// Import screens here
import SignIn from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";
import Cart from "../screens/CartScreen";
import Notification from "../screens/NotificationScreen";
import Home from "../screens/HomeScreen";
import Wishlist from "../screens/WishlistScreen";
import Detail from "../screens/DetailScreen";
import Profile from "../screens/ProfileScreen";
import Review from "../screens/ReviewScreen";
import AllPromotion from "../screens/AllPromotionsScreen";
// Import Icon
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Octicons from "react-native-vector-icons/Octicons";
import CategoryScreen from "../screens/CategoryScreen";

export default function StackNavigator() {
    // Create StackNavigator & BottomNavigator here
    const RootStack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    const Drawer = createDrawerNavigator();
    // Get all fish in wishlist before rendering
    // Drawer Navigator here
    function DrawerMenu() {
        return (
            <Drawer.Navigator>
                {/* Route for Profile management */}
                <Drawer.Screen 
                    name="Profile Management"                    
                ></Drawer.Screen>
                {/* Route for Store Management - Just for Admin */}
                <Drawer.Screen
                    name="Store Management"
                ></Drawer.Screen>
                {/* Route for Help */}
                <Drawer.Screen
                    name="Help"
                ></Drawer.Screen>                
            </Drawer.Navigator>
        );
    };
    // Tab Navigator here
    function HomeTabs() {
        return (
            <Tab.Navigator>
                {/* Tab for Home */}
                <Tab.Screen
                    name="Home"
                    component={Home}
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
                                <FontAwesome6 name="house" size={22} color={'#b141aa'}></FontAwesome6>
                            ) : (
                                <FontAwesome6 name="house" size={22} color={'#a6b9c8'}></FontAwesome6>
                            )   
                    }}
                ></Tab.Screen>
                {/* Tab for Store Location */}
                <Tab.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        headerTitle: "Cart",
                        tabBarLabel: ({ focused }) => 
                            focused ? (
                                <Text style={styles.tabStyleFocused}>Location</Text>
                            ) : (
                                <Text style={styles.tabStyle}>Location</Text>
                            ),
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <FontAwesome5 name="shopping-cart" size={22} color={'#b141aa'}></FontAwesome5>
                            ) : (
                                <FontAwesome5 name="shopping-cart" size={22} color={'#a6b9c8'}></FontAwesome5>
                            )
                    }}
                ></Tab.Screen>
                {/* Tab for Wishlist */}
                <Tab.Screen
                    name="Wishlist"
                    component={Wishlist}
                    options={{       
                        headerRight: () => (
                            <TouchableOpacity style={{marginRight: 15}}>
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
                                <MaterialIcons name="favorite" size={25} color={'#b141aa'}></MaterialIcons>
                            ) : (
                                <MaterialIcons name="favorite" size={25} color={'#a6b9c8'}></MaterialIcons>
                            )
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
                                <FontAwesome name="user" size={25} color={'#b141aa'}></FontAwesome>
                            ) : (
                                <FontAwesome name="user" size={25} color={'#a6b9c8'}></FontAwesome>
                            )
                    }}
                ></Tab.Screen>
            </Tab.Navigator>
        );
    };
    // Return Stack Navigator here
    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName="Sign-In"
            >
                {/* Route for Sign In */}
                <RootStack.Screen
                    name="Sign-In"
                    component={SignIn}
                    options={{
                        headerShown: false
                    }}
                ></RootStack.Screen>
                {/* Route for Sign Up */}
                <RootStack.Screen
                    name="Sign-Up"
                    component={SignUp}
                    options={{
                        headerShown: false
                    }}
                ></RootStack.Screen>                
                {/* Route for Home */}
                <RootStack.Screen
                    name="HomeTabs"
                    component={HomeTabs}
                    options={{
                        headerShown: false
                    }}
                ></RootStack.Screen>
                {/* Route for Notification */}
                <RootStack.Screen
                    name="Notification"
                    component={Notification}
                >
                </RootStack.Screen>
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
                            <TouchableOpacity onPress={() => {console.log(route.params.itemId);}}>
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
                    options={({ route }) => ({
                        
                    })}
                ></RootStack.Screen>
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabStyle: {
        fontSize: 12, 
        fontWeight: '500', 
        color: '#a6b9c8'
    },
    tabStyleFocused: {
        fontSize: 12, 
        fontWeight: '500', 
        color: '#b141aa'
    }
})