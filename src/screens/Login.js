import React, {useEffect, useState} from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {googleLoginSelector, tokenSelector} from "@apis/selectors";
import {GOOGLELOGIN_POST_ERROR} from "@apis/types";
import Logo from "@assets/img/login_icon.png"
import {useRecoilState} from "recoil";
import {tokenState} from "@apis/atoms";
import {usePostGoogleLoginFinishCallback} from "@apis/apiCallbackes";
import { vh, vw } from "react-native-css-vh-vw";

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
            })
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
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: vh(20), marginTop: vh(35)}}>
                <Image source={Logo} resizeMode={"contain"} style={styles.imageLogo} />
                <View>
                    <Text style={styles.title}>노쓰</Text>
                    <Text style={styles.titleDescription}>
                        실시간 쓰레기 위치 가이드
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.googleButton} onPress={loginGoogle}>
                <Text style={styles.googleLogo}>G</Text>
                <Text style={styles.googleButtonText}>구글 계정으로 로그인</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container :  {
        alignItems: "center",
        height: '100%',
        width: '100%',
        backgroundColor: "#D7F4B8",
    },
    title: {
        fontSize: 0.125 * vw(100),
        color: '#62A543',
        fontWeight: 'bold',
    },
    titleDescription : {
        fontSize : 0.04 * vw(100),
        color : '#62A543',
        fontWeight : "bold"
    },
    imageLogo : {
        width : vw(25),
        height : vw(25),
        marginRight: 10
    },
    googleButton : {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width : 300,
        height : 45,
        borderRadius : 5,
        backgroundColor : '#EA4335',
    },
    googleButtonText : {
        fontSize : 16,
        color : '#FFFFFF',
        fontWeight : "bold",
    },
    googleLogo: {
        width : 40,
        height : 40,
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff"
    },
});

export default Login;
