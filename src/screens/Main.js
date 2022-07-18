import React, { useEffect, useState } from "react";
import { TouchableHighlight, View, StyleSheet } from "react-native";

import NaverMapView from "react-native-nmap";
import { FloatingButton } from "@components/FloatingButton";
import Icon from "react-native-vector-icons/Feather";
import Geolocation from '@react-native-community/geolocation';

const Main = ({ navigation }) => {
    const [location, setLocation] = useState({latitude: 0, longitude: 0});

    useEffect(() => {
        setGeoLocation();
    }, []);

    const setGeoLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.log(error)
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
        );
    }

    return (
        <View>
            <NaverMapView
                style={{width: '100%', height: '100%'}}
                showsMyLocationButton={false}
                center={{latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude), zoom: 16}}
            >
            </NaverMapView>

            <TouchableHighlight onPress={() => setGeoLocation()} style={styles.myLocationButton}>
                <Icon name="map-pin" size={20} color={'black'} />
            </TouchableHighlight>

            <FloatingButton navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    myLocationButton: {
        flex: 1,
        position: 'absolute',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        bottom: 50,
        left: 15,
        zIndex: 1
    }
});

export default Main;
