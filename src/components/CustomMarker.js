import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

export const CustomMarker = ({marker, zoom}) => {
    return (
        <View style={styles.container}>
            {zoom > 8 && <Text style={styles.reward}>{marker.reward}P</Text>}
            {
                marker.status === 'U' ?
                    <Image
                        source={require('@assets/img/marker_waiting.png')}
                        style={styles.marker}
                    /> :
                    <Image
                        source={require('@assets/img/marker_approved_yet.png')}
                        style={styles.marker}
                    />
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 60
    },
    reward: {
        position: "absolute",
        alignSelf: "center",
        backgroundColor: "white",
        borderRadius: 5,
        top: 0,
        fontWeight: "bold",
        fontSize: 12,
        elevation: 3,
        padding: 2
    },
    marker: {
        position: "absolute",
        width: 60,
        height: 60,
        bottom: 30
    }
})