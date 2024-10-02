import { View, Text, TextInput, StyleSheet} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
export const InputField = ({ title, setValue }) => {
    return (
        <View style={styles.buttonCover}>
            { title === 'Full name' &&
                <>
                    <FontAwesome name="user-o" size={20}></FontAwesome>
                    <TextInput
                        onChangeText={setValue}
                        placeholder={title}
                        style={{width: '90%', height: 40, marginHorizontal: 5}}
                    >                            
                    </TextInput>
                </>
            }
            { title === 'Phone number' &&
                <>
                    <Feather name="phone" size={20}></Feather>
                    <TextInput
                        onChangeText={setValue}
                        placeholder={title}
                        style={{width: '90%', height: 40, marginHorizontal: 5}}
                    >                            
                    </TextInput>
                </>
            }
            { title === 'Password' &&
                <>
                    <Ionicons name="lock-closed-outline" size={22}></Ionicons>
                    <TextInput
                        onChangeText={setValue}
                        placeholder={title}
                        style={{width: '90%', height: 40, marginHorizontal: 5}}
                    >                            
                    </TextInput>
                </>
            }            
            { title === 'Password again' &&
                <>
                    <Ionicons name="lock-closed-outline" size={22}></Ionicons>
                    <TextInput
                        onChangeText={setValue}
                        placeholder={title}
                        style={{width: '90%', height: 40, marginHorizontal: 5}}
                    >                            
                    </TextInput>
                </>
            }            
        </View>        
    );
};
const styles=StyleSheet.create({
    buttonCover: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e3e3e3'
    },
});