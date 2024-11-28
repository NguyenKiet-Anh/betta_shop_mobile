import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, Modal } from "react-native";
// Import Hook
import { useState, useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
// Import icons
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
// Import context
import { useAuth } from "../context/authContext";
// Import api routes
import { getCartById, removeFishFromCart } from "../routes/CartRoutes/CartRoutes";
// Main function
export default function Cart({ navigation, route }) {
    // Variables here    
    const { userInfo } = useAuth();
    const [fishData, setFishData] = useState([]); // Store fish data fetched from server
    const [amount, setAmount] = useState(0); //
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // For controlling render event
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false); // Payment Modal
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false); // Confirmation Modal
    const [isProcessing, setIsProcessing] = useState(false); // Payment processing
    const isFocusedCart = useIsFocused(); // For re-run useEffect
    // Functions here
    // useEffect for getting wishlsit for the first time accessing wishlist screen
    const refreshCart = async () => {
        const cartData = await getCartById(userInfo.ma_nguoi_dung);
        setFishData(cartData);
        setIsLoading(false);
    }; 
    useEffect(() => {
        if (isFocusedCart || route.params?.refreshCart) {
            refreshCart(); // Fetch fresh wishlist data
            if (route.params?.refreshCart) {
                // Reset refreshWishlist param after the data is fetched
                navigation.setParams({ refreshCart: false });
            }
        }
    }, [isFocusedCart, route.params?.refreshCart]);
    // Function for updating cart
    const handleUpdateCart = async() => {
    };
    // Function for removing all cart list
    // Function for removing item from cart list
    const handleRemoveFish = async(id) => {
        const response = await removeFishFromCart(userInfo.ma_nguoi_dung, id);
        if (response.success) {
            setFishData(fishData.filter(item => item.MaMatHang !== id));
            alert("Remove fish successfully!");
        } else {
            alert("Remove fish failed!");
        }
    };
    // Function for handling payment
    const handlePayment = async () => {
        setIsProcessing(true);
        // Call Momo payment API
        const paymentResponse = await makePayment(userInfo.ma_nguoi_dung, totalPrice);
        if (paymentResponse.success) {
            // Reset cart after successful payment
            alert("Payment successful!");
            setFishData([]); // REset cart
        } else {
            alert("Payment failed!");
        }
        setIsProcessing(false);
        setIsPaymentModalVisible(false);
    };
    // Function for handling payment confirmation
    const handleConfirmation = () => {
        setIsConfirmationModalVisible(true);
    };
    // Return View for each fish in cart
    const itemView = ({ item }) => {
        return (
            // Fish Cards
            <TouchableOpacity 
                style={styles.listCell}
                onPress={() => {navigation.navigate("Detail", {
                    itemId: item.MaMatHang
                  })}}
            >
                {
                    amount >= 1000 ? (
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${item.ca_info.HinhAnh1}` }}
                            style={styles.imageStyleBigger1000}
                        ></Image>
                    ) : (
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${item.ca_info.HinhAnh1}` }}
                            style={styles.imageStyle}
                        ></Image>
                    )
                }                
                <View style={styles.fishInfo}>                    
                    <View>
                        <Text style={styles.fishType}>{item.ca_info.ma_loai_ca_info.TenLoaiMatHang}</Text>
                        {
                            item.ca_info.Gioitinh === "M" ? (
                                <Ionicons size={22} name="male"></Ionicons>
                            ) : (
                                <Ionicons size={22} name="female"></Ionicons>
                            )
                        }       
                    </View>                    
                    <View>
                        {
                            item.ca_info.KhuyenMai ? (
                                <>
                                    <View style={styles.priceInfo}>
                                        <Feather name="dollar-sign" size={20} color={'#ff5863'}></Feather>
                                        <Text style={[styles.fishPrice, styles.fishOldPrice]}>{parseInt(item.ca_info.Dongia)}</Text>                        
                                    </View>                    
                                    <View style={styles.priceInfo}>
                                        <Feather name="dollar-sign" size={20} color={'#b141aa'}></Feather>
                                        <Text style={[styles.fishPrice, styles.fishNewPrice]}>{parseInt(item.ca_info.GiaKhuyenMai)}</Text>                        
                                    </View>                    
                                </>
                            ) : (
                                <View style={styles.priceInfo}>
                                    <Feather name="dollar-sign" size={20} color={'#b141aa'}></Feather>
                                    <Text style={[styles.fishPrice, styles.fishNewPrice]}>{parseInt(item.ca_info.Dongia)}</Text>                        
                                </View>                    
                            )
                        }                        
                    </View>                    
                </View>
                <View style={styles.actionButton}>                        
                    <TouchableOpacity 
                        onPress={() => {handleRemoveFish(item.MaMatHang);}}
                        style={styles.removeButton}
                    >
                        <Feather name="trash" size={23}></Feather>
                    </TouchableOpacity>
                    <View style={styles.actionButtonSection}>
                        <TouchableOpacity 
                            onPress={() => {handleUpdateCart(item.MaMatHang);}}
                            style={styles.button}
                        >
                            <Feather name="minus" size={23}></Feather>
                        </TouchableOpacity>
                        <Text style={styles.amountStyle}>{amount}</Text>
                        <TouchableOpacity 
                            onPress={() => {handleUpdateCart(item.MaMatHang);}}
                            style={styles.button}
                        >
                            <Feather name="plus" size={23} style={{fontWeight: 'bold'}}></Feather>
                        </TouchableOpacity>
                    </View>                                        
                </View>                
            </TouchableOpacity>
        );
    };
    // Return render here
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList
                    data={fishData}
                    keyExtractor={item => item.MaMatHang}
                    renderItem={itemView}
                >                                        
                </FlatList>
            </View>
            <View style={styles.paymentContainer}>
                <View>
                    <Text style={{fontSize: 16,fontWeight: '200'}}>Amount Price</Text>
                    <View style={styles.priceSection}>
                        <Feather name="dollar-sign" size={15}></Feather>
                        <Text style={{fontSize: 25, fontWeight: '500'}}>{totalPrice}</Text>
                    </View>
                </View>
                
                <TouchableOpacity
                    style={styles.payButton}
                >                                        
                        <Text style={{fontSize: 17, fontWeight: '600', color: 'white', marginRight: 10}}>Checkout </Text>
                        <View style={{width: 30, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'white'}}>
                            <Text style={{fontSize: 17, fontWeight: '600', color: '#b141aa'}}>{amount}</Text>
                        </View>                    
                </TouchableOpacity>
            </View>
             {/* Payment Modal */}
             <Modal
                visible={isPaymentModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsPaymentModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Choose Payment Method</Text>
                        <TouchableOpacity onPress={handleConfirmation}>
                            <Text style={styles.modalButton}>Momo Payment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsPaymentModalVisible(false)}>
                            <Text style={styles.modalButton}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Confirm Modal */}
            <Modal
                visible={isConfirmationModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setIsConfirmationModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Are you sure you want to pay?</Text>
                        <TouchableOpacity onPress={handlePayment} style={styles.modalButton}>
                            <Text>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsConfirmationModalVisible(false)} style={styles.modalButton}>
                            <Text>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listContainer: {
        height: '90%',
    },
    listCell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f2f3f6',
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10
    },
    imageStyleBigger1000: {
        width: '42%',
        height: 150,
        borderRadius: 10
    },
    imageStyle: {
        width: '39%',
        height: 140,
        borderRadius: 10
    },
    fishInfo: {
        width: '43%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 3
    },
    fishType: {        
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 5
    },
    fishGender: {
        fontSize: 15,
        fontWeight: '100'
    },    
    priceInfo: {
        flexDirection: 'row',
        alignItems: 'space-between',
    },
    fishOldPrice: {
        color: '#ff5863',
        fontWeight: '400',  
        textDecorationLine: 'line-through'
    },
    fishNewPrice: {
        color: '#b141aa',
        fontWeight: '450'
    },
    fishPrice: {
        fontSize: 17,              
    },
    actionButton: {
        width: '12%',
        flexDirection: 'column',
        
    },
    actionButtonSection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,    
    },
    removeButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 4,        
        borderRadius: 10,
        marginBottom: 5
    },  
    button: {
        backgroundColor: '#f2f3f6',
        padding: 4,
        marginVertical: 2,
        borderRadius: 10
    },
    amountStyle: {
        fontSize: 18,
        fontWeight: '600'
    },

    paymentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 40
    },
    priceSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    payButton: {
        width: 140,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',        
        borderRadius: 10,    
        backgroundColor: '#b141aa'        
    }
})