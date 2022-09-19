import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const MyLocationButton = ({ findLocation, setFindLocation }) => {
    return (
        <View>
            {
                findLocation ?
                    <TouchableWithoutFeedback onPress={() => setFindLocation(!findLocation)}>
                        <View style={styles.myLocationButton}>
                            <Icon
                                name="map-pin"
                                size={20}
                                color={'#0072f5'}
                                style={styles.locationActiveIcon}
                            />
                        </View>
                    </TouchableWithoutFeedback> :
                    <TouchableWithoutFeedback onPress={() => setFindLocation(!findLocation)}>
                        <View style={styles.myLocationButton}>
                            <Icon
                                name="map-pin"
                                size={20}
                                color={'black'}
                            />
                        </View>
                    </TouchableWithoutFeedback>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    myLocationButton: {
        flex: 1,
        position: 'absolute',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        bottom: 50,
        left: 25
    },
    locationActiveIcon: {
        shadowColor: "#4efafa",
        shadowOpacity: 1,
        textShadowRadius: 2,
        textShadowOffset:{width: 0, height: 1}
    }
});

export default MyLocationButton;
