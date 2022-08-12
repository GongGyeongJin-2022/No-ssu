import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {googleLoginSelector, tokenSelector} from "@apis/selectors";
import {GOOGLELOGIN_POST_ERROR} from "@apis/types";
import Logo from "@assets/No_ssu_logo.png"
import Kakao from "@assets/kakao-talk.png"

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
    const [body, setBody] = useState({});
    const setToken = useSetRecoilState(tokenSelector);
    const googleLoginResponse = useRecoilValue(googleLoginSelector(body));

    useEffect(() => {
        if(user) {
            console.log("user", user);
            setBody({
                "code": user.serverAuthCode,
                "id_token": user.idToken
            });

            navigation.navigate("Main");
        }

    },[JSON.stringify(user)]);

    useEffect(() => {
        console.log("googleLoginResponse : ", googleLoginResponse);
        if(googleLoginResponse === GOOGLELOGIN_POST_ERROR) {
            console.log("login fail!");
        } else {
            setToken({accessToken: googleLoginResponse.access_token, refreshToken: googleLoginResponse.refresh_token});
        }
    },[googleLoginResponse])

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
        <Image source={Logo} style={styles.Image_Logo}></Image>
            <Text style={styles.Title}>
                실시간 쓰레기 위치 가이드
            </Text>
            <View>
                <TouchableOpacity style= {styles.button1}>
                <Text style = {styles.button1_txt}>G       구글 계정으로 로그인</Text> 
                </TouchableOpacity>

                <TouchableOpacity style={styles.button2}>
                            <Text style={styles.button2_txt}>카카오 계정으로 로그인</Text>
                            <Image source={Kakao} style={styles.Image_kakao}></Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button3}>
                    <Text style>로그인 없이 시작하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container :  {
        alignSelf : 'center',
        top : 150
    },

    Image_Logo : {
        top : 20,
        width : 200,
        height : 200,
        alignSelf : 'center'
    },

    Image_kakao : {
        left : 55,
        width : 25,
        height : 25,
        top : -12
    },

    button1 : {
        width : 300,
        height : 45,
        top : 120,
        borderRadius : 5,
        backgroundColor : '#EA4335',
        alignSelf : 'center'
    },
    button1_txt : {
        top : 9,
        alignSelf : 'center',
        fontSize : 16,
        color : '#FFFFFF',
        fontWeight : "bold"
    },
    button2 : {
        width : 300,
        height : 45,
        top : 130,
        borderRadius : 5,
        backgroundColor : '#FAE100',
        alignSelf : 'center'
    },
    button2_txt : {
        top : 9,
        fontSize : 16,
        color : '#000000',
        fontWeight : "bold",
        left : 100
    },
    Title : {
        top : 45,
        alignSelf : 'center',
        fontSize : 19,
        color : '#000000',
        fontWeight : "bold"
    },
    button3 : {
        alignSelf : 'center',
        width : 130,
        height : 30,
        top : 150,
        Color : '#FFFFFF',
    },
    button3_txt : {
        color : '#ffffff',
        fontSize : 11,
        fontWeight : 'bold'
    }
});

export default Login;
