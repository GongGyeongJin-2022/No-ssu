import React, { useEffect } from "react";
import { View } from "react-native";

import NaverMapView from "react-native-nmap";
import { FloatingButton } from "@components/FloatingButton";

const Main = ({ navigation }) => {
    return (
        <View>
            <NaverMapView
                style={{width: '100%', height: '100%'}}
                showsMyLocationButton={true}
            >
            </NaverMapView>
            <FloatingButton navigation={navigation} />
        </View>
    );
}

export default Main;
