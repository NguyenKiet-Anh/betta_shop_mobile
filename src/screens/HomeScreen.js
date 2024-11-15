// import components of react native
import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Modal, Alert } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
// import icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// Testing data
const posterData = [
    {
        id: 1,
        img: require("../assets/images/testImage/Poster/poster1.jpeg")
    },
    {
        id: 2,
        img: require("../assets/images/testImage/Poster/poster2.jpeg")
    },
    {
        id: 3,
        img: require("../assets/images/testImage/Poster/poster3.png")
    }
]
const categoryName= [
    {
        id: 0,
        title: 'All'
    },
    {
        id: 1,
        title: 'Nemo'
    },
    {
        id: 2,
        title: 'Galaxy',
    },
    {
        id: 3,
        title: 'Halfmoon'
    },
    {
        id: 4,
        title: 'Fancy'
    },
    {
        id: 5,
        title: 'Dragon'
    }    
];
const fishData = [
    {
        id: 1,
        title: "Cá betta 1583 – Koi nemo galaxy tiger hổ rừng xanh",
        type: "Galaxy",
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
        image1: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img1.jpg"),
        image2: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img2.jpg"),
        image3: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img3.jpg"),
        image4: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img4.jpg"),
        price: 80000,
        newPrice: 40000
    }
];

