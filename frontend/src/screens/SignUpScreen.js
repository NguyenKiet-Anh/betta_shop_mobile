// Import react native elements
import { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import custom components
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
import { useAuth } from "../context/authContext";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  // For OTP
  const [otp, setOtp] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { ipAddress } = useAuth();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSignUp = async (ipAddress, password, passwordAgain) => {
    if (passwordAgain !== password) {
      alert("Your confirm password doesnt match with your password!");
    } else {
      try {
        return await fetch(`http://${ipAddress}:8000/signup/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            phone: phone,
            address: address,
            email: email,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network working failed");
            }
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              alert(
                "OTP has been sent to your email! Please check your email!"
              );
              toggleModal();
            } else {
              alert(data.message);
            }
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      } catch (error) {
        console.error("Error while signing up: ", error);
      }
    }
  };

  const handleSubmitOtp = async () => {
    try {
      return await fetch(`http://${ipAddress}:8000/activateAccount/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network working failed");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            alert("Your account has been activated!");
            navigation.navigate("Sign-In");
          } else {
            alert("Your OTP is incorrect");
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    } catch (error) {
      console.error("Error while verifying otp: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/background/sign-up-background.jpg")}
          style={styles.bgImage}
        ></Image>
      </View>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.body}>
          <Text style={[styles.titleText, styles.bodyMarginVertical]}>
            Sign Up
          </Text>
          <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
            <InputField
              title="Username"
              setValue={(e) => setUsername(e)}
            ></InputField>
          </View>
          <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
            <InputField
              title="Password"
              setValue={(e) => setPassword(e)}
            ></InputField>
          </View>
          <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
            <InputField
              title="Password again"
              setValue={(e) => setPasswordAgain(e)}
            ></InputField>
          </View>
          <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
            <InputField
              title="Phone number"
              setValue={(e) => setPhone(e)}
            ></InputField>
          </View>
          <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
            <InputField
              title="Email"
              setValue={(e) => setEmail(e)}
            ></InputField>
          </View>
          <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
            <InputField
              title="Address"
              setValue={(e) => setAddress(e)}
            ></InputField>
          </View>
          <View style={styles.bodyMarginVertical}>
            <SubmitButton
              title="SIGN UP"
              onPress={() => {
                handleSignUp(ipAddress, password, passwordAgain);
              }}
            ></SubmitButton>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.goToSignIn}>
            <Text style={styles.footerLinkText}>Already has an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Sign-In");
              }}
            >
              <Text style={styles.linkToSignInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTextHeader}>OTP Verification</Text>
            <TextInput
              style={styles.modalInputStyle}
              value={otp}
              placeholder="Enter your OTP ..."
              onChangeText={(e) => setOtp(e)}
            ></TextInput>
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={handleSubmitOtp}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "35%",
    flexDirection: "row",
    alignItems: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },

  contentContainer: {
    marginHorizontal: 10,
  },
  body: {
    paddingVertical: 5,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bodyMarginVertical: {
    marginVertical: 10,
  },
  buttonHeight: {
    height: 45,
  },

  footer: {
    height: "10%",
  },
  goToSignIn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerLinkText: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  linkToSignInText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#b141aa",
  },
  // Modal Style
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTextHeader: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 17,
  },
  modalActions: {
    flexDirection: "row",
    marginTop: 15,
  },
  modalButton: {
    backgroundColor: "#b141aa",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalInputStyle: {
    width: "100%",
    height: 50,
    color: "black",
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 7,
  },
});
