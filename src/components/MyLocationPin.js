import React from "react";
import { View, StyleSheet } from "react-native";

const MyLocationPin = () => {
    return (
        <View style={styles.myLocationPinOutline}>
            <View style={styles.myLocationPinMiddle}>
                <View style={styles.myLocationPinInline} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    myLocationPinOutline: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: 18,
        height: 18,
        backgroundColor: 'rgba(84,193,255,0.35)'
    },
    myLocationPinMiddle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: 12,
        height: 12,
        backgroundColor: '#ffffff'
    },
    myLocationPinInline: {
        borderRadius: 20,
        width: 8,
        height: 8,
        backgroundColor: '#0072f5'
    }
});
export default MyLocationPin;
