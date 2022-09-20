import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel/src/Carousel";
import { vh, vw } from "react-native-css-vh-vw";
import { useApi } from "@hooks/Hooks";
import { getMarkerWaitingDetail, URL } from "@apis/apiServices";

const Complete = ({
    id
}) => {
    const [markerWaitingDetailLoading, markerWaitingDetail, getMarkerWaitingDetailCallback] = useApi(getMarkerWaitingDetail, true);

    useEffect(() => {
        if (id) {
            getMarkerWaitingDetailCallback(id)
                .then((res) => {
                    console.log(res);
                })
        }
    }, [id]);

    return (
        <View style={styles.container}>
            <View style={{marginTop: vh(3)}}>
                {
                    !markerWaitingDetailLoading ?
                        <Carousel
                            width={vw(100)}
                            height={vw(100) / 2}
                            data={markerWaitingDetail.images}
                            scrollAnimationDuration={1000}
                            autoPlay={true}
                            autoPlayDelay={2000}
                            mode="parallax"
                            modeConfig={{
                                parallaxScrollingScale: 1,
                                parallaxScrollingOffset: 70,
                            }}
                            onSnapToItem={(index) => console.log('current index:', index)}
                            renderItem={({ index }) => {
                                return (
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            width: vw(80),
                                            alignSelf: 'center',
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Image
                                            source={{uri: URL + markerWaitingDetail.images[index]}}
                                            style={{borderRadius: 10, width: '100%', height: '100%'}}
                                        />
                                    </View>
                                )
                            }}
                        /> : <Carousel
                            width={vw(100)}
                            height={vw(100) / 2}
                            data={new Array(3).fill(0)}
                            scrollAnimationDuration={1000}
                            mode="parallax"
                            modeConfig={{
                                parallaxScrollingScale: 1,
                                parallaxScrollingOffset: 70,
                            }}
                            onSnapToItem={(index) => console.log('current index:', index)}
                            renderItem={({ index }) => {
                                return (
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            width: vw(80),
                                            alignSelf: 'center',
                                            borderRadius: 10,
                                            backgroundColor: '#949494'
                                        }}
                                    >
                                    </View>
                                )
                            }}
                        />
                }

            </View>

            {
                !markerWaitingDetailLoading ?
                    <View style={{width: '85%', marginTop: vh(5)}}>
                        <View>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{fontSize: 0.03 * vh(100), color: 'black', fontWeight: '600', marginRight: 5}}>
                                    {markerWaitingDetail.marker.posted_time.split('-')[1]}월 {markerWaitingDetail.marker.posted_time.split('-')[2][0]}{markerWaitingDetail.marker.posted_time.split('-')[2][1]}일
                                </Text>
                                <Text style={{fontSize: 0.025 * vh(100), color: 'black'}}>에 올린</Text>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{fontSize: 0.025 * vh(100), color: 'black', marginRight: 5}}>쓰레기 처리가</Text>
                                <Text style={{fontSize: 0.03 * vh(100), color: 'black', fontWeight: '600', marginRight: 5}}>완료</Text>
                                <Text style={{fontSize: 0.025 * vh(100), color: 'black', marginRight: 5}}>되었습니다.</Text>
                            </View>
                        </View>
                        <View style={{marginTop: vh(3)}}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', width: '78%', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 0.025 * vh(100), color: 'black'}}>치운 사람</Text>
                                <Text style={{fontSize: 0.025 * vh(100), color: 'black', fontWeight: '600'}}>{markerWaitingDetail.marker.posted_user.first_name}</Text>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', width: '78%', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 0.025 * vh(100), color: 'black'}}>지급 포인트</Text>
                                <Text style={{fontSize: 0.025 * vh(100), color: 'black', fontWeight: '600'}}>{markerWaitingDetail.marker.reward.reward} 포인트</Text>
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <View style={styles.rejectButton}>
                                <Text style={{color: 'white', fontSize: 0.02 * vh(100)}}>거절</Text>
                            </View>
                            <View style={styles.approveButton}>
                                <Text style={{color: 'white', fontSize: 0.02 * vh(100)}}>수락</Text>
                            </View>
                        </View>
                    </View> : null
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // always on bottom
        bottom: -1 * vh(5),
    },
    rejectButton: {
        backgroundColor: 'rgba(255, 46, 0, 0.69)',
        width: '25%',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    approveButton: {
        backgroundColor: '#93CE92',
        width: '70%',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default Complete;
