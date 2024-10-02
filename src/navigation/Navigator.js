// Import react native elements
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// Import hooks for navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// Import screens here
import SignIn from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";
import Cart from "../screens/CartScreen";
import Notification from "../screens/NotificationScreen";
import Home from "../screens/HomeScreen";
import Wishlist from "../screens/WishlistScreen";
import Detail from "../screens/DetailScreen";
import StoreLocation from "../screens/StoreLocation";
import ChatWithShop from "../screens/ChatScreen";
import Review from "../screens/ReviewScreen";
// Import Icon
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Octicons from "react-native-vector-icons/Octicons";

export default function StackNavigator() {
    // Create StackNavigator & BottomNavigator here
    const RootStack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    // Get all fish in wishlist before rendering
    // Render StackNavigator here
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
                {/* Tab for Store Location */}
                <Tab.Screen
                    name="StoreLocation"
                    component={StoreLocation}
                    options={{
                        headerTitle: "Stores Location",
                        tabBarLabel: ({ focused }) => 
                            focused ? (
                                <Text style={styles.tabStyleFocused}>Location</Text>
                            ) : (
                                <Text style={styles.tabStyle}>Location</Text>
                            ),
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <MaterialIcons name="location-pin" size={25} color={'#b141aa'}></MaterialIcons>
                            ) : (
                                <MaterialIcons name="location-pin" size={25} color={'#a6b9c8'}></MaterialIcons>
                            )
                    }}
                ></Tab.Screen>
                {/* Tab for Chat with shop */}
                <Tab.Screen
                    name="Chat"
                    component={ChatWithShop}
                    options={{
                        headerTitle: "Chat with Shop",
                        tabBarLabel: ({ focused }) => 
                            focused ? (
                                <Text style={styles.tabStyleFocused}>Chat</Text>
                            ) : (
                                <Text style={styles.tabStyle}>Chat</Text>
                            ),
                        tabBarIcon: ({ focused }) => 
                            focused ? (
                                <Ionicons name="chatbubble" size={25} color={'#b141aa'}></Ionicons>
                            ) : (
                                <Ionicons name="chatbubble" size={25} color={'#a6b9c8'}></Ionicons>
                            )
                    }}
                ></Tab.Screen>
            </Tab.Navigator>
        );
    };
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
                {/* Route for Cart */}
                <RootStack.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        headerRight: () => (
                            <TouchableOpacity style={{marginRight: 15}}>
                                <Octicons name="trash" size={25}></Octicons>
                            </TouchableOpacity>                            
                        )
                    }}                 
                >
                </RootStack.Screen>
                {/* Route for Notification */}
                <RootStack.Screen
                    name="Notification"
                    component={Notification}
                >
                </RootStack.Screen>
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