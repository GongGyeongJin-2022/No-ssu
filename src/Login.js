import React, {useEffect, useState} from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import user_interface from '@assets/img/user_interface.png'
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {useRecoilState} from "recoil";
import {tokenState} from "@apis/atoms";
import {usePostGoogleLoginFinishCallback} from "@apis/apiCallbackes";

GoogleSignin.configure({
    scopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'openid'
    ], // what API you want to access on behalf of the user, default is email and profile
    webClientId: "650183824974-gqopp2a9bfcs2q94upe41vlas7ku2g7e.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const Login = ({navigation}) => {
    const [user, setUser] = useState();
    const [token, setToken] = useRecoilState(tokenState);
    const postGoogleLoginFinishCallback = usePostGoogleLoginFinishCallback();

    useEffect(() => {
        console.log("token", token);
    },[token])

    useEffect(() => {
        if(user) {
            console.log("user", user);
            postGoogleLoginFinishCallback({
                "code": user.serverAuthCode,
                "id_token": user.idToken
            }).then(r => {navigation.navigate("Main")})
        }

    },[JSON.stringify(user)]);

    const loginGoogle = async () => {
        try {
            const result = await GoogleSignin.hasPlayServices();
            console.log("result",result);
            const userInfo = await GoogleSignin.signIn();
            setUser(userInfo);
            console.log("here");
        } catch (error) {
            console.log("error", JSON.stringify(error));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={user_interface}/>
            <Text style={styles.Title}>
                Login
            </Text>
            <Text style={styles.txt}>
                Start With Your Google Or Kakao Account
            </Text>
            <View>
                <TouchableOpacity style= {styles.button1} onPress={loginGoogle}>
                    <Text style = {styles.button1_txt}>Login in Google</Text>
                </TouchableOpacity>
                <Text>

                </Text>
                <TouchableOpacity style={styles.button2}>
                    <Text style={styles.button2_txt}>Login in Kakao</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button3}>
                    <Text style={styles.button3_txt}>로그인 없이 이용하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container :  {
        alignSelf : 'center',
    },
    button1 : {
        width : 264,
        height : 50,
        top : 230,
        borderRadius : 30,
        backgroundColor : '#93CE92',
        alignSelf : 'center',
        borderColor : '#000000',
        borderWidth : 4
    },
    button1_txt : {
        alignSelf : 'center',
        fontSize : 17,
        color : '#000000',
        fontWeight : "bold"
    },
    button2 : {
        width : 264,
        height : 50,
        top : 250,
        Color : '#FFFFFF',
        borderRadius : 30,
        backgroundColor : '#93CE92',
        alignSelf : 'center',
        borderColor : '#000000',
        borderWidth : 4
    },
    button2_txt : {
        alignSelf : 'center',
        fontSize : 17,
        color : '#000000',
        fontWeight : "bold"
    },
    Title : {
        top : 140,
        alignSelf : 'center',
        fontSize : 30,
        color : '#000000',
        fontWeight : "bold"
    },
    txt : {
        alignSelf : 'center',
        fontSize : 15,
        top : 153
    },
    image : {
        top : 130,
        alignSelf : 'center',
        width : 100,
        height :100
    },
    button3 : {
        width : 150,
        height : 30,
        top : 300,
        backgroundColor : '#6EBFB0',
        Color : '#000000',
        borderRadius : 30,
        alignSelf : 'center',
        borderWidth : 2,
        borderColor : '#000000'
    },
    button3_txt : {
        alignSelf : 'center',
        color : '#ffffff',
        fontSize : 12,
        fontWeight : 'bold'
    }
})

export default Login;
