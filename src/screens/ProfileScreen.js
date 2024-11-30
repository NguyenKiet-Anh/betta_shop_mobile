import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
// Import component
import { TextField } from "../components/Profile/TextField";
// Import icon here
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
// Import Hook
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

// Import context
import { useAuth } from "../context/authContext";
// Import api routes
import {
  getUserInfo,
  updateUserAvatar,
} from "../routes/ProfileRoutes/ProfileRoutes";
// Main function
export default function Profile({ navigation }) {
  // Variables here
  const { userInfo, logout } = useAuth(); // Get userId
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(true); // Control showing password
  const isFocusedProfile = useIsFocused();
  const [avatar, setAvatar] = useState("");

  // Declare function here
  const fetchData = async (id) => {
    const data = await getUserInfo(id);
    setUserData(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (isFocusedProfile) {
      fetchData(userInfo.ma_nguoi_dung);
    }
  }, [isFocusedProfile]);
  // Upload avatar upload
  const handleUploadAvatar = async () => {
    // Ask for permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your media library.");
      return;
    }

    // Open the Image Library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only images
      allowsEditing: true, // Allow cropping
      aspect: [4, 3], // Crop ratio
      quality: 1, // Max quality
    });

    if (!result.canceled) {
      try {
        // Convert the URI to base64
        const base64Image = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );
        console.log(base64Image);
        // Save the base64 string to the state
        setUserData((prevData) => ({
          ...prevData,
          khach_hang_info: {
            ...prevData.khach_hang_info,
            HinhAnh: base64Image, // Save the base64-encoded string
          },
        }));
        //   // Save selected image URI
        //   setAvatar(result.assets[0].uri);
        //   // Update new avatar to database
        //   try {
        //     const response = await updateUserAvatar(
        //       userInfo.ma_nguoi_dung,
        //       result.assets[0].uri
        //     );
        //     if (response.success) {
        //       alert("Update successfully!");
        //       // navigation.navigate("Profile");
        //     } else {
        //       alert("Update failed!");
        //     }
      } catch (error) {
        console.error("Error converting image to base64:", error);
        Alert.alert("Error", "Failed to convert image to base64.");
      }
    }
  };

  // Goto change password
  const handleChangePass = () => {
    navigation.navigate("ChangePassword");
  };
  // Logout
  const handleLogOut = () => {
    logout();
    navigation.navigate("Sign-In");
  };
  // Return render here
  return (
    <>
      {isLoading ? (
        <Text>Loading ...</Text>
      ) : (
        <View style={styles.container}>
          {/* Section for Avatar */}
          <TouchableOpacity
            style={styles.avatarSection}
            onPress={() => {
              handleUploadAvatar();
            }}
          >
            <Image
              source={{
                uri: userData.khach_hang_info.HinhAnh
                  ? `data:image/jpeg;base64,${userData.khach_hang_info.HinhAnh}`
                  : "default_avatar_url",
              }}
              style={styles.imageStyle}
            ></Image>
          </TouchableOpacity>
          {/* Section for user's name */}
          <View style={styles.nameSection}>
            <Text style={styles.nameText}>
              {userData.khach_hang_info.TenKhachHang}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditProfile", {
                  userId: userInfo.ma_nguoi_dung,
                });
              }}
            >
              <Feather name="edit-3" size={25}></Feather>
            </TouchableOpacity>
          </View>
          {/* Section for personal information */}
          <ScrollView style={styles.informationSection}>
            <View>
              <Text style={styles.titleText}>Personal Information</Text>
              {/* For phone number */}
              <TextField
                title={"Phone number"}
                content={userData.khach_hang_info.SoDienThoai}
              ></TextField>
              {/* For email */}
              <TextField
                title={"Email"}
                content={userData.khach_hang_info.Email}
              ></TextField>
              {/* For district name */}
              <TextField
                title={"District name"}
                content={userData.khach_hang_diachi.quan_info.TenQuan}
              ></TextField>
              {/* For address */}
              <TextField
                title={"Address"}
                content={userData.khach_hang_diachi.DiaChi}
              ></TextField>
            </View>
            <View>
              <Text style={styles.titleText}>Account Information</Text>
              {/* For account name */}
              <TextField
                title={"Account name"}
                content={userData.tai_khoan_info.TenTaiKhoan}
              ></TextField>
              {/* For password */}
              <Text style={styles.contentText}>Password</Text>
              <View style={styles.passwordSection}>
                <TextInput
                  value={userData.tai_khoan_info.MatKhau}
                  secureTextEntry={showPassword}
                  editable={false}
                  style={styles.infoText}
                ></TextInput>
                <TouchableOpacity
                  onPress={() => {
                    setShowPassword((preValue) => !preValue);
                  }}
                >
                  {showPassword === true ? (
                    <Feather
                      name="eye"
                      style={styles.passwordEditIcon}
                    ></Feather>
                  ) : (
                    <Feather
                      name="eye-off"
                      style={styles.passwordEditIcon}
                    ></Feather>
                  )}
                </TouchableOpacity>
              </View>
              {/* For confirmation status */}
              <View style={styles.activatedSection}>
                <Text style={styles.contentText}>Corfirmation status</Text>
                {userData.tai_khoan_info.isActivated === true ? (
                  <AntDesign
                    name="check"
                    style={[styles.iconStyle, { color: "green" }]}
                  ></AntDesign>
                ) : (
                  <AntDesign
                    name="close"
                    style={[styles.iconStyle, { color: "red" }]}
                  ></AntDesign>
                )}
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#b141aa", width: 150 },
              ]}
              onPress={() => {
                handleChangePass();
              }}
            >
              <Text style={styles.buttonText}>Change password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#ff5863", width: 100 },
              ]}
              onPress={() => {
                handleLogOut();
              }}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
// Create styles
const styles = StyleSheet.create({
  // Style for container
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  // Style for Avatar Section
  avatarSection: {
    height: "25%",
    flexDirection: "row",
    justifyContent: "center",
  },
  imageStyle: {
    width: 150,
    height: "full",
    borderRadius: 20,
  },
  // Style for Name Section
  nameSection: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 15,
  },
  // Style for Personal Information Section
  informationSection: {
    height: "50%",
    marginHorizontal: 10,
  },
  titleText: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "700",
  },
  contentText: {
    fontSize: 17,
    fontWeight: "450",
    fontStyle: "italic",
    marginVertical: 10,
  },
  infoText: {
    fontSize: 15,
    marginTop: 3,
    marginBottom: 5,
    marginLeft: 10,
    fontWeight: "300",
  },
  // Style for button section
  buttonSection: {
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 10,
  },
  button: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  // Password section
  passwordSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passwordEditIcon: {
    fontSize: 25,
    marginRight: "65%",
  },
  // Activated Section
  activatedSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: "50%",
  },
  // Icon size
  iconStyle: {
    fontSize: 25,
  },
});
