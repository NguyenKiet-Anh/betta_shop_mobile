import { useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView, View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import fishcategory from "../components/fishInCategory";

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
    },
    {
        id: 9,
        title: "Cá betta 1856 – Halfmoon grizzle mustard gas swordmaster cernunnos",
        type: "Halfmoon",
        image1: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img1.jpg"),
        image2: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img2.jpg"),
        image3: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img3.jpg"),
        image4: require("../assets/images/testImage/Fish/Halfmoon/Fish4/fish4_img4.jpg"),
        price: 80000,
        newPrice: 40000
    },
    {
        id: 10,
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

export default function Category({ route, navigation }) {
    // Declare variables here
    const { type } = route.params; // Get type passed through navigation
    const [data, setData] = useState([]); // Data for showing
    const [selectedCategory, setSelectedCategory] = useState(type); // This variable is used to store selected category
    const [countFish, setCountFish] = useState(0); // This variable is used to store number of fish will be show in flatlist
    const [searchTerm, setSearchTerm] = useState(""); // This variable is used to store input from user keyboard
    const [searchResults, setSearchResults] = useState([]); // This variable is used to store results of searching

    // Declare function here
        // useEffect for getting data in first time page has been accessed
    useEffect(() => {
        const fetchData = () => {
            if (type === "All") {
                setCountFish(fishData.length);
                setData(fishData);
            }
            else {
                const filteredData = fishData
                .filter(fish => fish.type === type)
                .reduce((acc, current) => {
                    const x = acc.find(item => item.id === current.id);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
                setCountFish(filteredData.length);
                setData(filteredData);
            }            
        };
        fetchData();
    }, []);
        //  Navigate to selected fish
    const hanldleNavigationForCategories = (id, type) => {    
        if (id === "seeAll") {
            navigation.navigate("Category", {type: type});
        } else {
            navigation.navigate("Detail", {itemId: id});
        }
    };
        // Search as fish's name
    useEffect(() => {
        if (searchTerm.trim() !== "") {
            const results = data.filter((item) => 
                item.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            );    
            setCountFish(results.length)        ;
            setSearchResults(results);
            } else {
            setCountFish(data.length);
            setSearchResults(data);
            }
    }, [searchTerm]);
        // Change category
    const handleGetAllFishByCategory = (category) => {            
        switch(category) {
            case "All":
                setData(fishData);
                setCountFish(fishData.length);
                break;
            default: 
                setData(fishData.filter(item => item.type === category));
                setCountFish(fishData.filter(item => item.type === category).length);                
                break
        };
        setSelectedCategory(category);    
    };
    // Variable for showing filtered items
    const items = searchTerm ? searchResults : data;
        // Show list of categories
    const renderCategory = ({ item }) => {        
        return(
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
        // Show fish in selected category
    const renderItem = ({ item }) => {
        return(
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
                        <View style={{marginHorizontal: 5}}>
                            <Text style={styles.fishInCategoryFlatlistName} numberOfLines={2}>{item.title}</Text>
                            <View style={styles.fishInCategoryFlatlistBuyFeature}>
                                {
                                    item.newPrice ? (
                                        <View>
                                            <Text style={styles.fishInCategoryFlatlistPrice}>{item.price}</Text>
                                            <Text style={styles.fishInCategoryFlatlistNewPrice}>{item.newPrice}</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.fishInCategoryFlatlistPrice}>{item.price}</Text>
                                    )
                                }                                                           
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
                    </View> 
                )}                
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sContainer}>
                <View style={styles.headerSection}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5, borderWidth: 1, borderColor: '#a2b0a6', borderRadius: 5}}>
                        <TouchableOpacity 
                            onPress={() => {handleSearch();}}
                        >
                            <AntDesign name="search1" size={24}></AntDesign>
                        </TouchableOpacity>
                        <TextInput 
                            style={{width: 230, height: 40, marginLeft: 5}}
                            placeholder="Fish's name ...."
                            value={searchTerm}
                            onChangeText={(e) => setSearchTerm(e)}
                        ></TextInput>
                    </View>                    
                    <AntDesign name="filter" size={24}></AntDesign>
                </View>
                <View style={styles.bodySection}>
                    <View style={{marginVertical: 15}}>
                        <Text style={{fontSize: 18, fontWeight: 600}}>Tất cả ({countFish})</Text>
                        
                        <View style={{marginVertical: 7}}>
                            <FlatList
                                horizontal={true}
                                data={categoryName}
                                renderItem={renderCategory}
                                keyExtractor={item => item.id.toString()}                                
                            ></FlatList>
                        </View>
                    </View>
                    <View>
                        { data.length > 0 ? (
                            <FlatList
                                key={'#'}
                                data={items}
                                renderItem={renderItem}
                                keyExtractor={item => item.id.toString()}
                                numColumns={2}                        
                            ></FlatList>
                        ) : (
                            <Text style={{fontSize: 18, fontWeight: '400', fontStyle: 'italic', color: '#a4abb5', textAlign: 'center'}}>Empty</Text>
                        )}                    
                    </View>                    
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    sContainer: {
        flex: 1,
        marginHorizontal: 20,
    },

    headerSection: {
        marginVertical: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    bodySection: {
        height: '80%',
        flexDirection: 'column',
    },

    fishInCategoryFlatlistSection: {
        width: "47%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: '#f5f4f4',
        borderRadius: 10
    },
    fishInCategoryFlatlistContent: {  
        width: '100%',
        height: '100%'              
    },
    fishInCategoryFlatlistImage: {
        width: 'full',
        height: 150,
        borderRadius: 10
    },    
    fishInCategoryFlatlistName: {
        fontSize: 15,
        fontWeight: '200',
    },
    fishInCategoryFlatlistBuyFeature: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    }      
});