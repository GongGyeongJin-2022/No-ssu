import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { vh, vw } from "react-native-css-vh-vw";
import NaverMapView, { Marker } from "react-native-nmap";
import { ScrollView } from "react-native-gesture-handler";
import { useApi } from "@hooks/Hooks";
import { getMarkersSimiple } from "@apis/apiServices";

const LogItem = () => {
    return (
        <View style={styles.logItemContainer}>
            <View style={styles.logItem}>
                <View style={styles.logItemMap}>
                    <NaverMapView
                        style={{width: '100%', height: '100%'}}
                        showsMyLocationButton={false}
                        scaleBar={false}
                        zoomControl={false}
                        setLocationTrackingMode={3}
                        // remove naver logo
                        logoMargin={{top: vh(200), left: 0, bottom: 0, right: 0}}
                    >
                    </NaverMapView>
                </View>
                <View style={styles.logItemInfo}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>2022.07.25 12시 13분</Text>
                    <View style={styles.logItemPostedUser}>
                        <Text style={{marginRight: 10, color: 'black'}}>의뢰인</Text>
                        <Text>상상부기</Text>
                    </View>
                    <View style={styles.logItemCleanUser}>
                        <Text style={{marginRight: 10, color: 'black'}}>처리인</Text>
                        <Text>김한성</Text>
                    </View>
                </View>
                <View style={styles.pointContainer}>
                    <Text style={{fontSize: 12, color: '#93CE92'}}>+ 1000</Text>
                </View>
            </View>
        </View>
    );
}

const MyPage = () => {
    const [markersLoading, markers, getMarkersSimpleCallback] = useApi(getMarkersSimiple, true);
    const [activityMapCenter, setActivityMapCenter] = useState({latitude: 37.5666102, longitude: 126.9783881, zoom: 10});

    useEffect(() => {
        getMarkersSimpleCallback()
            .then((res) => {
                function rad2degr(rad) { return rad * 180 / Math.PI; }
                function degr2rad(degr) { return degr * Math.PI / 180; }

                let sumX = 0;
                let sumY = 0;
                let sumZ = 0;

                res.map((marker) => {
                    let lat = degr2rad(marker.latitude);
                    let lng = degr2rad(marker.longitude);
                    sumX += Math.cos(lat) * Math.cos(lng);
                    sumY += Math.cos(lat) * Math.sin(lng);
                    sumZ += Math.sin(lat);
                });

                let avgX = sumX / res.length;
                let avgY = sumY / res.length;
                let avgZ = sumZ / res.length;

                // convert average x, y, z coordinate to latitude and longtitude
                let lng = Math.atan2(avgY, avgX);
                let hyp = Math.sqrt(avgX * avgX + avgY * avgY);
                let lat = Math.atan2(avgZ, hyp);

                setActivityMapCenter({latitude: rad2degr(lat), longitude: rad2degr(lng), zoom: 10});
            })
    }, []);

    return (
        <ScrollView style={styles.container}  contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
            <View style={styles.infoContainer}>
                <View style={styles.profileImage}></View>
                <View style={styles.info}>
                    <Text style={styles.name}>김한성</Text>
                    <View style={styles.point}>
                        <Text style={styles.pointText}>10000 포인트</Text>
                        <View style={styles.deposit}>
                            <Text style={{color: '#93CE92'}}>입금</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.activityContainer}>
                <View style={styles.activityDivider}>
                    <Text style={styles.activityText}>활동</Text>
                    <View style={{borderTopWidth: 0.75, width: vw(68), color: 'black'}}></View>
                </View>
                <View style={styles.activityMap}>
                    <NaverMapView
                        style={{width: '100%', height: '100%'}}
                        showsMyLocationButton={false}
                        scaleBar={false}
                        zoomControl={true}
                        setLocationTrackingMode={3}
                        logoMargin={{top: vh(200), left: 0, bottom: 0, right: 0}}
                        center={activityMapCenter}
                    >
                            {
                                !markersLoading && markers.map((marker, idx) => (
                                    <Marker
                                        key={idx}
                                        width={60}
                                        height={60}
                                        coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
                                    >
                                        <Image
                                            source={require('@assets/img/marker_green.png')}
                                            style={{width: 60, height: 60}}
                                        />
                                    </Marker>
                                ))
                            }
                    </NaverMapView>
                </View>
            </View>

            <View style={styles.logContainer}>
                <View style={styles.logDivider}>
                    <Text style={styles.logText}>로그</Text>
                    <View style={{borderTopWidth: 0.75, width: vw(68)}}></View>
                </View>

                <LogItem />
                <LogItem />
                <LogItem />

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: vh(1)}}>
                    <View style={{borderTopWidth: 0.75, width: vw(25)}} />
                    <Text style={{color: 'black'}}>show more</Text>
                    <View style={{borderTopWidth: 0.75, width: vw(25)}} />
                </View>
            </View>

            <TouchableHighlight style={styles.logoutButton}>
                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}> 로그아웃 </Text>
            </TouchableHighlight>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: vw(10),
        width: '80%',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    point: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    deposit: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#93CE92',
        marginLeft: 10,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    pointText: {
        fontSize: 20,
        color: 'black'
    },
    activityContainer: {
        marginTop: vh(5),
        width: '80%',
    },
    activityText: {
        fontSize: 20,
        marginRight: 15,
        color: 'black'
    },
    activityDivider: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityMap: {
        width: '100%',
        height: vh(25),
        marginTop: vh(2),
        borderRadius: vh(1),
        overflow: 'hidden'
    },
    logContainer: {
        marginTop: vh(2),
        width: '80%',
    },
    logText: {
        fontSize: 20,
        marginRight: 15,
        color: 'black'
    },
    logDivider: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logItemContainer: {
        marginTop: vh(1),
    },
    logItem: {
        width: '100%',
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logItemMap: {
        width: vw(20),
        height: vw(20),
        borderRadius: vh(1),
        overflow: 'hidden'
    },
    logItemInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    logItemPostedUser: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    logItemCleanUser: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1,
    },
    pointContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: '#93CE92',
    },
    logoutButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B30000',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 5,
        width: vw(100),
        height: 40,
        marginTop: vh(5),
    },
});

export default MyPage;
