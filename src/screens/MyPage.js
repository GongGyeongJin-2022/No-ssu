import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { vh, vw } from "react-native-css-vh-vw";
import NaverMapView, { Marker } from "react-native-nmap";
import MyLocationPin from "@components/MyLocationPin";

const MyPage = () => {
    return (
        <View style={styles.container}>
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
                    <View style={{borderTopWidth: 0.75, width: '83%'}}></View>
                </View>
                <View style={styles.activityMap}>
                    <NaverMapView
                        style={{width: '100%', height: '100%'}}
                        showsMyLocationButton={false}
                        scaleBar={false}
                        zoomControl={false}
                        setLocationTrackingMode={3}
                    >
                    </NaverMapView>
                </View>
            </View>

            <View style={styles.logContainer}>
                <View style={styles.logDivider}>
                    <Text style={styles.logText}>로그</Text>
                    <View style={{borderTopWidth: 0.75, width: '83%'}}></View>
                </View>
                <View style={styles.logItemContainer}>
                    <View style={styles.logItem}>
                        <View>

                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vw(10),
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
        marginLeft: 20,
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
    },
    pointText: {
        fontSize: 20,
    },
    activityContainer: {
        marginTop: 40,
        width: '80%',
    },
    activityText: {
        fontSize: 20,
        marginRight: 15,
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
        marginTop: 20,
        borderRadius: vh(1),
        overflow: 'hidden'
    },
    logContainer: {
        marginTop: 40,
        width: '80%',
    },
    logText: {
        fontSize: 20,
        marginRight: 15,
    },
    logDivider: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logItemContainer: {
        marginTop: 20,
    },
    logItem: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyPage;
