import { View, Text, StyleSheet } from "react-native";

export default function ContactField({ title, content }) {
    return (
        <View style={styles.container}>
            <View style={{width: '22%'}}>
                <Text style={styles.title}>{title}</Text>
            </View>            
            <View>
                <Text style={styles.content}>{content}</Text>
            </View>            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',    
        marginVertical: 5,        
        marginHorizontal: 20
    },
    title: {
        fontSize: 19,
        fontWeight: '500',
        color: '#121d6e',
    },
    content: {
        fontSize: 17,
        marginLeft: 20
    }
})