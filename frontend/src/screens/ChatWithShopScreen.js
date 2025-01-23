import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function ChatWithShop() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenText}>Comming soon!</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    screenText: {
        marginTop: 350,
        fontSize: 22,
        color: "black",
        textAlign: 'center',
    }
});