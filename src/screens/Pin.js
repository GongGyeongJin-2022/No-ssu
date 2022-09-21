import React, { useEffect } from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import { vw, vh } from 'react-native-css-vh-vw';
import {getMarkerDetail, getTag} from "@apis/apiServices";
import {useApi, useBottomSheetModalRef} from "@hooks/Hooks";
import {useSetRecoilState} from "recoil";
import {Screen, screenState} from "@apis/atoms";
import {URL} from "@apis/apiServices";
import {ImageCarousel} from "@components/ImageCarousel";
import {Tags} from "@components/Tags";

const Pin = ({detailLoading, detailResolved, getDetail, selectedMarkerId}) => {

    const [tagLoading, tagResolved, tagApi] = useApi(getTag, true);
    const setScreen = useSetRecoilState(screenState);

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

                <ImageCarousel images={detailResolved.images.map(image => URL+image)} capture={false}/>

                    <View style={styles.tagContainer}>
                       <Tags tags={detailResolved.tags} sizes={detailResolved.size}/>
                    </View>
                <View style={styles.content}>
                    <Text style={styles.descriptionText}>{detailResolved.explanation}</Text>
                </View>

                <TouchableOpacity style={styles.clearButton} onPress={() => {
                    setScreen(Screen.Clear);
                }}>
                    <Text style={styles.clearButtonText}>처리했습니다!</Text>
                </TouchableOpacity>
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
        marginTop: -24,
    },
    descriptionText: {
        color: '#252525'
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

export default Pin;
