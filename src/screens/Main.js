import React, { useEffect, useState } from "react";
import {TouchableWithoutFeedback, View, StyleSheet, Image} from "react-native";

import NaverMapView from "react-native-nmap";
import { FloatingButton } from "@components/FloatingButton";
import Geolocation from '@react-native-community/geolocation';
import { Marker } from "react-native-nmap";
import { useBottomSheetModalRef, useInterval } from "@hooks/Hooks.js";
import MyLocationPin from "@components/MyLocationPin";
import MyLocationButton from "../components/MyLocationButton";
import Icon from "react-native-vector-icons/Feather";

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {useRecoilValue} from "recoil";
import {screenState} from "@apis/atoms";
import marker_icon from "@assets/img/marker_icon.png"


const Main = ({ navigation }) => {
    const screen = useRecoilValue(screenState)
    const [location, setLocation] = useState({latitude: 37.5828, longitude: 127.0107});
    const [findLocation, setFindLocation] = useState(false);

    // ref
    const bottomSheetModalRef = useBottomSheetModalRef();

    // variables
    const snapPoints = useMemo(() => ['3%', '25%', '50%', '100%'], []);

    const P0 = {latitude: 37.564362, longitude: 126.977011};

    useEffect(() => {
        setGeoLocation();
    }, []);

    useEffect(() => {
        console.log("bottomSheetModalRef", bottomSheetModalRef)
        if(bottomSheetModalRef!==undefined && bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    },[bottomSheetModalRef])

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
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
            >
                <View>
                    {
                        screen === "Main" ? (
                            <>
                                <Text>
                                    Main
                                </Text>
                            </>
                        ) : screen === "Upload" ? (
                            <>
                                <Text>
                                    Upload
                                </Text>
                            </>
                        ) : screen === "Mypage" ? (
                            <>
                                <Text>
                                    Mypage
                                </Text>
                            </>
                        ) : null
                    }
                </View>
            </BottomSheetModal>

            <NaverMapView
                style={{width: '100%', height: '100%'}}
                showsMyLocationButton={false}
                center={{latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude)}}
                setLocationTrackingMode={3}
            >
                {
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
                <Marker coordinate={P0} pinColor="green" onClick={() => console.warn('onClick! p0')} width={30} height={30} image={marker_icon}/>
            </NaverMapView>



            <MyLocationButton findLocation={findLocation} setFindLocation={setFindLocation} />

            <FloatingButton navigation={navigation} />
        </View>
    );
}

export default Main;
