import React, {Component, useRef, useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const FloatingButton = () => {
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [open, setOpen] = useState(0);

    const userStyle = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                }),
            },
        ],
    };

    const pinStyle = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -30],
                }),
            },
        ],
    };

    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                }),
            },
        ],
    };

    return (
        <View style={styles.container}>
            {open ? (
                <>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.button, styles.item, pinStyle]}>
                            <Icon name="map-pin" size={20} color="#93CE92" />
                        </Animated.View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.button, styles.item, userStyle]}>
                            <Icon name="user" size={20} color="#6EBFB0" />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </>
            ) : null}

            <TouchableWithoutFeedback
                onPress={() => {
                    const toValue = open ? 0 : 1;
                    Animated.sequence([
                        Animated.spring(animation, {
                            toValue,
                            friction: 5,
                            tension: 50,
                            useNativeDriver: true,
                        }),
                    ]).start();
                    setOpen(!open);
                }}>
                <Animated.View style={[styles.button, styles.menu, rotation]}>
                    <Icon name="plus" size={24} color="#fff" />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        right: 30,
        bottom: 30,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {height: 10},
    },
    menu: {
        backgroundColor: '#93CE92',
    },
    item: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: '#fff',
    },
});
