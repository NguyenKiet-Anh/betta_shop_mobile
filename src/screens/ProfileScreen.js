import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
// Import icon here
import Feather from "react-native-vector-icons/Feather";
// Import Hook
import { useEffect, useState } from "react";
// Import context
import { useAuth } from "../context/authContext";
// Import api routes
import { getUserInfo } from "../routes/ProfileRoutes/ProfileRoutes";
// Main function
export default function Profile({ navigation }) {
    // Get userId
    const { userInfo } = useAuth()
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    // Declare function here
    useEffect(() => {
        const fetchData = async(id) => {
            const data = await getUserInfo(id);
            console.log(data);
            setUserData(data);
            setIsLoading(false);
        };
        fetchData(userInfo.ma_nguoi_dung);
    }, []);
    // Upload avatar
    const handleUploadAvatar = () => {
        console.log("Upload avatar");
    };
    // Goto change password
    const handleChangePass = () => {
        console.log("Change password");
    };
    // Logout
    const handleLogOut = () => {
        navigation.navigate("Sign-In");
    };
    // Return render here
    return (
        <>
        {
            isLoading ? (
                <Text>Loading ...</Text>
            ) : (
                <View style={styles.container}>
                    {/* Section for Avatar */}
                    <TouchableOpacity 
                        style={styles.avatarSection}
                        onPress={() => {handleUploadAvatar();}}
                    >
                        <Image
                            source={require("../assets/images/testImage/avatar1.jpeg")}
                            style={styles.imageStyle}
                        ></Image>                    
                    </TouchableOpacity>                
                    {/* Section for user's name */}
                    <View style={styles.nameSection}>
                        <Text style={styles.nameText}>Nguyễn Anh Kiệt</Text>
                        <TouchableOpacity>
                            <Feather name="edit-3" size={25}></Feather>
                        </TouchableOpacity>
                    </View>
                    {/* Section for personal information */}
                    <ScrollView style={styles.informationSection}>
                        <View>
                            <Text style={styles.titleText}>Thông tin cá nhân</Text>
                            <Text style={styles.contentText}>Số điện thoại</Text>
                            <Text style={styles.infoText}>{userData.khach_hang_info.SoDienThoai}</Text>
                            <Text style={styles.contentText}>Địa chỉ</Text>
                            <Text style={styles.infoText}>{userData.khach_hang_diachi.DiaChi}</Text>
                        </View>
                        <View>
                            <Text style={styles.titleText}>Thông tin tài khoản </Text>
                            <Text style={[styles.contentText, {fontStyle: 'italic', textAlign: 'center'}]}>Coming soon ... </Text>
                        </View>                
                    </ScrollView>
                    <View style={styles.buttonSection}>
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: '#b141aa', width: 150}]}
                            onPress={() => {handleChangePass();}}
                        >
                            <Text style={styles.buttonText}>Change password</Text>                        
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: '#ff5863', width: 100}]}
                            onPress={() => {handleLogOut();}}
                        >
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        </>
    );
};
// Create styles
const styles = StyleSheet.create({
    // Style for container
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    // Style for Avatar Section
    avatarSection: {
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    imageStyle: {
        width: 150, 
        height: 'full',
        borderRadius: 20        
    },
    // Style for Name Section
    nameSection: {
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameText: {        
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 15
    },
    // Style for Personal Information Section
    informationSection: {
        height: '50%',
        marginHorizontal: 10
    },
    titleText: {
        marginVertical: 10,
        fontSize: 19,
        fontWeight: '500'
    },
    contentText: {
        fontSize: 15,
        fontStyle: 'italic',
        marginVertical: 10
    },
    infoText: {
        fontSize: 15,
        marginTop: 3,
        marginBottom: 5,
        marginLeft: 10,
        fontWeight: '300'
    },
    // Style for button section
    buttonSection: {
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30,
        marginVertical: 10
    },
    button: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 16,
        color: 'white'
    }
});