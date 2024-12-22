import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// Import icons
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Fontisto from "react-native-vector-icons/Fontisto";

export const InfoCard = ({ item, onDeletePress, navigation }) => {    
    return (
        <TouchableOpacity 
            disabled={item.MaKhachHang ? true : false}
            onPress={() => {
                if (item.MaMatHang) {
                  navigation.navigate("Detail", {
                    itemId: item.MaMatHang
                  });
                };
              }}
            style={styles.container}
        >
            <View style={styles.imageSection}>
                <Image
                    source={{ uri: `data:image/jpeg;base64,${item.HinhAnh}` }}
                    style={styles.imageStyle}
                />
            </View>
            <View style={styles.info}>
                <View style={styles.infoSection}>
                    <Text style={styles.infoTextStyle}>{item.TenKhachHang ? item.TenKhachHang : item.TenMatHang}</Text>
                    {
                        item.SoDienThoai ? (
                            <Text style={styles.infoTextStyle}>{item.SoDienThoai}</Text>
                        ) : (
                            <View>
                                { !item.KhuyenMai && <Text style={[styles.infoTextStyle, styles.newPrice]}>{parseInt(item.DonGia)}</Text>}
                                { item.KhuyenMai && <Text style={[styles.infoTextStyle, styles.oldPrice]}>{parseInt(item.DonGia)}</Text> }
                                { item.KhuyenMai && <Text style={[styles.infoTextStyle, styles.newPrice]}>{parseInt(item.GiaKhuyenMai)}</Text> }
                            </View>
                        )                        
                    }                    
                </View>
                {
                    item.MaKhachHang ? (
                        <View style={styles.section}>
                            <View style={styles.actionSection}>
                                <MaterialIcons name="shopping-cart-checkout" size={25} color={"purple"}/>
                                <Text style={styles.actionTextStyle}>{item.TongLuotThanhToan}</Text>                    
                            </View>
                            <View style={styles.actionSection}>
                                <FontAwesome name="comment" size={25} color={"purple"}/>
                                <Text style={styles.actionTextStyle}>{item.TongLuotDanhGia}</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.GenderAndComment}>
                            { item.GioiTinh === "M" && <Fontisto name="mars" size={20}></Fontisto> }
                            { item.GioiTinh === "F" && <Fontisto name="venus" size={20}></Fontisto> }
                            <View style={[styles.actionSection, styles.fishComment]}>
                                <FontAwesome name="comment" size={25} color={"purple"}/>
                                <Text style={styles.actionTextStyle}>{item.SoLuotDanhgia}</Text>
                            </View>
                        </View>
                    )                    
                }                                         
            </View>
            <TouchableOpacity 
                style={styles.removeButton}
                onPress={onDeletePress}
            >
                <Octicons name="trash" size={23}></Octicons>
            </TouchableOpacity>       
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 125,
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5        
    },
    // Image section
    imageSection: {
        width: '35%',        
        margin: 5
    },
    imageStyle: {
        width: '100%',
        height: '100%',        
        borderRadius: 10
    },  
    // Info Section
    info: {
        width: '50%'
    },
    infoSection: {
        marginVertical: 5,
        height: '50%',        
    },
    infoTextStyle: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 9
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: 'red'
    },
    newPrice: {
        color: 'purple'
    },
    // Info section
    section: {    
        flexDirection: 'row'
    },
    actionSection: {        
        width: '45%',
        flexDirection: 'row',
        marginVertical: 5
    },
    actionTextStyle: {
        fontWeight: '600',
        fontSize: 15,
        marginLeft: 5,
        color: "purple"
    },
    // Remove button
    removeButton: {
        marginTop: 5
    },
    GenderAndComment: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fishComment: {
        marginLeft: 35
    }
});