import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
export const SubmitButton= ({ title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.buttonSection}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonSection: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#b141aa',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white'
    }
});
