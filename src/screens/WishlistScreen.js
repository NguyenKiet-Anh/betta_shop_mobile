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

    // Functions here
    const itemView = ({ item }) => {
        return (
            // Fish Cards
            <TouchableOpacity 
                style={styles.listCell}
                onPress={() => {navigation.navigate("Detail", {
                    itemId: item.id
                  })}}
            >
                <Image
                    source={item.image1}
                    style={styles.imageStyle}
                ></Image>
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
                    {/* <View style={styles.priceInfo}>
                        <Feather name="dollar-sign" size={25} color={'#b141aa'}></Feather>
                        <Text style={styles.fishPrice}>{item.price}</Text>
                    </View>                     */}
                </View>
                <View style={styles.actionButton}>
                    <TouchableOpacity style={styles.button}>
                        <Feather name="trash" size={20}></Feather>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Feather name="shopping-cart" size={20}></Feather>
                    </TouchableOpacity>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listContainer: {
        height: '100%',
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
    imageStyle: {
        width: '35%',
        height: 120,
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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'white',
        padding: 8,
        marginVertical: 2,
        borderRadius: 10
    },

})