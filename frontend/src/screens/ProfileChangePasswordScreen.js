import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
// Import components
import { SubmitButton } from "../components/SubmitButton";
import { InputField } from "../components/Profile/InputField";
// Import Hook
import { useState, useEffect } from "react";
// Import context
import { useAuth } from "../context/authContext";
// Import api routes
import {
  changePassword,
  getUserInfo,
} from "../routes/ProfileRoutes/ProfileRoutes";
// Main function
export default function ChangePassword({ route, navigation }) {
  // Variables here
  const { userInfo, ipAddress } = useAuth();
  const [passwordData, setPasswordData] = useState(""); // Store password fetched
  const [currentPassword, setCurrentPassoword] = useState(""); // Store current password
  const [newPassword, setNewPassword] = useState(""); // Store new password
  const [confirmPassword, setConfirmPassword] = useState(""); // Store confirm password
  const [isLoading, setIsLoading] = useState(true); // For controlling render action
  // Functions here
  useEffect(() => {
    const fetchPassword = async (id) => {
      const password = await getUserInfo(ipAddress, id);
      setPasswordData(password.tai_khoan_info.MatKhau);
      setIsLoading(false);
    };
    fetchPassword(userInfo.ma_nguoi_dung);
  }, []);
  const handleChangePassword = async () => {
    if (currentPassword !== passwordData) {
      alert("Password entered is incorrect!");
    } else {
      if (newPassword.length < 6) {
        alert("New password must be at least 6 characters!");
      } else {
        if (confirmPassword !== newPassword) {
          alert("Password's confirmation wrong!");
        } else {
          const response = await changePassword(
            ipAddress,
            userInfo.ma_nguoi_dung,
            newPassword
          );
          if (response.success) {
            navigation.navigate("Profile");
            alert("Change password successfully!");
          } else {
            alert("Change password failed!");
          }
        }
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b141aa" />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          {/* For current password */}
          <InputField
            title={"Current Password"}
            value={currentPassword}
            setValue={(e) => setCurrentPassoword(e)}
          ></InputField>
          {/* For new password */}
          <InputField
            title={"New Password"}
            value={newPassword}
            setValue={(e) => setNewPassword(e)}
          ></InputField>
          {/* For new password confirmation */}
          <InputField
            title={"Password Confirmation"}
            value={confirmPassword}
            setValue={(e) => setConfirmPassword(e)}
          ></InputField>
          {/* Submit button */}
          <View style={styles.submitSection}>
            <SubmitButton
              title={"Submit Change"}
              onPress={() => {
                handleChangePassword();
              }}
            ></SubmitButton>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  submitSection: {
    marginTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
