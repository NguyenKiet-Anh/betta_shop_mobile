// Import react native elements
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
// Import Icon
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
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

export default function Detail({ route, navigation }) {
    const { itemId } = route.params;
    const { width } = Dimensions.get('window');
    const [fish, setFish] = useState([]);
    const [fishImages, setFishImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    // Get information of fish as id
    useEffect(() => {
        const getFishById = () => {
            for (let i=0;i<fishData.length;i++) {
                if (fishData[i].id === itemId) {
                    setFish(fishData[i]);
                    setFishImages([
                        {
                            id: 1,
                            img: fishData[i].image1
                        },
                        {
                            id: 2,
                            img: fishData[i].image2
                        },
                        {
                            id: 3,
                            img: fishData[i].image3
                        },
                        {
                            id: 4,
                            img: fishData[i].image4
                        }
                    ])
                }
            };
        };
        getFishById();
    }, []);
    // Function for add to cart
    
    // Function for add to wishlist

    return (
        <>
            {
                fish.id && fish.newPrice && (
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
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Image
                                                source={item.img}
                                                style={styles.image}
                                            ></Image>
                                        </View>
                                    )}
                                />
                                <View style={styles.pagination}>
                                    {fishImages.map((_, index) => (
                                        <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]}></View>
                                    ))}
                                </View>
                            </View>
                        </View>     
                        <View style={styles.content}>
                            <Text style={styles.fishType}>{fish.type}</Text>
                            <Text style={styles.fishTitle}>{fish.title}</Text>                            
                            <View style={styles.genderSection}>
                                <FontAwesome name="transgender" size={25}></FontAwesome>
                                <Text style={styles.fishGender}>{fish.gender}</Text>
                            </View>                       
                            <View style={styles.priceInfo}>
                                <View style={styles.newPriceSection}>
                                    <Fontisto name="dollar" size={25} color={"#b141aa"}></Fontisto>
                                    <Text style={styles.fishNewPrice}>{fish.newPrice}</Text>
                                </View>                                
                                <Text style={styles.fishPrice}>{fish.price}</Text>                                                                
                            </View>
                            <View style={styles.buttonSection}>
                                <TouchableOpacity style={styles.seeComment}>
                                    <Text style={{fontWeight: 'bold', color: 'white'}}>See reviews</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addCartButton}>
                                    <Text style={{fontWeight: 'bold', color: 'white'}}>Add to cart</Text>
                                    <Text style={{fontSize: 20, color: 'white'}}>|</Text>
                                    <FontAwesome5 name="cart-plus" size={22} color={'white'}></FontAwesome5>
                                </TouchableOpacity>
                            </View>     
                        </View>                        
                    </View>
                )
            }
            {
                fish.id && !fish.newPrice && (
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
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Image
                                                source={item.img}
                                                style={styles.image}
                                            ></Image>
                                        </View>
                                    )}
                                />
                                <View style={styles.pagination}>
                                    {fishImages.map((_, index) => (
                                        <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]}></View>
                                    ))}
                                </View>
                            </View>
                        </View>    
                        <View style={styles.content}>
                            <Text style={styles.fishType}>{fish.type}</Text>
                            <Text style={styles.fishTitle}>{fish.title}</Text>                            
                            <View style={styles.genderSection}>
                                <FontAwesome name="transgender" size={25}></FontAwesome>
                                <Text style={styles.fishGender}>{fish.gender}</Text>
                            </View>                       
                            <View style={styles.priceInfo}>
                                <View style={styles.newPriceSection}>
                                    <Fontisto name="dollar" size={25} color={"#b141aa"}></Fontisto>
                                    <Text style={styles.fishNewPrice}>{fish.price}</Text>
                                </View>                                
                                <Text style={styles.fishPrice}>{fish.price}</Text>                                
                            </View>
                            <View style={styles.buttonSection}>
                                <TouchableOpacity
                                    onPress={() => {navigation.navigate("Review", {
                                        itemId: fish.id
                                      })}}
                                    style={styles.seeComment}
                                >
                                    <Text style={{fontWeight: 'bold', color: 'white'}}>See reviews</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addCartButton}>
                                    <Text style={{fontWeight: 'bold', color: 'white'}}>Add to cart</Text>
                                    <Text style={{fontSize: 20, color: 'white'}}>|</Text>
                                    <FontAwesome5 name="cart-plus" size={22} color={'white'}></FontAwesome5>
                                </TouchableOpacity>
                            </View>     
                        </View>                                           
                    </View>
                )
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    
    carouselSection: {
        height: 375
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        width: 20,
        height: 3,
        backgroundColor: 'white',
        marginBottom: 5,
        marginHorizontal: 10,
        borderRadius: 10
    },
    activeDot: {
        backgroundColor: '#b141aa', // Active dot color
    },
    
    headerImage: {
        width: '100%',
    },
    image: {        
        width: 'full',
        height: 375,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35
    },

    content: {
        width: '90%',
        height: '10%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    fishTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20
    },
    fishType: {
        fontSize: 19,
        fontWeight: '200',
        marginVertical: 10
    },
    genderSection: {
        flexDirection: 'row',
        marginVertical: 10
    },
    fishGender: {
        fontSize: 15,
        marginLeft: 5
    },
    priceInfo: {        
        flexDirection: 'row',
        marginVertical: 20
    },
    newPriceSection: {
        flexDirection: 'row',
        marginRight: 20
    },
    fishNewPrice: {
        fontSize: 17,
        fontWeight: '500',
        color: '#b141aa',                
        marginLeft: 3
    },
    fishPrice: {
        fontSize: 17,
        fontWeight: '500',
        color: '#ff5863',
        textDecorationLine: 'line-through'            
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15
    },
    seeComment: {
        width: '30%',
        height: 50,
        backgroundColor: '#ff5863',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    addCartButton: {
        width: '60%',
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#b141aa',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5
    }
});