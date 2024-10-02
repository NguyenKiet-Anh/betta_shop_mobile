import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from "react-native";
// Import icons
import Feather from "react-native-vector-icons/Feather";

const fishData = [
    {
        id: 1,
        title: "Cá betta 1583 – Koi nemo galaxy tiger hổ rừng xanh",
        type: "Galaxy",
        gender: "Male",
        image1: require("../assets/images/testImage/Fish/Galaxy/Fish1/fish1_img1.jpg"),
        image2: require("../assets/images/testImage/Fish/Galaxy/Fish1/fish1_img2.jpg"),
        image3: require("../assets/images/testImage/Fish/Galaxy/Fish1/fish1_img3.jpg"),
        image4: require("../assets/images/testImage/Fish/Galaxy/Fish1/fish1_img4.jpg"),
        price: 180000
    },
    {
        id: 2,
        title: "Cá betta 1250 – Koi nemo galaxy hero Thuella",
        type: "Galaxy",
        gender: "Male",
        image1: require("../assets/images/testImage/Fish/Galaxy/Fish2/fish2_img1.jpg"),
        image2: require("../assets/images/testImage/Fish/Galaxy/Fish2/fish2_img2.jpg"),
        image3: require("../assets/images/testImage/Fish/Galaxy/Fish2/fish2_img3.jpg"),
        image4: require("../assets/images/testImage/Fish/Galaxy/Fish2/fish2_img4.jpg"),
        price: 140000
    },
    {
        id: 3,
        title: "Cá betta 1521 – Koi nemo galaxy dãi ngân hà avenger",
        type: "Galaxy",
        gender: "Male",
        image1: require("../assets/images/testImage/Fish/Galaxy/Fish3/fish3_img1.jpg"),
        image2: require("../assets/images/testImage/Fish/Galaxy/Fish3/fish3_img2.jpg"),
        image3: require("../assets/images/testImage/Fish/Galaxy/Fish3/fish3_img3.jpg"),
        image4: require("../assets/images/testImage/Fish/Galaxy/Fish3/fish3_img4.jpg"),
        price: 140000,
        newPrice: 100000
    },
    {
        id: 4,
        title: "Cá betta 1844 – Koi nemo galaxy butterfly champion of freedom zeus",
        type: "Galaxy",
        gender: "Male",
        image1: require("../assets/images/testImage/Fish/Galaxy/Fish4/fish4_img1.jpg"),
        image2: require("../assets/images/testImage/Fish/Galaxy/Fish4/fish4_img2.jpg"),
        image3: require("../assets/images/testImage/Fish/Galaxy/Fish4/fish4_img3.jpg"),
        image4: require("../assets/images/testImage/Fish/Galaxy/Fish4/fish4_img4.jpg"),
        price: 140000
    },
    {
        id: 5,
        title: "Cá betta 1320 – Halfmoon samurai super star Oda Nobunaga",
        type: "Halfmoon",
        gender: "Male",
        image1: require("../assets/images/testImage/Fish/Halfmoon/Fish1/fish1_img1.jpg"),
        image2: require("../assets/images/testImage/Fish/Halfmoon/Fish1/fish1_img2.jpg"),
        image3: require("../assets/images/testImage/Fish/Halfmoon/Fish1/fish1_img3.jpg"),
        image4: require("../assets/images/testImage/Fish/Halfmoon/Fish1/fish1_img4.jpg"),
        price: 180000
    },
    {
        id: 6,
        title: "Cá betta 1437 – Halfmoon dumbo white angel zeus",
        type: "Halfmoon",
        gender: "Male",
        image1: require("../assets/images/testImage/Fish/Halfmoon/Fish2/fish2_img1.jpg"),
        image2: require("../assets/images/testImage/Fish/Halfmoon/Fish2/fish2_img2.jpg"),
        image3: require("../assets/images/testImage/Fish/Halfmoon/Fish2/fish2_img3.jpg"),
        image4: require("../assets/images/testImage/Fish/Halfmoon/Fish2/fish2_img4.jpg"),
        price: 80000
    },
    {
        id: 7,
        title: "Cá betta 1773 – Halfmoon grizzle thái bạch ironwill balder",
        type: "Halfmoon",
        gender: "Male",
        image1: require("../assets/images/testImage/Fish/Halfmoon/Fish3/fish3_img1.jpg"),
        image2: require("../assets/images/testImage/Fish/Halfmoon/Fish3/fish3_img2.jpg"),
        image3: require("../assets/images/testImage/Fish/Halfmoon/Fish3/fish3_img3.jpg"),
        image4: require("../assets/images/testImage/Fish/Halfmoon/Fish3/fish3_img4.jpg"),
        price: 80000
    },
    {
        id: 8,
        title: "Cá betta 1856 – Halfmoon grizzle mustard gas swordmaster cernunnos",
        type: "Halfmoon",
        gender: "Male",
        image1: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img1.jpg"),
        image2: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img2.jpg"),
        image3: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img3.jpg"),
        image4: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img4.jpg"),
        price: 80000,
        newPrice: 40000
    }
];

