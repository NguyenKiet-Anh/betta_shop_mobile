import { View, Text, SafeAreaView, StyleSheet } from "react-native";
// Import components
import { InputField } from "../components/Profile/InputField";
import { SubmitButton } from "../components/SubmitButton";
// Import Hook
import { useEffect, useState } from "react";
// Import useAuth
import { useAuth } from "../context/authContext";
// Import api routes
import { getUserInfo, updateUserInfo } from "../routes/ProfileRoutes/ProfileRoutes";
// Main function
export default function EditProfile() {
    const { userInfo } = useAuth();
    // Variables for input text
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');    
    const [accountName, setAccountName] = useState('');
    const [districtCode, setDistrictCode] = useState('')
    const [isLoading, setIsLoading] = useState(true); // For controlling fetching status
    useEffect(() => {
        const fetchData = async(id) => {
            const data = await getUserInfo(id);
            setFullname(data.khach_hang_info.TenKhachHang);
            setPhoneNumber(data.khach_hang_info.SoDienThoai);
            setAddress(data.khach_hang_diachi.DiaChi);
            setAccountName(data.tai_khoan_info.TenTaiKhoan);
            setIsLoading(false);
        };
        fetchData(userInfo.ma_nguoi_dung);
    }, []);
    const handleSubmitChange = async() => {
        let check_fullname = true;
        let check_phonenumber = true;
        let check_address = true;
        let check_accountname = true;
        // Check fullname
        if (fullname.length === 0) {
            alert("Fullname cannot be empty!");
            check_fullname = false;
        };
        // Check phonenumber
        if (check_phonenumber.length < 10) {
            alert("Phone number has at least 10 characters!")
            check_phonenumber = false;
        } else if(check_phonenumber.length > 12) {
            alert("Phone number cannot have more than 12 characters!")
        };
        // Check address
        if (check_address.length === 0) {
            alert("Address cannot be empty!");
            check_address = false;
        };
        // Check Accountname
        if (check_accountname < 3) {
            alert("Account name has at least 3 characters!");
            check_accountname = false;
        };
        // Call updateUserInfo api route
        if (check_fullname && check_phonenumber && check_address && check_accountname) {
            let item = {
                "userName": fullname,
                "phoneNumber": phoneNumber,
                "districtCode": districtCode,
                "address": address,
            }
            const response = await updateUserInfo(userInfo.ma_nguoi_dung, item);
            if (response.success) {
                alert("Update successfully!")
            } else {
                alert("Update failed!")
            }
        }        
    };
    return (
        <>
        {
            isLoading ? (
                <Text>Loading ...</Text>
            ) : (
                <SafeAreaView style={styles.container}>
                   <View style={styles.inputSection}>
                        {/* For full name */}
                        <InputField title={"Full Name"} value={fullname} setValue={(e) => setFullname(e)}></InputField>
                        {/* For phone number */}
                        <InputField title={"Phone number"} value={phoneNumber} setValue={(e) => setPhoneNumber(e)}></InputField>
                        {/* For district name */}
                        <View style={styles.districtNameSection}>
                            <Text style={styles.headerStyle}>District Name</Text>
                        </View>                        
                        {/* For address */}
                        <InputField title={"Address"} value={address} setValue={(e) => setAddress(e)}></InputField>
                        {/* For account name */}
                        <InputField title={"Account Name"} value={accountName} setValue={(e) => setAccountName(e)}></InputField>
                   </View>
                   <View style={styles.buttonSection}>
                        <SubmitButton title={"Submit Changes"} onPress={() => {handleSubmitChange();}}></SubmitButton>
                   </View>                    
                </SafeAreaView>
            )
        }
        </>        
    );
};
const styles=StyleSheet.create({
    container: {        
        flex: 1,
        marginHorizontal: 10
    },
    districtNameSection: {
        marginVertical: 10
    },
    headerStyle: {
        fontSize: 17,
        fontWeight: '450',
        fontStyle: 'italic',
        marginVertical: 10
    },
    inputSection: {
        marginVertical: 20
    },
    buttonSection: {
        marginTop: 10
    }
})