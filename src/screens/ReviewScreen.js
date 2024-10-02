import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Review({ route }) {
    const { itemId } = route.params;
    console.log(itemId);
    return (
        <View>
            <Text>This is review screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
});
