import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import { vw, vh } from 'react-native-css-vh-vw';
import {getMarkerDetail, getTag} from "@apis/apiServices";
import {useApi} from "@hooks/Hooks";
import ImageModal from "react-native-image-modal";
import Carousel from "react-native-reanimated-carousel";
import {ImageCarousel} from "@components/ImageCarousel";

const sizes = {
    "L": "대형",
    "M": "중형",
    "S": "소형"
}

const Clear = ({selectedMarkerId}) => {
    const [detailLoading, detailResolved, getDetail] = useApi(getMarkerDetail, true);
    const [tagLoading, tagResolved, tagApi] = useApi(getTag, true);
    const [index, setIndex] = useState(0);

    const [images, setImages] = useState([])

    useEffect(() => {
        getDetail(selectedMarkerId);
        tagApi();
        console.log("HelperInfoBottomSheet")
    },[selectedMarkerId])

    return (
        <View style={styles.container}>
            {
                (tagLoading || detailLoading) ? (
                    <View>
                        <Text>Loading</Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.content}>
                            <ImageCarousel images={images} setImages={setImages} capture={false}/>

                            <ImageCarousel images={images} setImages={setImages} capture={true}/>

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

                            <Text style={styles.descriptionText}>{detailResolved.explanation}</Text>
                        </View>
                    </>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
        width: '100%',
        marginTop: 8
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: vh(5),
        backgroundColor: '#93CE92',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    clearButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default Clear;
