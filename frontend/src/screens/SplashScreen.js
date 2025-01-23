import { 
    View,
    Text,
    StyleSheet
 } from "react-native";

import FastImage from "react-native-fast-image";

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <FastImage
                style={styles.splashImage}
                source={require('../assets/animations/splashGif.gif')}
                resizeMode={FastImage.resizeMode.contain}
            ></FastImage>
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashImage: {
    width: '100%',
    height: '50%',    
  }
});