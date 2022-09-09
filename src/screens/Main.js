import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

import NaverMapView from "react-native-nmap";
import { FloatingButton } from "@components/FloatingButton";
import Geolocation from '@react-native-community/geolocation';
import { Marker } from "react-native-nmap";
import { useBottomSheetModalRef, useInterval } from "@hooks/Hooks.js";
import MyLocationPin from "@components/MyLocationPin";
import MyLocationButton from "../components/MyLocationButton";

import BottomSheet from "@components/BottomSheet";
import { useSetRecoilState } from "recoil";
import { screenState } from "@apis/atoms";
import { vh } from "react-native-css-vh-vw";

const Main = ({ navigation }) => {
    const setScreen = useSetRecoilState(screenState)

    // ref
    const bottomSheetModalRef = useBottomSheetModalRef();

    const [location, setLocation] = useState({latitude: 37.5828, longitude: 127.0107});
    const [findLocation, setFindLocation] = useState(false);

    const P0 = {latitude: 37.4214938, longitude: -122.083922};

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
            <BottomSheet />
            <NaverMapView
                style={{width: '100%', height: '100%'}}
                showsMyLocationButton={false}
                center={{latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude)}}
                setLocationTrackingMode={3}
                logoMargin={{top: vh(200), left: 0, bottom: 0, right: 0}}
                scaleBar={false}
            >
                {
                    // 현 위치를 표시해주는 마커
                    findLocation ? (
                        <Marker
                            coordinate={{latitude: location.latitude, longitude: location.longitude}}
                            width={18}
                            height={18}
                        >
                            <MyLocationPin />
                        </Marker>
                    ) : null
                }
                <Marker
                    coordinate={P0}
                    width={60}
                    height={60}
                    onClick={async () => {
                        bottomSheetModalRef.current?.present();
                        setScreen("Pin");
                    }}
                >
                    <Image
                        source={require('@assets/img/marker_green.png')}
                        style={{width: 60, height: 60}}
                    />
                </Marker>
            </NaverMapView>

            <MyLocationButton findLocation={findLocation} setFindLocation={setFindLocation} />

            <FloatingButton navigation={navigation} />
        </View>
    );
}

export default Main;
