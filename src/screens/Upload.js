import React, {useCallback, useState} from 'react';
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
    Dimensions, ScrollView, SafeAreaView
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageModal from "react-native-image-modal";
import * as ImagePicker from "react-native-image-crop-picker";
import MotionSlider from 'react-native-motion-slider';
import { vw, vh } from 'react-native-css-vh-vw';

const Upload = () => {
    const [tags, setTags] = useState([
        {
            name: '플라스틱',
            selected: false
        },
        {
            name: '종이',
            selected: false
        },
        {
            name: '유리',
            selected: false
        },
        {
            name: '일반쓰레기',
            selected: false
        },
        {
            name: '캔/알루미늄',
            selected: false
        },
        {
            name: '음식물쓰레기',
            selected: false
        }
    ]);
    const [sizes, setSizes] = useState([
        {
            name: '소형',
            selected: false
        },
        {
            name: '중형',
            selected: false
        },
        {
            name: '대형',
            selected: false
        }
    ]);
    const [image, setImage] = useState(null);
    const [comment, setComment] = useState('');
    const [reward, setReward] = useState(10);

    const handleChange = (idx) => {
        let items = [...tags];
        items[idx] = {
            ...items[idx],
            selected: !items[idx].selected
        };
        setTags(items);
    }

    const handleSizeChange = (selectedIdx) => {
        setSizes(prev => {
            return prev.map((el, idx) => {
                if(selectedIdx === idx) {
                    return {
                        name: el.name,
                        selected: true
                    }
                } else {
                    return {
                        name: el.name,
                        selected: false
                    }
                }
            })
        })
    }

    const imagePicker = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeExif: true,
            mediaType: 'photo',
        }).then(image => {
            console.log(image.path);
            setImage(image);
        });
    }

    return (
        <View style={styles.fullContainer}>
        <View style={styles.container}>
            {
                image ? (
                    <ImageModal style={styles.image} resizeMode={"contain"} source={{uri: image.path}}/>
                ) : (

                    <TouchableOpacity onPress={imagePicker}>
                        <View style={styles.imagePickerButton}>
                            <Text style={styles.imagePickerText}>
                                이미지
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            <Text style={styles.label}>태그</Text>
            <View style={styles.tag}>
                {
                    tags.map((tag, idx) => (
                        <TouchableOpacity
                            onPress={() => {handleChange(idx)}}
                            key={idx}
                        >
                            <View style={{...styles.tagItem, backgroundColor: tags[idx].selected ? 'black' : 'white'}}>
                                <Text style={{...styles.tagItemText, color: tags[idx].selected ? 'white' : 'black'}}>{"# " + tag.name}</Text>
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
                            onPress={() => {handleSizeChange(idx)}}
                            key={idx}
                        >
                            <View style={{...styles.tagItem, backgroundColor: sizes[idx].selected ? 'black' : 'white'}}>
                                <Text style={{...styles.tagItemText, color: sizes[idx].selected ? 'white' : 'black'}}>{"# " + tag.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <Text style={styles.label}>코멘트</Text>
            <View style={styles.commentContainer}>
                <TextInput style={styles.comment} onChangeText={setComment} value={comment}/>
            </View>
            <Text style={styles.label}>리워드</Text>
            <View style={styles.rewardContainer}>
                <MotionSlider
                    min={1}
                    max={100}
                    value={3}
                    decimalPlaces={0}
                    units={'P'}
                    backgroundColor={['rgb(117, 176, 116)', 'rgb(157, 216, 156)']}
                    onValueChanged={(value) => setReward(value)}
                />
            </View>
        </View>
        <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>치워주세요!</Text>
        </TouchableOpacity>
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
    image: {
        alignSelf: 'center',
        width: "90%",
        height: vh(40)
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
        justifyContent: 'center',
        alignItems: 'center',
        height: vh(7),
        backgroundColor: '#6EBFB0',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default Upload;
