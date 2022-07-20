import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import user_interface from '@assets/img/user_interface.png'

const Login = () => {
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
                <TouchableOpacity style= {styles.button1}>
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
