import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";

import NaverMapView from "react-native-nmap";
import { FloatingButton } from "@components/FloatingButton";
import Icon from "react-native-vector-icons/Feather";
import Geolocation from '@react-native-community/geolocation';
import { Marker } from "react-native-nmap/index";
import { useInterval } from "@hooks/Hooks.js";
import MyLocationPin from "@components/MyLocationPin";
import MyLocationButton from "../components/MyLocationButton";

const Main = ({ navigation }) => {
    const [location, setLocation] = useState({latitude: 37.5828, longitude: 127.0107});
    const [findLocation, setFindLocation] = useState(false);

    useEffect(() => {
        setGeoLocation();
    }, []);

    useInterval(() => {
        if (findLocation) {
            setGeoLocation();
        }
    }, 1000);

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
            {
                findLocation ? (
                    <NaverMapView
                        style={{width: '100%', height: '100%'}}
                        showsMyLocationButton={false}
                        center={{latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude)}}
                        setLocationTrackingMode={3}
                    >
                        <Marker
                            coordinate={{latitude: location.latitude, longitude: location.longitude}}
                            width={18}
                            height={18}
                        >
                            <MyLocationPin />
                        </Marker>
                    </NaverMapView>
                ) : (
                    <NaverMapView
                        style={{width: '100%', height: '100%'}}
                        showsMyLocationButton={false}
                        center={{latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude)}}
                        setLocationTrackingMode={3}
                    >
                    </NaverMapView>
                )
            }

            <MyLocationButton findLocation={findLocation} setFindLocation={setFindLocation} />

            <FloatingButton navigation={navigation} />
        </View>
    );
}

export default Main;
