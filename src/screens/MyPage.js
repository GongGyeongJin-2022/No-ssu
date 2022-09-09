import React from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { vh, vw } from "react-native-css-vh-vw";
import NaverMapView, { Marker } from "react-native-nmap";
import MyLocationPin from "@components/MyLocationPin";
import { ScrollView } from "react-native-gesture-handler";

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
                    <Text style={{fontSize: 17, fontWeight: '400'}}>2022.07.25 12시 13분</Text>
                    <View style={styles.logItemPostedUser}>
                        <Text style={{marginRight: 10}}>의뢰인</Text>
                        <Text>상상부기</Text>
                    </View>
                    <View style={styles.logItemCleanUser}>
                        <Text style={{marginRight: 10}}>처리인</Text>
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
                    <View style={{borderTopWidth: 0.75, width: vw(68)}}></View>
                </View>
                <View style={styles.activityMap}>
                    <NaverMapView
                        style={{width: '100%', height: '100%'}}
                        showsMyLocationButton={false}
                        scaleBar={false}
                        zoomControl={false}
                        setLocationTrackingMode={3}
                        logoMargin={{top: vh(200), left: 0, bottom: 0, right: 0}}
                    >
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
                    <Text>show more</Text>
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
    },
    pointText: {
        fontSize: 20,
    },
    activityContainer: {
        marginTop: vh(5),
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
