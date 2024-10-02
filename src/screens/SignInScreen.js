// import components of react native
import { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
// import custom components
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
// import icon

export default function SignIn({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        navigation.navigate("HomeTabs");
        // if (phoneNumber !== '' && password !== '') {
        //     // Check username

        //     // Check password

        //     if (true) {
        //         navigation.navigate("Home");
        //     }
        // }
        // else {
        //     if (phoneNumber === '') {
        //         Alert.alert(
        //             'Đăng nhập thất bại',
        //             'Tên người dùng rỗng'
        //         )
        //     }
        //     else {
        //         Alert.alert(
        //             'Đăng nhập thất bại',
        //             'Mật khẩu rỗng'
        //         )
        //     };
        // };
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/background/login-background.webp')}
                    style={styles.bgImage}
                >
                </Image>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.body}>
                    <Text style={[styles.titleText, styles.bodyMarginVertical]}>Sign In</Text>
                    <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
                        <InputField title="Phone number" setValue={setPhoneNumber}></InputField>
                    </View>
                    <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
                        <InputField title="Password" setValue={setPassword}></InputField>
                    </View>                
                    <View style={styles.bodyMarginVertical}>
                        <SubmitButton title="SIGN IN" onPress={() => {handleSignIn();}}></SubmitButton>
                    </View>                
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Or, sign in with ...</Text>
                    <View style={styles.footerButton}>

                        <TouchableOpacity style={styles.linkButton}>
                            <Image
                                source={require('../assets/images/icon/ggIcon.png')}
                            ></Image>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.linkButton}>
                            <Image
                                source={require('../assets/images/icon/fbIcon.png')}
                            ></Image>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.linkButton}>
                            <Image
                                source={require('../assets/images/icon/zaloIcon.png')}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.goToSignUp}>
                        <Text style={styles.footerLinkText}>You are new to the app? </Text>
                        <TouchableOpacity onPress={() => {navigation.navigate("Sign-Up")}}>
                            <Text style={styles.linkToSignUpText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: '35%',
        marginTop: 10
    },
    footerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 35,
        marginHorizontal: 20
    },
    linkButton: {
        width: '20%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 10
    },
    footerText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '200',
        fontStyle: 'italic'
    },
    goToSignUp: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },    
    footerLinkText: {
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    linkToSignUpText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#b141aa'
    }
});