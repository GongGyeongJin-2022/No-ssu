import React from 'react';
import {vh, vw} from "react-native-css-vh-vw";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ImagePicker from "react-native-image-crop-picker";


const RenderCapture = ({images, setImages, index, callback}) => {
    const imagePicker = () => {
        ImagePicker.openCamera({
            width: 1920,
            height: 1080,
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
                        이미지 촬영
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
    <View>
        <Image style={styles.image} source={{uri: images[index]}} modalImageResizeMode={"contain"}
               resizeMode={"cover"}/>
    </View>
)
export const ImageCarousel = ({images, setImages, capture, callback, pagingEnabled=true}) => {
    console.log("imageCarousel", images, pagingEnabled);
    return (
        <Carousel
            loop={false}
            width={vw(100)}
            height={vw(100*9/16)}
            snapEnabled={pagingEnabled}
            data={capture ? [...images, 0] : [...images]}
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
        width: vw(100),
        height: vw(100*9/16),
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
        width: vw(100),
        height: vw(100*9/16),
        borderRadius: 10
    }
})