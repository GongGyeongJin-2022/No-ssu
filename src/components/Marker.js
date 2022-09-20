import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

// uncleand marker
export const UMarker = ({marker, zoom}) => {
    return (
        <View style={styles.container}>
            {zoom > 8 && <Text style={styles.reward}>{marker.reward}P</Text>}
            <Image
                source={require('@assets/img/marker_green.png')}
                style={styles.marker}
            />
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