import { View, FlatList, Text, StyleSheet } from "react-native";
import { InfoCard } from "../components/Management/InfoCard";
// Import Hook
import { useEffect, useState } from "react";
// Import api routes
import { getAllProduct, removeProduct } from "../routes/Management/ManagementRoutes";

export default function ProductManagement({ navigation }) {
 // Variables declared here
 const [productData, setProductData] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 // Function declared here
 useEffect(() => {
     const fetchData = async() => {
         const allProducts = await getAllProduct();
         if (allProducts.length > 0) {
            setProductData(allProducts);
            setIsLoading(false);
         };
     };
     fetchData();
 }, []);

 // Delete product
 const handleDeleteProduct = async(productId) => {
     const response = await removeProduct(productId);
     if (response.status) {
         setProductData(productData.filter(item => item.MaMatHang !== productId));
         alert(response.message)
     } else {
         alert(response.message)
     }
 };

 return (
     <>
     {
         isLoading ? (
             <Text>Loading...</Text>
         ) : (
             <View>
                 <FlatList
                     data={productData}
                     renderItem={({ item }) => <InfoCard
                         item={item} 
                         onDeletePress={() => {handleDeleteProduct(item.MaMatHang);}}                            
                         navigation={navigation}
                     />}
                     keyExtractor={item => item.MaMatHang}
                 ></FlatList>
             </View>
         )
     }
     </>        
 );
};

const styles = StyleSheet.create({
 container: {
     flex: 1,
     margin: 15,
     backgroundColor: 'red'
 },
});