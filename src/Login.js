import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Logo from './assets/No_ssu_logo.png';
import Kakao from './assets/chat.png';

const App = () => {
    return (
        <View style={styles.container}>
        <Image source={Logo} style={styles.Image_Logo}
        />
            <Text style={styles.Title}>
                실시간 쓰레기 위치 가이드
            </Text>
            <View>
                <TouchableOpacity style= {styles.button1}>
                <View>
                <Text style = {styles.button1_txt}>G    구글 계정으로 로그인</Text> 
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2}>
                 <Image source={Kakao}></Image>
                    <Text style={styles.button2_txt}>카카오 계정으로 로그인</Text>
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
        alignSelf : 'auto',
        width : 100,
        height : 100
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
        top : 5,
        fontSize : 16,
        color : '#000000',
        fontWeight : "bold", 
        alignSelf : 'center'
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
        alignSelf : 'center'
    },
    button3_txt : {
        color : '#ffffff',
        fontSize : 11,
        fontWeight : 'bold'
    }
})

export default App;
