import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import { vw, vh } from 'react-native-css-vh-vw';
import {getMarkerDetail, getTag, postClear, postMarker, URL} from "@apis/apiServices";
import {useApi} from "@hooks/Hooks";
import Icon from 'react-native-vector-icons/AntDesign';
import {ImageCarousel} from "@components/ImageCarousel";
import {Screen, screenState} from "@apis/atoms";
import {useSetRecoilState} from "recoil";
import Toast from "react-native-toast-message";
import {Tags} from "@components/Tags";

const Clear = ({detailLoading, detailResolved, getDetail, selectedMarkerId}) => {
    const [tagLoading, tagResolved, tagApi] = useApi(getTag, true);
    const [clearLoading, clearResolved, callClear] = useApi(postClear, true);
    const [explanation, setExplanation] = useState("");
    const [loading, setLoading] = useState(false);
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

            setLoading(true);
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
                })
                .finally(() => {
                    setLoading(false);
                })
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
                        <Icon style={styles.compare} name="swap" size={40} color="black" />
                        <ImageCarousel images={images} setImages={setImages} capture={true}/>

                        <View style={styles.tagContainer}>
                            <Tags tags={detailResolved.tags} sizes={detailResolved.size}/>
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.description}>{detailResolved.explanation}</Text>
                            <View style={styles.commentContainer}>
                                <TextInput style={styles.explanation} placeholder={"작성자님께 전달할 내용을 작성해주세요!"} onChangeText={setExplanation} value={explanation}/>
                            </View>
                        </View>
                    </>
                )}
            <TouchableOpacity style={styles.clearButton} onPress={submitClear}>
                <Text style={styles.clearButtonText}>확인해주세요!</Text>
                {
                    loading && <ActivityIndicator style={styles.loadingIndicator} size="small" color="#ffffff" />
                }
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
    compare: {
        alignSelf: 'center',
        marginVertical: -18,
        transform: [{ rotate: "90deg" }]
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
    loadingIndicator: {
        position: "absolute",
        right: 20
    }
});

export default Clear;
