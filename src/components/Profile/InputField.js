import { View, Text, TextInput, StyleSheet } from "react-native";
export const InputField = ({ title, value, setValue }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerStyle}>{title}</Text>
            <View style={styles.inputFieldStyle}>
                <TextInput
                    placeholder={`${title} ...`}
                    onChangeText={setValue}
                    value={value}
                    style={styles.contentStyle}
                ></TextInput>
            </View>
        </View>
    )
};
const styles=StyleSheet.create({
    container: {
        marginVertical: 5
    },
    headerStyle: {
        fontSize: 17,
        fontWeight: '450',
        fontStyle: 'italic',
        marginVertical: 10
    },
    inputFieldStyle: {
        width: '100%',
        height: 40,        
        borderWidth: 1,
        borderRadius: 5
    },
    contentStyle: {
        fontSize: 15,
        marginTop: 3,
        marginBottom: 5,
        marginLeft: 10,
        fontWeight: '300',    
    },
})