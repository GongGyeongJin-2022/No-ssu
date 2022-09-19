import React from 'react';
import {vh, vw} from "react-native-css-vh-vw";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ImagePicker from "react-native-image-crop-picker";


const RenderCapture = ({images, setImages, index, callback}) => {
    const imagePicker = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeExif: true,
            mediaType: 'photo',
        }).then(image => {
            console.log(image);
            setImages(prev => [...prev, image.path]);
            callback && callback();
        });
    }

    if (images.length >= 5 && index === images.length) {
        return null;
    } else if (index === images.length) {
        return (
            <TouchableOpacity onPress={imagePicker}>
                <View style={styles.imagePickerButton}>
                    <Text style={styles.imagePickerText}>
                        이미지
                    </Text>
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <RenderImage images={images} index={index}/>
        )
    }
}
const RenderImage = ({images, index}) => (
    <View
        style={{
            flex: 1,
            borderWidth: 1,
            justifyContent: 'center',
        }}
    >
        <Image style={styles.image} source={{uri: images[index]}} modalImageResizeMode={"contain"}
               resizeMode={"cover"}/>
    </View>
)
export const ImageCarousel = ({images, setImages, capture, callback}) => {
    return (
        <Carousel
            loop={false}
            width={vw(90)}
            height={vh(30)}
            // autoPlay={true}
            data={[...images, 0]}
            mode="parallax"
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ index }) => capture ? <RenderCapture index={index} images={images} setImages={setImages} callback={callback}/> : <RenderImage index={index} images={images}/>}
        />
    )
}

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
        width: vw(90),
        height: vh(30),
        // borderRadius: 10
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
        height: vh(6),
        backgroundColor: '#6EBFB0',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }
})