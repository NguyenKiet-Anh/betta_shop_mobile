import { View, Text, TextInput, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

export const InputField = ({ title, setValue }) => {
  return (
    <View style={styles.buttonCover}>
      {title === "Phone number" && (
        <>
          <MaterialIcons name="call" size={22}></MaterialIcons>
          <TextInput
            onChangeText={setValue}
            placeholder={title}
            style={{ width: "90%", height: 40, marginHorizontal: 5 }}
          ></TextInput>
        </>
      )}
      {title === "Address" && (
        <>
          <Entypo name="address" size={25}></Entypo>
          <TextInput
            onChangeText={setValue}
            placeholder={title}
            style={{ width: "90%", height: 40, marginHorizontal: 5 }}
          ></TextInput>
        </>
      )}
      {title === "Email" && (
        <>
          <MaterialIcons name="alternate-email" size={25}></MaterialIcons>
          <TextInput
            onChangeText={setValue}
            placeholder={title}
            style={{ width: "90%", height: 40, marginHorizontal: 5 }}
          ></TextInput>
        </>
      )}
      {title === "Username" && (
        <>
          <FontAwesome name="user-o" size={20}></FontAwesome>
          <TextInput
            onChangeText={setValue}
            placeholder={title}
            style={{ width: "90%", height: 40, marginHorizontal: 5 }}
          ></TextInput>
        </>
      )}
      {title === "Password" && (
        <>
          <Ionicons name="lock-closed-outline" size={22}></Ionicons>
          <TextInput
            onChangeText={setValue}
            placeholder={title}
            secureTextEntry={true}
            style={{ width: "90%", height: 40, marginHorizontal: 5 }}
          ></TextInput>
        </>
      )}
      {title === "Password again" && (
        <>
          <Ionicons name="lock-closed-outline" size={22}></Ionicons>
          <TextInput
            onChangeText={setValue}
            placeholder={title}
            secureTextEntry={true}
            style={{ width: "90%", height: 40, marginHorizontal: 5 }}
          ></TextInput>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  buttonCover: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
});
