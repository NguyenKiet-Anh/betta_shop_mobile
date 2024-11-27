import { View, Text, SafeAreaView, StyleSheet } from "react-native";
// Import components
import { InputField } from "../components/Profile/InputField";
import { SubmitButton } from "../components/SubmitButton";
import { Dropdown } from "react-native-element-dropdown";
// Import icons
import AntDesign from "react-native-vector-icons/AntDesign";
// Import Hook
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
// Import useAuth
import { useAuth } from "../context/authContext";
// Import api routes
import { getAllDistricts, getUserInfo, updateUserInfo } from "../routes/ProfileRoutes/ProfileRoutes";
// Main function
export default function EditProfile({ navigation }) {
    // Variables here
    const { userInfo } = useAuth();
    // Variables for input text
    const [fullname, setFullname] = useState(''); // Store full name
    const [phoneNumber, setPhoneNumber] = useState(''); // Store phone number
    const [address, setAddress] = useState(''); // Store address
    const [accountName, setAccountName] = useState(''); // Store account name
    const [districtCode, setDistrictCode] = useState(''); // Store district code
    const [districtNameData, setDistrictNameData] = useState([]); // Store district name fetched from database
    const [districtNameSelected, setDistrictNameSelected] = useState(''); // Store selected district name
    const [isLoading, setIsLoading] = useState(true); // For controlling fetching status
    const isFocusedEditProfile = useIsFocused();
    // Functions here
    const fetchData = async(id) => {
        // Get data about user
        const data = await getUserInfo(id);                
        setFullname(data.khach_hang_info.TenKhachHang);
        setPhoneNumber(data.khach_hang_info.SoDienThoai);
        setAddress(data.khach_hang_diachi.DiaChi);
        setAccountName(data.tai_khoan_info.TenTaiKhoan);
        setDistrictNameSelected(data.khach_hang_diachi.quan_info.TenQuan);
        setDistrictCode(data.khach_hang_diachi.MaQuan);
        // Get data about district name
        const district = await getAllDistricts();
        const districtData = district.districts.map(item => ({
            label: item.TenQuan,
            value: item.MaQuan,
        }));

    setDistrictNameData(districtData);
        setIsLoading(false);
    };
    useEffect(() => {
        if (isFocusedEditProfile) {
            fetchData(userInfo.ma_nguoi_dung);
        };
    }, [isFocusedEditProfile]);
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
        if (phoneNumber.length < 10) {
            alert("Phone number has at least 10 characters!")
            check_phonenumber = false;
        } else if(phoneNumber.length > 12) {
            alert("Phone number cannot have more than 12 characters!")
            check_phonenumber = false;
        };
        // Check address
        if (address.length === 0) {
            alert("Address cannot be empty!");
            check_address = false;
        };
        // Check Accountname
        if (accountName < 3) {
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
                "accountName": accountName
            }
            const response = await updateUserInfo(userInfo.ma_nguoi_dung, item);
            if (response.success) {                
                alert("Update successfully!")
                navigation.navigate("Profile");
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
                            <Dropdown
                                style={styles.dropdown}
                                iconStyle={styles.iconStyle}
                                data={districtNameData}
                                maxHeight={300}                            
                                labelField="label"
                                valueField="value"
                                placeholder={districtNameSelected}
                                value={districtNameSelected}
                                onChange={item => {
                                    setDistrictNameSelected(item.label);
                                    setDistrictCode(item.value);
                                }}
                                renderLeftIcon={() => (
                                    <AntDesign style={styles.icon} color="black" name="check" size={20} />
                                )}
                            />
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
    },
    // Dropdown
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})