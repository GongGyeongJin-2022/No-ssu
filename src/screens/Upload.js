import React from "react";
import {Button, View} from "react-native";
import {usePostMarkerCallback} from "@apis/apiCallbackes";

const Upload = () => {
    const submit = () => {
        usePostMarkerCallback({

        })
    }

    return (
        <View>
            <Button title={"submit"} onPress={submit}></Button>
        </View>
    );
};

export default Upload;
