import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel/src/Carousel";
import { vh, vw } from "react-native-css-vh-vw";

const Complete = () => {
    return (
        <View style={styles.container}>
            <View style={{marginTop: vh(3)}}>
                <Carousel
                    width={vw(100)}
                    height={vw(100) / 2}
                    data={[...new Array(6).keys()]}
                    scrollAnimationDuration={1000}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 1,
                        parallaxScrollingOffset: 70,
                    }}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ index }) => (
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                justifyContent: 'center',
                                width: vw(80),
                                alignSelf: 'center',
                                backgroundColor: 'black',
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ textAlign: 'center', fontSize: 30 }}>
                                {index}
                            </Text>
                        </View>
                    )}
                />
            </View>

            <View style={{width: '85%', marginTop: vh(5)}}>
                <View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={{fontSize: 22, color: 'black', fontWeight: '600', marginRight: 5}}>9월 18일</Text>
                        <Text style={{fontSize: 20, color: 'black'}}>에 올린</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={{fontSize: 20, color: 'black', marginRight: 5}}>쓰레기 처리가</Text>
                        <Text style={{fontSize: 22, color: 'black', fontWeight: '600', marginRight: 5}}>완료</Text>
                        <Text style={{fontSize: 20, color: 'black', marginRight: 5}}>되었습니다.</Text>
                    </View>
                </View>
                <View style={{marginTop: vh(3)}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', width: '78%', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, color: 'black'}}>치운 사람</Text>
                        <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>김한성</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', width: '78%', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, color: 'black'}}>지급 포인트</Text>
                        <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>1000 포인트</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.rejectButton}>
                        <Text style={{color: 'white'}}>거절</Text>
                    </View>
                    <View style={styles.approveButton}>
                        <Text style={{color: 'white'}}>수락</Text>
                    </View>
                </View>
            </View>
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
