import React, {useEffect, useState} from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import user_interface from '@assets/img/user_interface.png'
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {googleLoginSelector, tokenSelector} from "@apis/selectors";
import {GOOGLELOGIN_POST_ERROR} from "@apis/types";
import Logo from "@assets/img/No_ssu_logo.png"
import Kakao from "@assets/img/kakao-talk.png"
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
            <Image source={Logo} style={styles.imageLogo}></Image>
            <Text style={styles.title}>
                실시간 쓰레기 위치 가이드
            </Text>
                <TouchableOpacity style= {styles.googleButton} onPress={loginGoogle}>
                <Text style={styles.googleLogo}>G</Text>
                <Text style = {styles.googleButtonText}>구글 계정으로 로그인</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.kakaoButton}>
                    <Image source={Kakao} style={styles.kakaoLogo}></Image>
                    <Text style={styles.kakaoButtonText}>카카오 계정으로 로그인</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.noLoginButton} onPress={() => {navigation.push("Main")}}>
                    <Text style={styles.noLoginButtonText}>로그인 없이 시작하기</Text>
                </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container :  {
        alignItems: "center",
        marginTop: "30%"
    },
    title : {
        fontSize : 19,
        color : '#000000',
        fontWeight : "bold"
    },
    imageLogo : {
        width : 240,
        height : 240,
    },
    kakaoLogo : {
        position: "absolute",
        left: 10,
        width : 25,
        height : 25,
    },
    googleButton : {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30%",
        width : 300,
        height : 45,
        borderRadius : 5,
        backgroundColor : '#EA4335',
        padding: 10
    },
    googleButtonText : {
        fontSize : 16,
        color : '#FFFFFF',
        fontWeight : "bold",
    },
    kakaoButton : {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
        width : 300,
        height : 45,
        borderRadius : 5,
        backgroundColor : '#FAE100',
        padding: 10
    },
    kakaoButtonText : {
        fontSize : 16,
        color : '#000000',
        fontWeight : "bold",
    },
    googleLogo: {
        position: "absolute",
        left: 15,
        width : 40,
        height : 40,
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff"
    },
    noLoginButton : {
        width : 130,
        height : 30,
        marginTop: "5%",
        color : '#FFFFFF',
    },
    noLoginButtonText : {
        color : '#9f9f9f',
        fontSize : 12,
        fontWeight : 'bold'
    }
});

export default Login;
