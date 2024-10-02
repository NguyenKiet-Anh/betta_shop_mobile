// Import react native elements
import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import custom components
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
import { TouchableOpacity } from "react-native";

export default function SignUp({ navigation }) {
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const handleSignUp = () => {

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/background/sign-up-background.jpg')}
                    style={styles.bgImage}
                ></Image>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.body}>
                    <Text style={[styles.titleText, styles.bodyMarginVertical]}>Sign Up</Text>
                    <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
                        <InputField title="Full name" setValue={setUsername}></InputField>
                    </View>
                    <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
                        <InputField title="Phone number" setValue={setPhoneNumber}></InputField>
                    </View>                
                    <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
                        <InputField title="Password" setValue={setPassword}></InputField>
                    </View>                
                    <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
                        <InputField title="Password again" setValue={setPasswordAgain}></InputField>
                    </View>                
                    <View style={styles.bodyMarginVertical}>
                        <SubmitButton title="SIGN UP" onPress={() => {handleSignUp();}}></SubmitButton>
                    </View>           
                </View>
                <View style={styles.footer}>
                    <View style={styles.goToSignIn}>
                        <Text style={styles.footerLinkText}>Already has an account? </Text>
                        <TouchableOpacity onPress={() => {navigation.navigate("Sign-In")}}>
                            <Text style={styles.linkToSignInText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>                    
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: '35%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    }, 

    contentContainer: {
        marginHorizontal: 10
    },
    body: {
        paddingVertical: 5
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    bodyMarginVertical: {
        marginVertical: 10,
    },
    buttonHeight: {
        height: 50
    },

    footer: {
        height: '10%',
        marginTop: 10,
    },
    goToSignIn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    footerLinkText: {
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    linkToSignInText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#b141aa'
    },

});
