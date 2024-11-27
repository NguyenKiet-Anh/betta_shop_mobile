import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// Import icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
// Import context
import { useAuth } from "../../context/authContext";
// Import api routes here
import { addFishToWishList } from "../../routes/WishListRoutes/WishListRoutes";
import { addFishToCart } from "../../routes/CartRoutes/CartRoutes";
// Main Function here
export default function FishView({ navigation, item }) {
    // Variable for user id
    const { userInfo } = useAuth();    
    // Showing all Fish in selected Category
    const hanldleNavigationForCategories = (id, type) => {        
        if (id === "seeAll") {
            if (type !== "promotionList") {
                navigation.navigate("Category", {type: type});
            } else {
                navigation.navigate("Promotion");
            }
        } else {
            navigation.navigate("Detail", {itemId: id});
        }
    };
    // Add fish to wishlist here
    const handleAddWishList =  async(id) => {
        const response = await addFishToWishList(userInfo.ma_nguoi_dung, id);
        if (response.success) {
            alert(response.message);
        } else {
            alert(response.message);
        }
    };
    // Add fish to cart here
    const handleAddCart = async(id) => {
        const response = await addFishToCart(userInfo.ma_nguoi_dung, id);
        if (response.success) {
            alert("Add fish to cart successfully!");
        } else {
            if (response.message === "Cá đã tồn tại trong giỏ hàng") {
                alert("Fish already exists in cart!");
            } else {
                alert("Add fish to cart failed!");
            }
        }
    };
    // Return here
    return (
        <TouchableOpacity 
            style={styles.fishInCategoryFlatlistSection} 
            onPress={() => { hanldleNavigationForCategories(item.MaMatHang, item.ma_loai_ca_info.TenLoaiMatHang); }}
        >
            {item.MaMatHang === "seeAll" ? (
                <View style={styles.fishInCategoryFlatlistContent}>
                    <View style={styles.seeAll}>
                        <Feather name="more-vertical" size={100} color={'#bfacaa'} />
                    </View>                        
                </View>
            ) : (
                <View style={styles.fishInCategoryFlatlistContent}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${item.HinhAnh1}` }}
                        style={styles.fishInCategoryFlatlistImage}
                    />
                    <Text style={styles.fishInCategoryFlatlistName} numberOfLines={2}>{item.TenMatHang}</Text>
                    <View style={styles.fishInCategoryFlatlistBuyFeature}>
                        <Text style={styles.fishInCategoryFlatlistPrice}>{parseInt(item.Dongia)}</Text>
                        {
                            item.KhuyenMai && 
                            <Text 
                                style={[styles.fishInCategoryFlatlistPrice, styles.fishInCategoryFlatlistNewPrice]}
                            >
                                {parseInt(item.GiaKhuyenMai)}
                            </Text>
                        }
                        <View style={styles.buttonSection}>
                            <TouchableOpacity
                                onPress={() => {handleAddWishList(item.MaMatHang);}}
                            >
                                <MaterialIcons name="favorite" size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {handleAddCart(item.MaMatHang);}}
                            >
                                <FontAwesome name="cart-plus" size={25} />
                            </TouchableOpacity>
                        </View>                        
                    </View>                    
                </View> 
            )}
        </TouchableOpacity>
    );
};
// Define styles outside the component function
const styles = StyleSheet.create({
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
    fishInCategoryFlatlistImage: {
        width: '100%',
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
    }
});
