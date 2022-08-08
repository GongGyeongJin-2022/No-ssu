import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";

import NaverMapView, {Circle, Path, Polyline, Polygon} from "react-native-nmap";
import { Marker } from "react-native-nmap";
import { FloatingButton } from "../components/FloatingButton";
import Icon from "react-native-vector-icons/Feather";
import Geolocation from '@react-native-community/geolocation';
import { useInterval } from "../hooks/Hooks";
import MyLocationPin from "../components/MyLocationPin";
import MyLocationButton from "../components/MyLocationButton";

const Main = ({ navigation }) => {
    const [location, setLocation] = useState({latitude: 37.5828, longitude: 127.0107});
    const [findLocation, setFindLocation] = useState(false);

    const P0 = {latitude: 37.4246382, longitude: 126.7484113};
    const P1 = {latitude: 37.4246383, longitude: 126.7484113};
    const P2 = {latitude: 37.4246385, longitude: 126.7484115};

    const Marker = () => {
        <div>
            <image src="../assets/marker_icon.png"></image>
        </div>
    }

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
                        <Marker coordinate={P0} image={require("../assets/marker_icon.png")} width={20} height={20}>

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
