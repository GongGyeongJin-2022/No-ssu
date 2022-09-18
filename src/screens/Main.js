import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

import NaverMapView from "react-native-nmap";
import { FloatingButton } from "@components/FloatingButton";
import Geolocation from '@react-native-community/geolocation';
import { Marker } from "react-native-nmap";
import {useApi, useBottomSheetModalRef, useInterval} from "@hooks/Hooks.js";
import MyLocationPin from "@components/MyLocationPin";
import MyLocationButton from "../components/MyLocationButton";

import BottomSheet from "@components/BottomSheet";
import {useRecoilState, useSetRecoilState} from "recoil";
import { screenState, Screen, userState } from "@apis/atoms";
import { getMarkersSimiple, getUser, verifyFCM } from "@apis/apiServices";
import messaging from "@react-native-firebase/messaging";

const Main = ({ navigation }) => {
    const [screen, setScreen] = useRecoilState(screenState);

    // ref
    const bottomSheetModalRef = useBottomSheetModalRef();

    const [location, setLocation] = useState({latitude: 37.5828, longitude: 127.0107});
    const [findLocation, setFindLocation] = useState(false);
    const [selectedMarkerId, setSelectedMarkerId] = useState();


    // api
    const [markersLoading, markers, getMarkersSimpleCallback] = useApi(getMarkersSimiple, true);
    const [userLoading, userResult, getUserCallback] = useApi(getUser, true);
    const [verifyFCMLoading, verifyFCMResult, verifyFCMCallback] = useApi(verifyFCM, true);

    useEffect(() => {
        getUserCallback()
            .then(async (res) => {
                if (res) {
                    console.log(res)
                    const authStatus = await messaging().requestPermission();
                    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                    if (enabled) {
                        const formdata = new FormData();
                        formdata.append("fcm_token", await messaging().getToken());
                        await verifyFCMCallback(formdata)
                            .then((res) => {
                                console.log(res)
                            })
                    }
                }
            })
    }, []);

    // 화면이 메인화면으로 바뀌면 현재 위치설정하고, 마커들 요청함
    useEffect(() => {
        if(screen === Screen.Main) {
            setGeoLocation();
            getMarkersSimpleCallback();
        }
    },[screen]);

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

    useEffect(() => {
        if(!markersLoading) {
            console.log("markers",markers);
        }
        console.log("markersLoading", markersLoading);
    },[markersLoading])

    return (
        <View>
            <BottomSheet selectedMarkerId={selectedMarkerId}/>
            <NaverMapView
                style={{width: '100%', height: '100%'}}
                showsMyLocationButton={false}
                center={{latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude)}}
                setLocationTrackingMode={3}
                useTextureView={true}
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

                {
                        !markersLoading && markers.map((marker, idx) => (
                        <Marker
                            key={idx}
                            coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
                            onClick={async () => {
                                setSelectedMarkerId(marker.id);
                                bottomSheetModalRef.current?.present();
                                setScreen(Screen.Pin);
                            }}
                        />
                    ))
                }

            </NaverMapView>

            <MyLocationButton findLocation={findLocation} setFindLocation={setFindLocation} />

            <FloatingButton navigation={navigation} />
        </View>
    );
}

export default Main;
