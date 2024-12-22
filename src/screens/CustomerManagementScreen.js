import { View, FlatList, Text, StyleSheet } from "react-native";
// Import Hook
import { useState, useEffect } from "react";

// Import routes
import { getAllUsers, removeUser } from "../routes/Management/ManagementRoutes";
import { InfoCard } from "../components/Management/InfoCard";

export default function CustomerManagement({ navigation }) {   
    // Variables declared here
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Function declared here
    useEffect(() => {
        const fetchData = async() => {
            const allUsers = await getAllUsers();
            if (allUsers.length > 0) {
                setUserData(allUsers);
                setIsLoading(false);
            };
        };
        fetchData();
    }, []);

    // Delete user
    const handleDeleteUser = async(userId) => {
        const response = await removeUser(userId);
        if (response.status) {
            setUserData(userData.filter(item => item.MaKhachHang !== userId));
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
                        data={userData}
                        renderItem={({ item }) => <InfoCard
                            item={item} 
                            onDeletePress={() => {handleDeleteUser(item.MaKhachHang);}}                            
                            navigation={navigation}
                        />}
                        keyExtractor={item => item.MaKhachHang}
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