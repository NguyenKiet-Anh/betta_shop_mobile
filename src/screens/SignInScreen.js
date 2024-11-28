// import components of react native
import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import custom components
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
// import useAuth
import { useAuth } from "../context/authContext";
export default function SignIn({ navigation }) {
    // const ipAddress = '192.168.232.102';
    const ipAddress = '192.168.1.21';
    const { login } = useAuth();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async() => {
        try {
            const response = await fetch(`http://${ipAddress}:8000/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userName,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    alert('Sign In successfully!');
                    login({
                        ma_nguoi_dung: data.ma_tai_khoan,
                        isAdmin: data.isAdmin,
                    });
                    navigation.navigate("HomeTabs");
                } else if (data.message === 'Your account hasnt been verified yet!') {
                    alert('Sign in failed! Your account hasnt been verified yet! Check your email to verfiry your account!');
                } else {
                    alert('Sign In failed!');
                }
            } else {
                alert('Sign Ii failed!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                        <InputField title="Username" setValue={(e) => setUserName(e)}></InputField>
                    </View>
                    <View style={[styles.bodyMarginVertical, styles.buttonHeight]}>
                        <InputField title="Password" setValue={(e) => setPassword(e)}></InputField>
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