export default function Home({ navigation }) {
    const [showModal, setShowModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true);
    const [isNight, setIsNight] = useState(true);
    const [fishList, setFishList] = useState(fishData);
    const [promotionList, setPromotionList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Functions here
    const handleLogout = () => {
        setShowModal(false);
        navigation.navigate("Sign-In");
    };
    // Showing Flatlist for categories name
    const handleGetAllFishByCategory = (category) => {        
        switch(category) {
            case "All":
                setFishList(fishData);
                break;
            default: 
                setFishList(fishData.filter(item => item.type === category && !item.newPrice));
                break
        };
        setSelectedCategory(category);    
    };
    const categoriesView = ({ item }) => {
        return (
            <View style={styles.categoriesFlatlistSection}>
                <TouchableOpacity onPress={() => {handleGetAllFishByCategory(item.title);}}>
                    {
                        selectedCategory === item.title ? (
                            <Text style={styles.categoriesSelectedFlatlistText}>{item.title}</Text>
                        ) : (
                            <Text style={styles.categoriesFlatlistText}>{item.title}</Text>
                        )                            
                    }                    
                </TouchableOpacity>
            </View>
        );
    };
    // Showing all Fish in selected Category
    const hanldleNavigationForCategories = (id, type) => {    
        if (id === "seeAll") {
            navigation.navigate("Category", {type: type});
        } else {
            navigation.navigate("Detail", {itemId: id});
        }
    };
    const FishInCatView = ({ item }) => {        
        return (            
            <TouchableOpacity style={styles.fishInCategoryFlatlistSection} onPress={() => {hanldleNavigationForCategories(item.id, item.type);}}>
                { item.id === "seeAll" ? (
                    <View style={styles.fishInCategoryFlatlistContent}>
                        <View style={styles.seeAll}>
                            <Feather name="more-vertical" size={100} color={'#bfacaa'}></Feather>
                        </View>                        
                    </View>
                ) : (
                    <View style={styles.fishInCategoryFlatlistContent}>
                        <Image
                            source={item.image1}
                            style={styles.fishInCategoryFlatlistImage}
                        ></Image>
                        <Text style={styles.fishInCategoryFlatlistName} numberOfLines={2}>{item.title}</Text>
                        <View style={styles.fishInCategoryFlatlistBuyFeature}>
                            <Text style={styles.fishInCategoryFlatlistPrice}>{item.price}</Text>
                            <View style={styles.buttonSection}>
                                <TouchableOpacity>
                                    <MaterialIcons name="favorite" size={25}></MaterialIcons>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <FontAwesome name="cart-plus" size={25}></FontAwesome>
                                </TouchableOpacity>
                            </View>                        
                        </View>                    
                    </View> 
                )}                
            </TouchableOpacity>
        );
    };
    // Showing Flatlist for Promotion and Discount
    useEffect(() => {
        const getPromotion = () => {            
            setPromotionList(fishData.filter(item => item.newPrice))            
        };
        getPromotion();
    }, []);
    
    const promotionView = ({ item }) => {
        return (            
            <TouchableOpacity style={styles.fishInCategoryFlatlistSection} onPress={() => {navigation.navigate("Promotion")}}>
                {
                    item.id === "seeAll" ? (
                        <View style={styles.fishInCategoryFlatlistContent}>
                            <Feather name="more-vertical" size={100} color={'#bfacaa'}></Feather> 
                        </View>                
                    ) : (
                        <View style={styles.fishInCategoryFlatlistContent}>
                            <Image
                                source={item.image1}
                                style={styles.fishInCategoryFlatlistImage}
                            ></Image>
                            <Text style={styles.fishInCategoryFlatlistName} numberOfLines={2}>{item.title}</Text>
                            <View style={styles.fishInCategoryFlatlistBuyFeature}>
                                <Text style={styles.fishInCategoryFlatlistPrice}>{item.newPrice}</Text>
                                <Text style={[styles.fishInCategoryFlatlistPrice, styles.fishInCategoryFlatlistNewPrice]}>{item.price}</Text>                        
                                <View style={styles.buttonSection}>
                                    <TouchableOpacity>
                                        <MaterialIcons name="favorite" size={25}></MaterialIcons>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <FontAwesome name="cart-plus" size={25}></FontAwesome>
                                    </TouchableOpacity>
                                </View>
                            </View>                    
                        </View>                
                    )
                }                
            </TouchableOpacity>
        );
    };
    // Functions for add to cart
    const addCart = () => {

    };
    // Function for add to wishlist
    const addWishlist = () => {

    };
    
    return (
        <SafeAreaView style={styles.container}>
            {/* For Profile modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={{position: 'absolute', left: '15%', width: '55%', backgroundColor: '#cad9e2', borderRadius: 5}}>
                    {/* Close modal */}
                    <TouchableOpacity style={styles.modalButton} onPress={() => {setShowModal(false);}}>
                        <MaterialIcons name="arrow-back" size={28}></MaterialIcons>
                    </TouchableOpacity>
                    {/* Go to profile page */}
                    <TouchableOpacity style={styles.modalButton}>
                        <FontAwesome5 name="user-alt" size={25} style={{marginHorizontal: 5}}></FontAwesome5>
                        <Text style={styles.modalText}>Profile management</Text>
                    </TouchableOpacity>
                    {/* Go to Admin management page - JUST FOR ADMIN */}
                    { isAdmin ? (
                            <TouchableOpacity style={styles.modalButton}>
                                <FontAwesome5 name="user-cog" size={25} style={{marginHorizontal: 5}}></FontAwesome5>
                                <Text style={styles.modalText}>Management for Admin</Text>
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )
                    }
                    {/* Change theme mode */}
                    <TouchableOpacity style={styles.modalButton}>
                        { isNight ? (
                                <>
                                    <FontAwesome5 name="moon" size={25} style={{marginHorizontal: 5}}></FontAwesome5>
                                    <Text style={styles.modalText}>Change light mode</Text>
                                </>
                            ) : (
                                <>
                                    <FontAwesome5 name="sun" size={25} style={{marginHorizontal: 5}}></FontAwesome5>
                                    <Text style={styles.modalText}>Change light mode</Text>
                                </>
                            )
                        }
                    </TouchableOpacity>
                    {/* Log out */}
                    <TouchableOpacity style={styles.modalButton} onPress={() => {handleLogout();}}>
                        <SimpleLineIcons name="logout" size={25} style={{marginHorizontal: 5}}></SimpleLineIcons>
                        <Text style={styles.modalText}>Logout</Text>
                    </TouchableOpacity>                    
                </View>
            </Modal>
            {/* For Home's content */}

            <ScrollView style={styles.contentContainer}>
                <View style={styles.header}>         
                    <View style={styles.headerComponent}>
                        <TouchableOpacity style={styles.headerButton} onPress={() => {navigation.navigate("Notification")}}>
                            <MaterialIcons name="notifications" size={20}></MaterialIcons>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.body}>
                    <Text style={{fontSize: 23, fontWeight: '700', marginVertical: 15}}>Discover</Text>
                    <View style={styles.searchSection}>
                        <View style={styles.searchByTextSection}>                            
                            <TextInput style={{width: '85%', height: '100%'}} placeholder="Search ..."></TextInput>
                            <TouchableOpacity style={{width: '10%'}}>
                                <Feather name="search" size={25}></Feather>
                            </TouchableOpacity>
                        </View>                
                        <View style={styles.carouselSection}>
                            <Carousel
                                width={344}
                                height={190}
                                loop
                                autoPlay={true}
                                data={posterData}
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
                                            style={{ width: '100%', height: '100%', resizeMode: 'cover' , borderRadius: 5}}
                                        ></Image>
                                    </View>
                                )}
                            />
                             <View style={styles.pagination}>
                                {posterData.map((_, index) => (
                                    <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]}></View>
                                ))}
                            </View>
                        </View>
                        <View>
                            <Text style={{fontSize: 23, fontWeight: '700', marginVertical: 15}}>Categories</Text>
                            <FlatList
                                horizontal={true}
                                data={categoryName}
                                renderItem={categoriesView}
                                keyExtractor={item => item.id.toString()}
                            ></FlatList>
                        </View>
                        <View>
                            <FlatList
                                horizontal={true}
                                data={[...fishList.slice(0, 2), {id: 'seeAll', type: selectedCategory}]}
                                renderItem={FishInCatView}
                                keyExtractor={item => item.id.toString()}
                            ></FlatList>
                        </View>
                    </View>
                    <View style={styles.promotionSection}>
                        <Text style={{fontSize: 23, fontWeight: '700', marginVertical: 15}}>Promotion and discounts</Text>
                        <FlatList
                            horizontal={true}
                            data={[...promotionList.slice(0, 2), {id: 'seeAll'}]}
                            renderItem={promotionView}
                            keyExtractor={item => item.id.toString()}
                        ></FlatList>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 10
    },

    header: {
        height: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarStyle: {
        width: 40,
        height: 40,
        borderRadius: 30
    },
    modalButton: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
        marginLeft: 5,
    },
    modalText: {
        fontWeight: '500'
    },  

    headerComponent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        
    },
    headerButton: {
        width: 35,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#d4d6d9'
    },

    carouselSection: {
        height: 190
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

    body: {
        marginHorizontal: 10
    },
    searchSection: {

    },
    searchByTextSection: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d4d6d9',
        borderRadius: 5,
        marginBottom: 15
    },
    // Flatlist for categories
    categoriesFlatlistSection: {
        marginRight: 25,
        marginBottom: 10
    },    
    categoriesFlatlistText: {
        fontSize: 17,
        fontWeight: '350',
        color: '#a4abb5'        
    },
    categoriesSelectedFlatlistText: {        
        fontSize: 17,
        fontWeight: '350',
        color: '#b141aa'        
    },
    // Flatlist for All fish in a specific category
    fishInCategoryFlatlistSection: {
        width: 215,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#f5f4f4',
        borderRadius: 10
    },
    fishInCategoryFlatlistContent: {        
        marginHorizontal: 3,
        marginVertical: 10
    },
    seeAll: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    // fishInCategoryFlatlistNameSeeAll: {
    //     fontSize: 18,
    //     fontWeight: '400',
    //     marginRight: 5
    // },
    fishInCategoryFlatlistImage: {
        width: 'full',
        height: 180,
        borderRadius: 10
    },    
    fishInCategoryFlatlistName: {
        fontSize: 15,
        fontWeight: '200',
        marginVertical: 10
    },
    fishInCategoryFlatlistBuyFeature: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fishInCategoryFlatlistPrice: {
        color: '#b141aa',
        fontWeight: '600'
    },
    fishInCategoryFlatlistNewPrice: {
        color: '#ff5863',
        textDecorationLine: 'line-through'
    },
    buttonSection: {
        width: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    // Promotion section
    promotionSection: {
        marginBottom: 20
    }
});

