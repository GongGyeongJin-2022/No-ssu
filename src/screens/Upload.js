import React, {useCallback, useEffect, useState} from 'react';
import {
    Platform,
    Pressable,
    Image,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Button,
    FlatList,
    TextInput,
    TouchableHighlight,
    Dimensions, ScrollView, SafeAreaView, ActivityIndicator
} from 'react-native';
import * as ImagePicker from "react-native-image-crop-picker";
import MotionSlider from 'react-native-motion-slider';
import { vw, vh } from 'react-native-css-vh-vw';
import Toast from "react-native-toast-message";
import {useApi} from "@hooks/Hooks";
import {getTag, getUser, postMarker} from "@apis/apiServices";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {screenState, tokenState, Screen, userState} from "@apis/atoms";
import Geolocation from "@react-native-community/geolocation";
import Carousel from 'react-native-reanimated-carousel';
import {ImageCarousel} from "@components/ImageCarousel";

const Upload = () => {
    const [tagLoading, tagResolved, tagApi] = useApi(getTag, true);
    const [tags, setTags] = useState();
    const [userLoading, userInfo, getUserCallback] = useApi(getUser, true);

    const [sizes, setSizes] = useState([
        {
            name: '소형',
            code: "S",
            selected: false
        },
        {
            name: '중형',
            code: "M",
            selected: false
        },
        {
            name: '대형',
            code: "L",
            selected: false
        }
    ]);
    const [images, setImages] = useState([]);
    const [comment, setComment] = useState('');
    const [reward, setReward] = useState(10);
    const [markerLoading, markerResolved, callApi] = useApi(postMarker, true);
    const [location, setLocation] = useState({latitude: 37.5828, longitude: 127.0107});
    const [loading, setLoading] = useState(false);

    const setScreen = useSetRecoilState(screenState);

    useEffect(() => {
        console.log("images",images);
    },[images])

    useEffect(() => {
        console.log("get Tag")
        tagApi()
            .then((resolved) => {
                console.log("tag resolved", resolved);
                setTags(
                    resolved.map((tag) => ({
                            ...tag,
                            selected: false
                        })
                    )
                )
            })
            .catch(err => {
                console.log("error!!!!!!!",err);
            })
        getUserCallback();
    },[]);

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
                console.log("geolocationerror",error);
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
        );
    }

    const handleChange = (prev, setter, idx) => {
        let items = [...prev];
        items[idx] = {
            ...items[idx],
            selected: !items[idx].selected
        };
        setter(items);
    }

    const handleSizeChange = (selectedIdx) => {
        console.log("selectedIdx",selectedIdx);
        setSizes(prev => {
            return prev.map((el, idx) => (
                {
                    ...el,
                    selected: (selectedIdx === idx)
                }
            ))
        })
    }

    const uploadMarker = () => {
        console.log("upload");
        if(images.length < 2) {
            Toast.show({
                type: 'error',
                text1: '등록 실패',
                text2: '이미지를 2장 이상 촬영해주세요',
            });
            return;
        }

        let tagFlag = true, sizeFlag = true;
        let formData = new FormData();
        images.forEach((image, idx) => {
            formData.append(`images_${idx}`, {
                uri: image,
                type: 'image/jpeg',
                name: `addressimage${idx}.jpg`
            });
        })

        formData.append("reward_reward", reward); // TODO: reward를 사용자의 point를 초과하여 업로드할수 없게 안전장치 필요
        formData.append("longitude", location.longitude);
        formData.append("latitude", location.latitude);

        formData.append("explanation", comment);

        tags.forEach((tag, idx) => {
            if(tag.selected) {
                formData.append("tags", idx+1);
                tagFlag = false;
            }
        })

        console.log(sizes)
        sizes.forEach((size, idx) => {
            if(size.selected) {
                formData.append("size", size.code);
                sizeFlag = false;
            }
        })

        if(tagFlag) {
            Toast.show({
                type: 'error',
                text1: '등록 실패',
                text2: '태그를 하나 이상 선택해주세요',
            });
            return;
        } else if(sizeFlag) {
            Toast.show({
                type: 'error',
                text1: '등록 실패',
                text2: '사이즈를 하나 선택해주세요',
            });
            return;
        }
        setLoading(true);

        callApi(formData)
            .then(res=>{
                console.log("res",res)
                if(res.response === false) {
                    Toast.show({
                        type: 'error',
                        text1: '등록 실패',
                        text2: '쓰레기가 인식되지 않습니다.',
                    });
                } else {
                    Toast.show({
                        type: 'success',
                        text1: '업로드 성공'
                    });
                    setScreen(Screen.Main);
                }
            })
            .catch(err => {
                console.log("upload err", JSON.stringify(err));
                Toast.show({
                    type: 'error',
                    text1: '등록 실패',
                    text2: 'API호출중 에러가 발생했습니다. ' + err,
                });
            })
            .finally(() => {
                setLoading(false);
            });

    }

    return (
        <View style={styles.fullContainer}>
            {
                tagLoading || userLoading ? (
                    <View>
                        <Text>
                            loading
                        </Text>
                    </View>
                ) : (
                    <>
                        <ImageCarousel images={images} setImages={setImages} capture={true} callback={setGeoLocation}/>
                        <View style={styles.container}>

                            <Text style={styles.label}>태그</Text>
                            <View style={styles.tag}>
                                {
                                    tags && tags.map((tag, idx) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleChange(tags, setTags, idx)
                                            }}
                                            key={idx}
                                        >
                                            <View style={{
                                                ...styles.tagItem,
                                                backgroundColor: tags[idx].selected ? 'black' : 'white'
                                            }}>
                                                <Text style={{
                                                    ...styles.tagItemText,
                                                    color: tags[idx].selected ? 'white' : 'black'
                                                }}>{"# " + tag.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            <Text style={styles.label}>사이즈</Text>
                            <View style={styles.tag}>
                                {
                                    sizes.map((tag, idx) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleSizeChange(idx);
                                            }}
                                            key={idx}
                                        >
                                            <View style={{
                                                ...styles.tagItem,
                                                backgroundColor: sizes[idx].selected ? 'black' : 'white'
                                            }}>
                                                <Text style={{
                                                    ...styles.tagItemText,
                                                    color: sizes[idx].selected ? 'white' : 'black'
                                                }}>{"# " + tag.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            <Text style={styles.label}>요청 사항</Text>
                            <View style={styles.commentContainer}>
                                <TextInput style={styles.comment} onChangeText={setComment} value={comment}/>
                            </View>
                            <Text style={styles.label}>리워드</Text>
                            <View style={styles.rewardContainer}>
                                <MotionSlider
                                    min={1}
                                    max={userInfo.point}
                                    value={reward}
                                    decimalPlaces={0}
                                    units={'P'}
                                    backgroundColor={['rgb(117, 176, 116)', 'rgb(157, 216, 156)']}
                                    onValueChanged={(value) => setReward(value)}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.submitButton} onPress={uploadMarker}>
                            <Text style={styles.submitButtonText}>치워주세요!</Text>
                            {
                                loading && <ActivityIndicator style={styles.loadingIndicator} size="small" color="#ffffff" />
                            }
                        </TouchableOpacity>
                    </>
                )
            }
    </View>
    )
};

const styles = StyleSheet.create({
    fullContainer: {
        height: "100%",
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    container: {
        marginTop: -40,
        padding: 12,
    },
    imagePickerButton: {
        width: "90%",
        height: vh(30),
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignSelf: "center",
        borderRadius: 10
    },
    imagePickerText: {
        alignSelf: 'center'
    },
    tag: {
        alignSelf: "stretch",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
    },
    tagItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 76,
        height: 24,
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 50,
        marginBottom: 4,
        marginHorizontal: 3
    },
    tagItemText: {
        fontSize: 10
    },
    label: {
        fontSize: 20,
        color: 'black',
        alignSelf: "flex-start",
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10
    },
    commentContainer: {

    },
    comment: {
        width: "90%",
        height: 40,
        alignSelf: "center",
        borderWidth: 1,
        padding: 10,
        borderColor: "lightgray",
        borderRadius: 10
    },
    rewardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rewardSlider: {

    },
    submitButton: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: vh(6),
        backgroundColor: '#6EBFB0',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    loadingIndicator: {
        position: "absolute",
        right: 20
    }
})

export default Upload;
