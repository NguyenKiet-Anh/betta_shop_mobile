import { View, Text, StyleSheet } from "react-native";
export const TextField = ({ title, content }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.contentText}>{title}</Text>
            <Text style={styles.infoText}>{content}</Text>
        </View>        
    )
};
const styles=StyleSheet.create({
    container: {
        marginVertical: 3
    },
    contentText: {
        marginVertical: 7,
        fontSize: 17,
        fontWeight: '450',
        fontStyle: 'italic',        
    },
    infoText: {
        fontSize: 15,
        marginTop: 3,
        marginBottom: 5,
        marginLeft: 10,
        fontWeight: '300'
    }
});