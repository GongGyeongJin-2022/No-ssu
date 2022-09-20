import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { vh, vw } from "react-native-css-vh-vw";
import NaverMapView, { Marker } from "react-native-nmap";
import { ScrollView } from "react-native-gesture-handler";
import {useApi, useBottomSheetModalRef} from "@hooks/Hooks";
import {getMarkersSimiple, getMypageLog, getUser, postChargePoint} from "@apis/apiServices";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { BootpayWebView } from 'react-native-bootpay';
import {useRecoilState} from "recoil";
import {tokenState} from "@apis/atoms";
import moment from 'moment';

const LogItem = ({log}) => {
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
                    <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>{moment(log.created_at).format('YYYY.MM.DD HH시 mm분')}</Text>
                    <View style={styles.logItemPostedUser}>
                        <Text style={{marginRight: 10, color: 'black'}}>의뢰인</Text>
                        <Text>{log.posted_user}</Text>
                    </View>
                    <View style={styles.logItemCleanUser}>
                        <Text style={{marginRight: 10, color: 'black'}}>처리인</Text>
                        <Text>{log.cleanup_user}</Text>
                    </View>
                </View>
                <View style={styles.pointContainer}>
                    <Text style={{fontSize: 12, color: '#93CE92'}}>+ {log.reward}</Text>
                </View>
            </View>
        </View>
    );
}

const MyPage = ({navigation}) => {
    const [markersLoading, markers, getMarkersSimpleCallback] = useApi(getMarkersSimiple, true);
    const [userLoading, user, getUserCallback] = useApi(getUser, true);
    const [chargeLoading, charge, postChargePointCallback] = useApi(postChargePoint, true);
    const [logLoading, logs, getLogCallback] = useApi(getMypageLog, true);
    const [token, setToken] = useRecoilState(tokenState);

    const [activityMapCenter, setActivityMapCenter] = useState({latitude: 37.5666102, longitude: 126.9783881, zoom: 10});

    const bottomSheetModalRef = useBottomSheetModalRef()
    const bootpay = useRef(null);

    useEffect(() => {
        getLogCallback();
        getUserCallback()
            .then((res) => {
                console.log(res);
            })
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

    const logout = () => {
        setToken({
            accessToken: "",
            refreshToken: ""
        });
        navigation.navigate("Login");
        bottomSheetModalRef.current?.close();
    }

    const handleDeposit = () => {
        const payload = {
            pg: 'payapp',
            name: '1000 포인트', //결제창에 보여질 상품명
            order_id: '1', //개발사에 관리하는 주문번호
            method: 'card',
            price: 1000 //결제금액
        }

        //결제되는 상품정보들로 통계에 사용되며, price의 합은 결제금액과 동일해야함
        const items = [
            {
                item_name: '1000 포인트', //통계에 반영될 상품명
                qty: 1, //수량
                unique: '1', //개발사에서 관리하는 상품고유번호
                price: 1000, //상품단가
            }
        ]

        //구매자 정보로 결제창이 미리 적용될 수 있으며, 통계에도 사용되는 정보
        const userInfo = {
            id: user?.id, //개발사에서 관리하는 회원고유번호
            username: user?.first_name, //구매자명
            phone: '01012345678', //전화번호, 페이앱 필수
        }

        //기타 설정
        const extra = {
            app_scheme: "no_ssu", //ios의 경우 카드사 앱 호출 후 되돌아오기 위한 앱 스키마명
            offer_period: "", //결제창 제공기간에 해당하는 string 값, 지원하는 PG만 적용됨
            popup: 0, //1이면 popup, 아니면 iframe 연동
            quick_popup: 1, //1: popup 호출시 버튼을 띄우지 않는다. 아닐 경우 버튼을 호출한다
            locale: "ko",
            theme: "purple",
            iosCloseButton: false
        }

        if (bootpay != null && bootpay.current != null) bootpay.current.request(payload, items, userInfo, extra);
    }

    const onCancel = (data) => {
        console.log('cancel', data);
    }

    const onError = (data) => {
        console.log('error', data);
    }

    const onReady = (data) => {
        console.log('ready', data);
    }

    const onConfirm = (data) => {
        console.log('confirm', data);
        if(bootpay != null && bootpay.current != null) bootpay.current.transactionConfirm(data);
    }

    const onDone = (data) => {
        console.log('done', data);

        const formData = new FormData();
        formData.append('user_id', user?.id);
        formData.append('point', 1000);
        formData.append('data', JSON.stringify(data));
        postChargePointCallback(formData)
            .then((res) => {
                getUserCallback();
            })
    }

    const onClose = () => {
        console.log('closed');
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            overScrollMode="never"
        >
        <BootpayWebView
                ref={bootpay}
                ios_application_id={'6326ebe2d01c7e001cf5ee1a'}
                android_application_id={'6326ebe2d01c7e001cf5ee19'}
                onCancel={onCancel}
                onError={onError}
                onReady={onReady}
                onConfirm={onConfirm}
                onDone={onDone}
                onClose={onClose}
            />

            <View style={styles.infoContainer}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Image style={styles.profileImage} source={require('@assets/img/ProfileImg.jpg')}/>
                    <View style={styles.info}>
                        <Text style={styles.name}>{user?.first_name}</Text>
                        <View style={styles.point}>
                            <Text style={styles.pointText}>{user?.point} 포인트</Text>
                        </View>
                    </View>
                </View>


                <View style={{display: 'flex', flexDirection: 'column'}}>
                    <View style={{marginBottom: 10}}>
                        <TouchableOpacity
                            style={styles.withdraw}
                        >
                            <Text style={{color: '#ee7171'}}>출금</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.deposit}
                            onPress={handleDeposit}
                        >
                            <Text style={{color: '#93CE92'}}>입금</Text>
                        </TouchableOpacity>
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

                {
                    !logLoading && logs.map((log, idx) => (
                        <LogItem key={"LogItem_" + idx} log={log}/>
                    ))
                }

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: vh(1)}}>
                    <View style={{borderTopWidth: 0.75, width: vw(25)}} />
                    <Text style={{color: 'black'}}>show more</Text>
                    <View style={{borderTopWidth: 0.75, width: vw(25)}} />
                </View>
            </View>

            <TouchableHighlight style={styles.logoutButton} onPress={logout}>
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
        marginLeft: vw(5),
    },
    point: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    withdraw: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ee7171',
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