export default function Cart({ navigation }) {
    // Variables here    
    const [amount, setAmount] = useState(100);
    // Functions here
        // Function for remove all cart list
        // Function for remove item from cart list
        // Function for flatlist showing
    const itemView = ({ item }) => {
        return (
            // Fish Cards
            <TouchableOpacity 
                style={styles.listCell}
                onPress={() => {navigation.navigate("Detail", {
                    itemId: item.id
                  })}}
            >
                {
                    amount >= 1000 ? (
                        <Image
                            source={item.image1}
                            style={styles.imageStyleBigger1000}
                        ></Image>
                    ) : (
                        <Image
                            source={item.image1}
                            style={styles.imageStyle}
                        ></Image>
                    )
                }                
                <View style={styles.fishInfo}>                    
                    <View>
                        <Text style={styles.fishType}>{item.type}</Text>
                        <Text style={styles.fishGender}>{item.gender}</Text>
                    </View>                    
                    <View>
                        {
                            item.newPrice ? (
                                <>
                                    <View style={styles.priceInfo}>
                                        <Feather name="dollar-sign" size={20} color={'#ff5863'}></Feather>
                                        <Text style={[styles.fishPrice, styles.fishOldPrice]}>{item.price}</Text>                        
                                    </View>                    
                                    <View style={styles.priceInfo}>
                                        <Feather name="dollar-sign" size={20} color={'#b141aa'}></Feather>
                                        <Text style={[styles.fishPrice, styles.fishNewPrice]}>{item.price}</Text>                        
                                    </View>                    
                                </>
                            ) : (
                                <View style={styles.priceInfo}>
                                    <Feather name="dollar-sign" size={20} color={'#b141aa'}></Feather>
                                    <Text style={[styles.fishPrice, styles.fishNewPrice]}>{item.price}</Text>                        
                                </View>                    
                            )
                        }                        
                    </View>                    
                </View>
                <View style={styles.actionButton}>                        
                    <TouchableOpacity style={styles.removeButton}>
                        <Feather name="trash" size={23}></Feather>
                    </TouchableOpacity>
                    <View style={styles.actionButtonSection}>
                        <TouchableOpacity style={styles.button}>
                            <Feather name="minus" size={23}></Feather>
                        </TouchableOpacity>
                        <Text style={styles.amountStyle}>{amount}</Text>
                        <TouchableOpacity style={styles.button}>
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
                    keyExtractor={item => item.id.toString()}
                    renderItem={itemView}
                >                                        
                </FlatList>
            </View>
            <View style={styles.paymentContainer}>
                <View>
                    <Text style={{fontSize: 16,fontWeight: '200'}}>Amount Price</Text>
                    <View style={styles.priceSection}>
                        <Feather name="dollar-sign" size={15}></Feather>
                        <Text style={{fontSize: 25, fontWeight: '500'}}>491</Text>
                    </View>
                </View>
                
                <TouchableOpacity
                    style={styles.payButton}
                >                                        
                        <Text style={{fontSize: 17, fontWeight: '600', color: 'white', marginRight: 10}}>Checkout </Text>
                        <View style={{width: 30, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'white'}}>
                            <Text style={{fontSize: 17, fontWeight: '600', color: '#b141aa'}}>4</Text>
                        </View>                    
                </TouchableOpacity>
            </View>
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