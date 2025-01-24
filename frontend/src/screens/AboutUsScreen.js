import { View, Text, Image, StyleSheet } from "react-native";
import ContactField from "../components/AboutUs/ContactField";
export default function AboutUs() {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Image
          source={require("../assets/images/icon/Logo.png")}
          style={styles.imageStyle}
        ></Image>
      </View>
      <View style={styles.bContainer}>
        <View style={styles.scontainer}>
          {/* Name of Company */}
          <View style={styles.nameSection}>
            <Text style={styles.titleText}>Betta Shop</Text>
          </View>
          {/* Description */}
          <View>
            <Text style={styles.description}>
              If you need to buy the most beautiful betta fish around there, our
              business will provide you the best fish ever...
            </Text>
          </View>
          {/* Contact information */}
          <View style={styles.contactSection}>
            <ContactField
              title={"Email"}
              content={"bettashop@gmail.com"}
            ></ContactField>
            <ContactField title={"Phone"} content={"0857434229"}></ContactField>
            <ContactField
              title={"Social"}
              content={"facebook/Cristiano"}
            ></ContactField>
            <ContactField
              title={"Address"}
              content={"UIT Tower, Thu Duc, Ho Chi Minh"}
            ></ContactField>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  bContainer: {    
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  scontainer: {
    marginTop: 15,
    paddingBottom: 20
  },
  // Style for Logo Section
  logoSection: {
    width: "full",
    height: "50%",
    marginBottom: 28
  },
  imageStyle: {
    marginTop: 10,
    width: "full",
    height: 425,
  },
  // Style for Name
  nameSection: {
    marginVertical: 7,
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    fontStyle: "italic",
    color: "#242159",
  },
  // Style for Description
  description: {
    fontSize: 17,
    fontStyle: "italic",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  // Style for Contact Section
});
