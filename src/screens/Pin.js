import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { vw, vh } from 'react-native-css-vh-vw';

const pinData = {
    "img": "./test_image.jpeg",
    "tags": [
        "플라스틱"
    ],
    "size": "중형",
    "description": "인천대입구역 2번출구 앞"
}

const Pin = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={require('./test_image.jpeg')} style={styles.image} />

                <View style={styles.tagContainer}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}># {pinData.tags[0]}</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}># {pinData.size}</Text>
                    </View>
                </View>

                <Text style={styles.descriptionText}>{pinData.description}</Text>
            </View>

            <View style={styles.clearButton}>
                <Text style={styles.clearButtonText}>처리했습니다!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    },
    content: {
        marginLeft: '5%',
        marginRight: '5%'
    },
    image: {
        width: '100%',
        height: vh(15),
        borderRadius: 10
    },
    tagContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 15
    },
    tag: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: 30,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#C8C8C8',
        borderRadius: 100
    },
    tagText: {
        fontSize: 12,
        color: '#252525'
    },
    descriptionText: {
        color: '#252525',
        marginTop: 20
    },
    clearButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: vh(5),
        backgroundColor: '#93CE92',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    clearButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default Pin;
