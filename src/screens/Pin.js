import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { vw, vh } from 'react-native-css-vh-vw';
import {getMarkerDetail, getTag} from "@apis/apiServices";
import {useApi} from "@hooks/Hooks";
import ImageModal from "react-native-image-modal";

const sizes = {
    "L": "대형",
    "M": "중형",
    "S": "소형"
}

const Pin = ({selectedMarkerId}) => {
    const [detailLoading, detailResolved, getDetail] = useApi(getMarkerDetail, true);
    const [tagLoading, tagResolved, tagApi] = useApi(getTag, true);

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
                    <ImageModal source={{uri:detailResolved.image}} style={styles.image} modalImageResizeMode={"contain"} resizeMode={"cover"}/>

                    <View style={styles.tagContainer}>
                        {
                            detailResolved.tags.map((tagNum, idx) => (
                                <View key={"tag"+idx}style={styles.tag}>
                                    <Text style={styles.tagText}>#{tagResolved[tagNum].name}</Text>
                                </View>
                            ))
                        }
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>#{sizes[detailResolved.size]}</Text>
                        </View>
                    </View>

                    <Text style={styles.descriptionText}>{detailResolved.explanation}</Text>
                </View>

                <View style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>처리했습니다!</Text>
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
        width: vw(90),
        height: vh(20),
        borderRadius: 10
    },
    tagContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 15
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
        marginBottom: 4,
        marginHorizontal: 3
    },
    tagText: {
        fontSize: 10,
        color: '#252525'
    },
    descriptionText: {
        color: '#252525',
        marginTop: 20
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
