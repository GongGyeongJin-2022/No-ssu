import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import { vw, vh } from 'react-native-css-vh-vw';
import {getMarkerDetail, getTag, postClear, postMarker, URL} from "@apis/apiServices";
import {useApi} from "@hooks/Hooks";
import ImageModal from "react-native-image-modal";
import Carousel from "react-native-reanimated-carousel";
import {ImageCarousel} from "@components/ImageCarousel";
import {Screen, screenState} from "@apis/atoms";
import {useSetRecoilState} from "recoil";
import Toast from "react-native-toast-message";

const sizes = {
    "L": "대형",
    "M": "중형",
    "S": "소형"
}

const Clear = ({detailLoading, detailResolved, getDetail, selectedMarkerId}) => {
    const [tagLoading, tagResolved, tagApi] = useApi(getTag, true);
    const [clearLoading, clearResolved, callClear] = useApi(postClear, true);
    const [explanation, setExplanation] = useState("");
    const setScreen = useSetRecoilState(screenState);

    const [images, setImages] = useState([])

    useEffect(() => {
        tagApi();
    },[])

    const submitClear = () => {
        if(images.length < detailResolved.images.length) {
            Toast.show({
                type: 'error',
                text1: '등록 실패',
                text2: `사진을 ${detailResolved.images.length}장 이상 촬영해주세요`,
            });
            return;
        } else {
            const formData = new FormData();
            formData.append('marker', selectedMarkerId);
            formData.append('explanation', explanation);
            images.forEach((image, idx) => {
                formData.append(`images_${idx}`, {
                    uri: image,
                    type: 'image/jpeg',
                    name: `clearimage${idx}.jpg`
                });
            })
            callClear(formData)
                .then(() => {
                    Toast.show({
                        type: 'success',
                        text1: '업로드 성공'
                    });
                    setScreen(Screen.Main);
                })
                .catch(err => {
                    Toast.show({
                        type: 'error',
                        text1: '등록 실패',
                        text2: 'API호출중 에러가 발생했습니다.',
                    });
                });
        }
    }

    return (
        <View style={styles.container}>
            {
                (tagLoading || detailLoading) ? (
                    <View>
                        <Text>Loading</Text>
                    </View>
                ) : (
                    <>

                        <ImageCarousel images={detailResolved.images.map(image => URL+image)} setImages={setImages} capture={false} pagingEnabled={false}/>
                        <Text style={styles.arrow}>비교</Text>
                        <ImageCarousel images={images} setImages={setImages} capture={true}/>
                        <View style={styles.content}>
                            <View style={styles.tagContainer}>
                                {
                                    detailResolved.tags.map((tagNum, idx) => (
                                        <View key={"tag"+idx}style={styles.tag}>
                                            <Text style={styles.tagText}>#{tagResolved[tagNum-1].name}</Text>
                                        </View>
                                    ))
                                }
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>#{sizes[detailResolved.size]}</Text>
                                </View>
                            </View>
                            <Text style={styles.description}>{detailResolved.explanation}</Text>
                            <View style={styles.commentContainer}>
                                <TextInput style={styles.explanation} placeholder={"작성자님께 전달할 내용을 작성해주세요!"} onChangeText={setExplanation} value={explanation}/>
                            </View>
                        </View>
                    </>
                )}
            <TouchableOpacity style={styles.clearButton} onPress={submitClear}>
                <Text style={styles.clearButtonText}>확인해주세요!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    content: {
        marginLeft: '5%',
        marginRight: '5%'
    },
    image: {
        alignSelf: 'center',
        width: vw(90),
        height: vh(30),
    },
    tagContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    tag: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 76,
        height: 24,
        borderWidth: 1,
        borderColor: '#C8C8C8',
        borderRadius: 50,
        marginHorizontal: 3
    },
    tagText: {
        fontSize: 10,
        color: '#252525'
    },
    descriptionText: {
        color: '#252525',
        marginTop: 12
    },
    clearButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: vh(5),
        width: vw(100),
        backgroundColor: '#93CE92',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    clearButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    arrow: {
        alignSelf: 'center'
    },
    description: {
        margin: 24
    },
    label: {
        fontSize: 20,
        color: 'black',
        alignSelf: "flex-start",
        marginLeft: 10,
        marginTop: 20
    },
    explanation: {
        width: "90%",
        height: 60,
        alignSelf: "center",
        borderWidth: 1,
        padding: 10,
        borderColor: "lightgray",
        borderRadius: 10
    },
});

export default Clear;
