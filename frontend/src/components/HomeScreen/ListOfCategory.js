import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
export const CategoryList = ({ item, selectedCategory, handleGetAllFishByCategory }) => {
    return (
        <View style={styles.categoriesFlatlistSection}>
            <TouchableOpacity onPress={() => {handleGetAllFishByCategory(item.TenLoaiMatHang);}}>
                {
                    selectedCategory === item.TenLoaiMatHang ? (
                        <Text style={styles.categoriesSelectedFlatlistText}>{item.TenLoaiMatHang}</Text>
                    ) : (
                        <Text style={styles.categoriesFlatlistText}>{item.TenLoaiMatHang}</Text>
                    )                            
                }                    
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
})