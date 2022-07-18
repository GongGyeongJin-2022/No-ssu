import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";

import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Feather';

const App = () => {
    const P0 = {latitude: 37.564362, longitude: 126.977011};
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P2 = {latitude: 37.565383, longitude: 126.976292};

    const [location, setLocation] = useState({latitude: 0, longitude: 0});

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
                onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
            >
                <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/>
                <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
                <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>
                <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
                <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
                <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
                <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/>
            </NaverMapView>

            <TouchableHighlight onPress={() => setGeoLocation()} style={styles.myLocationButton}>
                <Icon name="map-pin" size={25} color={'black'} />
            </TouchableHighlight>
        </View>
    )
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


export default App;
